import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Briefcase, Users, CalendarCheck, TrendingUp, Plus } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const displayName = user.user_metadata?.full_name?.split(" ")[0] ?? "there";

  const { count: jobCount } = await supabase
    .from("jobs")
    .select("*", { count: "exact", head: true })
    .eq("owner_id", user.id);

  const hasJobs = (jobCount ?? 0) > 0;

  return (
    <DashboardLayout>
      <header className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Welcome, {displayName} 👋</h1>
          <p className="text-sm text-slate-500">{hasJobs ? "Here's what's happening today" : "Let's get your first job posted"}</p>
        </div>
        <Link href="/dashboard/jobs/new" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          New Job
        </Link>
      </header>

      <div className="p-8">
        {hasJobs ? (
          <>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
              {[
                { label: "Active Jobs", icon: Briefcase, color: "text-indigo-600", bg: "bg-indigo-50", value: jobCount ?? 0 },
                { label: "Total Applicants", icon: Users, color: "text-purple-600", bg: "bg-purple-50", value: 0 },
                { label: "Interviews Scheduled", icon: CalendarCheck, color: "text-emerald-600", bg: "bg-emerald-50", value: 0 },
                { label: "Avg. Time to Hire", icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50", value: "—" },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="bg-white rounded-xl border border-slate-100 p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                  </div>
                );
              })}
            </div>
            <div className="bg-white rounded-xl border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-slate-900">Active Job Listings</h2>
                <Link href="/dashboard/jobs" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View all →</Link>
              </div>
              <p className="text-sm text-slate-500">Your jobs are loading…</p>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6">
              <Briefcase className="w-8 h-8 text-indigo-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">No jobs posted yet</h2>
            <p className="text-slate-500 text-sm mb-8 text-center max-w-sm">
              Post your first job and let RecruitAI automatically screen, score, and shortlist the best candidates for you.
            </p>
            <Link href="/dashboard/jobs/new" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm">
              <Plus className="w-5 h-5" />
              Post your first job
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
