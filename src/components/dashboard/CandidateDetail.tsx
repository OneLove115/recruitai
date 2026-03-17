"use client";
import { updateCandidateStage, deleteCandidate } from "@/app/actions/candidates";
import { Mail, Phone, Linkedin, Briefcase, Star, FileText, Trash2 } from "lucide-react";
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
  jobs?: { title: string } | null;
};

export default function CandidateDetail({ candidate }: { candidate: Candidate }) {
  const [stage, setStage] = useState(candidate.stage as Stage);
  const [updating, setUpdating] = useState(false);

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
          {candidate.ai_score != null && (
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
              <span className="font-bold text-amber-700">{candidate.ai_score}/100</span>
            </div>
          )}
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
