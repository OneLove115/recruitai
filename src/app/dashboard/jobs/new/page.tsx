import DashboardLayout from "@/components/dashboard/DashboardLayout";
import JobForm from "@/components/dashboard/JobForm";
import { createJob } from "@/app/actions/jobs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewJobPage() {
  return (
    <DashboardLayout>
      <header className="bg-white border-b border-slate-100 px-8 py-4">
        <Link href="/dashboard/jobs" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm mb-3">
          <ArrowLeft className="w-4 h-4" /> Back to Jobs
        </Link>
        <h1 className="text-xl font-bold text-slate-900">Post New Job</h1>
      </header>
      <div className="p-8 max-w-2xl">
        <JobForm action={createJob} />
      </div>
    </DashboardLayout>
  );
}
