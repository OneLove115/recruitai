"use client";
import Link from "next/link";
import { Star } from "lucide-react";
import { useState } from "react";
import { updateCandidateStage } from "@/app/actions/candidates";

const stageConfig: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: "New", color: "text-slate-600", bg: "bg-slate-50 border-slate-200" },
  screening: { label: "Screening", color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
  interview: { label: "Interview", color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200" },
  offer: { label: "Offer", color: "text-purple-700", bg: "bg-purple-50 border-purple-200" },
  hired: { label: "Hired", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
  rejected: { label: "Rejected", color: "text-red-600", bg: "bg-red-50 border-red-200" },
};

type Candidate = {
  id: string;
  name: string;
  email: string;
  stage: string;
  ai_score?: number | null;
  jobs?: { title: string } | null;
};

export default function PipelineBoard({
  initialGrouped,
  stages,
}: {
  initialGrouped: Record<string, Candidate[] | null | undefined>;
  stages: string[];
}) {
  const [grouped, setGrouped] = useState<Record<string, Candidate[]>>(
    stages.reduce((acc, s) => ({ ...acc, [s]: initialGrouped[s] ?? [] }), {})
  );

  const moveCandidate = async (candidateId: string, fromStage: string, toStage: string) => {
    const candidate = grouped[fromStage]?.find((c) => c.id === candidateId);
    if (!candidate || fromStage === toStage) return;

    // Optimistic update
    setGrouped((prev) => ({
      ...prev,
      [fromStage]: prev[fromStage].filter((c) => c.id !== candidateId),
      [toStage]: [{ ...candidate, stage: toStage }, ...(prev[toStage] ?? [])],
    }));

    await updateCandidateStage(candidateId, toStage);
  };

  return (
    <div className="flex gap-4 min-w-max pb-4">
      {stages.map((stage) => {
        const config = stageConfig[stage] ?? { label: stage, color: "text-slate-600", bg: "bg-slate-50 border-slate-200" };
        const cards = grouped[stage] ?? [];
        return (
          <div key={stage} className={`w-64 rounded-xl border p-3 ${config.bg}`}>
            <div className="flex items-center justify-between mb-3 px-1">
              <span className={`text-xs font-bold uppercase tracking-wide ${config.color}`}>{config.label}</span>
              <span className={`text-xs font-medium ${config.color} bg-white/60 px-2 py-0.5 rounded-full`}>{cards.length}</span>
            </div>
            <div className="space-y-2">
              {cards.map((c) => (
                <div key={c.id} className="bg-white rounded-lg border border-slate-100 p-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-1">
                    <Link href={`/dashboard/candidates/${c.id}`}
                      className="text-sm font-semibold text-slate-900 hover:text-indigo-700 transition-colors line-clamp-1">
                      {c.name}
                    </Link>
                    {c.ai_score != null && (
                      <span className="flex items-center gap-0.5 text-xs text-amber-600 font-medium ml-1 flex-shrink-0">
                        <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                        {c.ai_score}
                      </span>
                    )}
                  </div>
                  {(c as any).jobs?.title && (
                    <p className="text-xs text-slate-500 mb-2 truncate">{(c as any).jobs.title}</p>
                  )}
                  {/* Move buttons */}
                  <div className="flex gap-1 mt-2">
                    {stages.filter((s) => s !== stage).slice(0, 3).map((targetStage) => (
                      <button key={targetStage} onClick={() => moveCandidate(c.id, stage, targetStage)}
                        className="text-xs text-slate-400 hover:text-slate-700 px-1.5 py-0.5 rounded border border-slate-100 hover:border-slate-300 transition-colors">
                        → {stageConfig[targetStage]?.label ?? targetStage}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {cards.length === 0 && (
                <div className="text-center py-6 text-xs text-slate-400">No candidates</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
