"use client";
import { useActionState } from "react";
import { createCandidate } from "@/app/actions/candidates";
import { Loader2 } from "lucide-react";

type Job = { id: string; title: string };

export default function AddCandidateForm({ jobs }: { jobs: Job[] }) {
  const [state, formAction, isPending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      const result = await createCandidate(formData);
      return result ?? null;
    },
    null
  );

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">{state.error}</div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
          <input name="name" required placeholder="Jane Smith"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email <span className="text-red-500">*</span></label>
          <input name="email" type="email" required placeholder="jane@example.com"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
          <input name="phone" placeholder="+44 7700 900000"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">LinkedIn URL</label>
          <input name="linkedin_url" placeholder="https://linkedin.com/in/..."
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      {jobs.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Applying for Job</label>
          <select name="job_id" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
            <option value="">No specific job</option>
            {jobs.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">CV / Resume Text</label>
        <textarea name="cv_text" rows={6} placeholder="Paste candidate's CV or resume text here..."
          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
      </div>

      <button type="submit" disabled={isPending}
        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors">
        {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
        Add Candidate
      </button>
    </form>
  );
}
