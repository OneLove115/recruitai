import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AddCandidateForm from "@/components/dashboard/AddCandidateForm";

export default async function NewCandidatePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: jobs } = await supabase
    .from("jobs")
    .select("id, title")
    .eq("owner_id", user.id)
    .eq("status", "active")
    .order("created_at", { ascending: false });

  return (
    <DashboardLayout>
      <header className="bg-white border-b border-slate-100 px-8 py-4">
        <Link href="/dashboard/candidates" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm mb-3">
          <ArrowLeft className="w-4 h-4" /> Back to Candidates
        </Link>
        <h1 className="text-xl font-bold text-slate-900">Add Candidate</h1>
      </header>
      <div className="p-8 max-w-2xl">
        <AddCandidateForm jobs={jobs ?? []} />
      </div>
    </DashboardLayout>
  );
}
