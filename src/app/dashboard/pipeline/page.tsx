import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PipelineBoard from "@/components/dashboard/PipelineBoard";

const STAGES = ["new", "screening", "interview", "offer", "hired", "rejected"] as const;

export default async function PipelinePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: candidates } = await supabase
    .from("candidates")
    .select("id, name, email, stage, ai_score, jobs(title)")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  type PipelineCandidate = {
    id: string;
    name: string;
    email: string;
    stage: string;
    ai_score?: number | null;
    jobs?: { title: string } | null;
  };

  const normalise = (c: NonNullable<typeof candidates>[number]): PipelineCandidate => ({
    id: c.id,
    name: c.name,
    email: c.email,
    stage: c.stage,
    ai_score: c.ai_score,
    jobs: Array.isArray(c.jobs) ? (c.jobs[0] ?? null) : (c.jobs ?? null),
  });

  const grouped = STAGES.reduce((acc, stage) => {
    acc[stage] = (candidates ?? []).filter((c) => c.stage === stage).map(normalise);
    return acc;
  }, {} as Record<string, PipelineCandidate[]>);

  return (
    <DashboardLayout>
      <header className="bg-white border-b border-slate-100 px-8 py-4">
        <h1 className="text-xl font-bold text-slate-900">Pipeline</h1>
        <p className="text-sm text-slate-500">{candidates?.length ?? 0} candidates across all stages</p>
      </header>
      <div className="p-6 overflow-x-auto">
        <PipelineBoard initialGrouped={grouped} stages={STAGES as unknown as string[]} />
      </div>
    </DashboardLayout>
  );
}
