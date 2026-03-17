"use client";
import { updateJob, deleteJob } from "@/app/actions/jobs";
import JobForm from "./JobForm";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type Job = {
  id: string;
  title: string;
  location?: string | null;
  remote?: boolean;
  employment_type?: string | null;
  description?: string | null;
  requirements?: string | null;
  salary_min?: number | null;
  salary_max?: number | null;
  status?: string;
};

export default function JobEditForm({ job }: { job: Job }) {
  const [deleting, setDeleting] = useState(false);

  const updateAction = updateJob.bind(null, job.id);

  const handleDelete = async () => {
    if (!confirm("Delete this job? This cannot be undone.")) return;
    setDeleting(true);
    await deleteJob(job.id);
  };

  return (
    <div>
      <JobForm action={updateAction} initialData={job} />
      <div className="mt-8 pt-6 border-t border-slate-200">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Danger Zone</h3>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium border border-red-200 hover:border-red-300 px-4 py-2 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          {deleting ? "Deleting…" : "Delete Job"}
        </button>
      </div>
    </div>
  );
}
