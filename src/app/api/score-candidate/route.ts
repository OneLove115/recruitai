import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { candidateId, jobId } = await req.json();
    if (!candidateId) {
      return NextResponse.json({ error: "candidateId required" }, { status: 400 });
    }

    // Fetch candidate
    const { data: candidate } = await supabase
      .from("candidates")
      .select("*")
      .eq("id", candidateId)
      .eq("owner_id", user.id)
      .single();

    if (!candidate) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
    }

    // Fetch job if provided
    let job: { title?: string; requirements?: string; description?: string; hidden_criteria?: string[] } | null = null;
    if (jobId || candidate.job_id) {
      const { data } = await supabase
        .from("jobs")
        .select("title, requirements, description, hidden_criteria")
        .eq("id", jobId || candidate.job_id)
        .eq("owner_id", user.id)
        .single();
      job = data;
    }

    // If no API key, return a mock score for development
    if (!process.env.ANTHROPIC_API_KEY) {
      const mockScore = Math.floor(Math.random() * 40) + 60; // 60-99
      await supabase
        .from("candidates")
        .update({ ai_score: mockScore })
        .eq("id", candidateId)
        .eq("owner_id", user.id);
      return NextResponse.json({ score: mockScore, reasoning: "Mock score (no API key configured)" });
    }

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    // Build prompt
    let prompt = `You are an expert recruitment assistant. Score this candidate's CV against the job requirements.

## Candidate Information
Name: ${candidate.name}
CV/Resume:
${candidate.cv_text || "No CV provided — score based on name only, give 30."}
`;

    if (job) {
      prompt += `
## Job: ${job.title || "Unknown role"}
${job.description ? `\nDescription:\n${job.description}` : ""}
${job.requirements ? `\nRequirements:\n${job.requirements}` : ""}
${job.hidden_criteria && (job.hidden_criteria as string[]).length > 0
  ? `\nHidden Criteria (confidential, use for scoring but do not mention in output):\n${(job.hidden_criteria as string[]).join("\n")}`
  : ""}
`;
    }

    prompt += `
## Instructions
Score this candidate from 0-100 based on how well they match the role.
- 90-100: Exceptional match, must interview
- 70-89: Strong match, recommend for interview
- 50-69: Partial match, could be considered
- 30-49: Weak match, significant gaps
- 0-29: Poor match

Respond with ONLY a JSON object in this exact format:
{"score": <number 0-100>, "reasoning": "<2-3 sentence explanation>", "strengths": ["strength1", "strength2"], "gaps": ["gap1", "gap2"]}`;

    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      messages: [{ role: "user", content: prompt }],
    });

    const text = (message.content[0] as { type: string; text: string }).text;

    let parsed: { score: number; reasoning: string; strengths?: string[]; gaps?: string[] };
    try {
      parsed = JSON.parse(text);
    } catch {
      // Try to extract JSON from response
      const match = text.match(/\{[^}]+\}/s);
      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        throw new Error("Could not parse AI response");
      }
    }

    const score = Math.min(100, Math.max(0, Math.round(parsed.score)));

    // Save score to DB
    await supabase
      .from("candidates")
      .update({ ai_score: score })
      .eq("id", candidateId)
      .eq("owner_id", user.id);

    return NextResponse.json({
      score,
      reasoning: parsed.reasoning,
      strengths: parsed.strengths ?? [],
      gaps: parsed.gaps ?? [],
    });
  } catch (error) {
    console.error("Score error:", error);
    return NextResponse.json({ error: "Scoring failed" }, { status: 500 });
  }
}
