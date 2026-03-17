import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import JobEditForm from "@/components/dashboard/JobEditForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: job } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .eq("owner_id", user.id)
    .single();

  if (!job) notFound();

  return (
    <DashboardLayout>
      <header className="bg-white border-b border-slate-100 px-8 py-4">
        <Link href="/dashboard/jobs" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm mb-3">
          <ArrowLeft className="w-4 h-4" /> Back to Jobs
        </Link>
        <h1 className="text-xl font-bold text-slate-900">{job.title}</h1>
      </header>
      <div className="p-8 max-w-2xl">
        <JobEditForm job={job} />
      </div>
    </DashboardLayout>
  );
}
