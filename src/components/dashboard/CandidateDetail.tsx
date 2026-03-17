"use client";
import { updateCandidateStage, deleteCandidate } from "@/app/actions/candidates";
import { Mail, Phone, Linkedin, Briefcase, Star, FileText, Trash2, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";

const STAGES = ["new", "screening", "interview", "offer", "hired", "rejected"] as const;
type Stage = typeof STAGES[number];

const stageColors: Record<Stage, string> = {
  new: "bg-slate-100 text-slate-700",
  screening: "bg-blue-100 text-blue-700",
  interview: "bg-yellow-100 text-yellow-700",
  offer: "bg-purple-100 text-purple-700",
  hired: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-600",
};

type Candidate = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  linkedin_url?: string | null;
  cv_text?: string | null;
  stage: string;
  ai_score?: number | null;
  notes?: string | null;
  created_at: string;
  job_id?: string | null;
  jobs?: { title: string } | null;
};

export default function CandidateDetail({ candidate }: { candidate: Candidate }) {
  const [stage, setStage] = useState(candidate.stage as Stage);
  const [updating, setUpdating] = useState(false);
  const [scoring, setScoring] = useState(false);
  const [scoreResult, setScoreResult] = useState<{ score: number; reasoning: string; strengths: string[]; gaps: string[] } | null>(null);
  const [currentScore, setCurrentScore] = useState(candidate.ai_score ?? null);

  const handleScore = async () => {
    setScoring(true);
    try {
      const res = await fetch("/api/score-candidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidateId: candidate.id, jobId: candidate.job_id ?? null }),
      });
      const data = await res.json();
      if (data.score != null) {
        setCurrentScore(data.score);
        setScoreResult(data);
      }
    } catch (err) {
      console.error("Scoring failed:", err);
    } finally {
      setScoring(false);
    }
  };

  const handleStageChange = async (newStage: Stage) => {
    setUpdating(true);
    setStage(newStage);
    await updateCandidateStage(candidate.id, newStage);
    setUpdating(false);
  };

  const handleDelete = async () => {
    if (!confirm("Delete this candidate? This cannot be undone.")) return;
    await deleteCandidate(candidate.id);
  };

  return (
    <div className="space-y-6">
      {/* Contact info card */}
      <div className="bg-white rounded-xl border border-slate-100 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
              {candidate.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{candidate.name}</h2>
              {candidate.jobs?.title && (
                <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <Briefcase className="w-3.5 h-3.5" /> {candidate.jobs.title}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {currentScore != null && (
              <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                <span className="font-bold text-amber-700">{currentScore}/100</span>
              </div>
            )}
            <button
              onClick={handleScore}
              disabled={scoring || !candidate.cv_text}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              {scoring ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {scoring ? "Scoring…" : "Score with AI"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <a href={`mailto:${candidate.email}`} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600">
            <Mail className="w-4 h-4" /> {candidate.email}
          </a>
          {candidate.phone && (
            <a href={`tel:${candidate.phone}`} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600">
              <Phone className="w-4 h-4" /> {candidate.phone}
            </a>
          )}
          {candidate.linkedin_url && (
            <a href={candidate.linkedin_url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-600 hover:text-indigo-600">
              <Linkedin className="w-4 h-4" /> LinkedIn Profile
            </a>
          )}
        </div>
      </div>

      {/* AI Score result */}
      {scoreResult && (
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
              <span className="text-xl font-black text-amber-700">{scoreResult.score}</span>
            </div>
            <div>
              <p className="font-semibold text-slate-900">AI Score: {scoreResult.score}/100</p>
              <p className="text-sm text-slate-600">{scoreResult.reasoning}</p>
            </div>
          </div>
          {scoreResult.strengths?.length > 0 && (
            <div className="mb-2">
              <p className="text-xs font-semibold text-emerald-700 mb-1">Strengths</p>
              <ul className="text-xs text-slate-600 space-y-0.5">
                {scoreResult.strengths.map((s, i) => (
                  <li key={i} className="flex gap-1.5"><span className="text-emerald-500">✓</span>{s}</li>
                ))}
              </ul>
            </div>
          )}
          {scoreResult.gaps?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-red-600 mb-1">Gaps</p>
              <ul className="text-xs text-slate-600 space-y-0.5">
                {scoreResult.gaps.map((g, i) => (
                  <li key={i} className="flex gap-1.5"><span className="text-red-400">✗</span>{g}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Stage pipeline */}
      <div className="bg-white rounded-xl border border-slate-100 p-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Pipeline Stage</h3>
        <div className="flex flex-wrap gap-2">
          {STAGES.map((s) => (
            <button key={s} onClick={() => handleStageChange(s)} disabled={updating}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                stage === s
                  ? `${stageColors[s]} border-current shadow-sm scale-105`
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* CV text */}
      {candidate.cv_text && (
        <div className="bg-white rounded-xl border border-slate-100 p-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4" /> CV / Resume
          </h3>
          <pre className="text-sm text-slate-600 whitespace-pre-wrap font-mono bg-slate-50 rounded-lg p-4 max-h-96 overflow-y-auto">
            {candidate.cv_text}
          </pre>
        </div>
      )}

      {/* Delete */}
      <div className="pt-2 border-t border-slate-200">
        <button onClick={handleDelete}
          className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium">
          <Trash2 className="w-4 h-4" /> Delete Candidate
        </button>
      </div>
    </div>
  );
}
