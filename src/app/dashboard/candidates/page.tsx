import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Users, Plus, Briefcase, Mail, Star } from "lucide-react";

const stageColors: Record<string, string> = {
  new: "bg-slate-100 text-slate-600",
  screening: "bg-blue-100 text-blue-700",
  interview: "bg-yellow-100 text-yellow-700",
  offer: "bg-purple-100 text-purple-700",
  hired: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-600",
};

export default async function CandidatesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: candidates } = await supabase
    .from("candidates")
    .select("*, jobs(title)")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <DashboardLayout>
      <header className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Candidates</h1>
          <p className="text-sm text-slate-500">{candidates?.length ?? 0} candidate{candidates?.length !== 1 ? "s" : ""} total</p>
        </div>
        <Link href="/dashboard/candidates/new"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Candidate
        </Link>
      </header>

      <div className="p-8">
        {!candidates?.length ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">No candidates yet</h2>
            <p className="text-slate-500 text-sm mb-8 text-center max-w-sm">
              Add candidates manually or share a job link to receive applications.
            </p>
            <Link href="/dashboard/candidates/new"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add first candidate
            </Link>
          </div>
        ) : (
          <div className="grid gap-3">
            {candidates.map((c) => (
              <Link key={c.id} href={`/dashboard/candidates/${c.id}`}
                className="bg-white rounded-xl border border-slate-100 p-5 hover:border-indigo-200 hover:shadow-sm transition-all group flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors truncate">{c.name}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${stageColors[c.stage] ?? stageColors.new}`}>
                      {c.stage}
                    </span>
                    {c.ai_score != null && (
                      <span className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                        <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                        {c.ai_score}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{c.email}</span>
                    {(c as any).jobs?.title && (
                      <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{(c as any).jobs.title}</span>
                    )}
                  </div>
                </div>
                <div className="text-sm text-slate-400 flex-shrink-0">
                  {new Date(c.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
