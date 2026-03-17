"use client";
import { useActionState } from "react";
import { applyToJob } from "@/app/actions/portal";
import { CheckCircle, Loader2 } from "lucide-react";

export default function ApplicationForm({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const [state, formAction, isPending] = useActionState(
    async (
      _prev: { error?: string; success?: boolean; jobTitle?: string } | null,
      formData: FormData
    ) => {
      formData.set("job_id", jobId);
      const result = await applyToJob(formData);
      return result ?? null;
    },
    null
  );

  if (state?.success) {
    return (
      <div className="text-center py-6">
        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-7 h-7 text-emerald-600" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">Application Submitted!</h3>
        <p className="text-sm text-slate-500 mb-4">
          We&apos;ve received your application for <strong>{jobTitle}</strong>. We&apos;ll be in touch soon.
        </p>
        <a href="/portal/jobs" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
          View more positions →
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2.5 rounded-lg">
          {state.error}
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input name="name" required placeholder="Jane Smith"
          className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
          Email <span className="text-red-500">*</span>
        </label>
        <input name="email" type="email" required placeholder="jane@example.com"
          className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Phone</label>
        <input name="phone" placeholder="+44 7700 900000"
          className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">LinkedIn URL</label>
        <input name="linkedin_url" placeholder="https://linkedin.com/in/..."
          className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">CV / Resume</label>
        <textarea name="cv_text" rows={4} placeholder="Paste your CV or key experience here..."
          className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Cover Letter</label>
        <textarea name="cover_letter" rows={3} placeholder="Why are you interested in this role?"
          className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
      </div>

      <button type="submit" disabled={isPending}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
        {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
        {isPending ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}
