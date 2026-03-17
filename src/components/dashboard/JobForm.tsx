"use client";
import { useActionState } from "react";
import { Loader2 } from "lucide-react";

type JobData = {
  title?: string;
  location?: string | null;
  remote?: boolean;
  employment_type?: string | null;
  description?: string | null;
  requirements?: string | null;
  salary_min?: number | null;
  salary_max?: number | null;
  status?: string;
};

type ActionFn = (formData: FormData) => Promise<{ error: string } | void>;

export default function JobForm({ action, initialData }: { action: ActionFn; initialData?: JobData }) {
  const [state, formAction, isPending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      const result = await action(formData);
      return result ?? null;
    },
    null
  );

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {state.error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Job Title <span className="text-red-500">*</span>
        </label>
        <input
          name="title"
          defaultValue={initialData?.title ?? ""}
          placeholder="e.g. Senior Software Engineer"
          required
          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Location</label>
          <input
            name="location"
            defaultValue={initialData?.location ?? ""}
            placeholder="e.g. London, UK"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Employment Type</label>
          <select
            name="employment_type"
            defaultValue={initialData?.employment_type ?? ""}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
          >
            <option value="">Select type</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="remote"
          id="remote"
          defaultChecked={initialData?.remote ?? false}
          className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
        />
        <label htmlFor="remote" className="text-sm font-medium text-slate-700">Remote position</label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Salary Min (£)</label>
          <input
            type="number"
            name="salary_min"
            defaultValue={initialData?.salary_min ?? ""}
            placeholder="30000"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Salary Max (£)</label>
          <input
            type="number"
            name="salary_max"
            defaultValue={initialData?.salary_max ?? ""}
            placeholder="50000"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
        <textarea
          name="description"
          defaultValue={initialData?.description ?? ""}
          rows={4}
          placeholder="Describe the role, team, and what you're looking for..."
          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Requirements</label>
        <textarea
          name="requirements"
          defaultValue={initialData?.requirements ?? ""}
          rows={4}
          placeholder="List key requirements, one per line..."
          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
        />
      </div>

      {initialData && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
          <select
            name="status"
            defaultValue={initialData?.status ?? "active"}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
          >
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
        >
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          {initialData ? "Save Changes" : "Post Job"}
        </button>
      </div>
    </form>
  );
}
