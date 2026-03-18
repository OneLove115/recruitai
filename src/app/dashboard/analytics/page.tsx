import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { BarChart3, Clock } from "lucide-react";

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Fetch basic stats
  const [{ count: jobCount }, { count: candidateCount }] = await Promise.all([
    supabase.from("jobs").select("*", { count: "exact", head: true }).eq("owner_id", user.id),
    supabase.from("candidates").select("*", { count: "exact", head: true }).eq("owner_id", user.id),
  ]);

  return (
    <DashboardLayout>
      <header className="bg-white border-b border-slate-100 px-8 py-4">
        <h1 className="text-xl font-bold text-slate-900">Analytics</h1>
        <p className="text-sm text-slate-500">Track your hiring performance</p>
      </header>
      <div className="p-8">
        {/* Summary stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          {[
            { label: "Total Jobs", value: jobCount ?? 0, color: "bg-indigo-50 text-indigo-600" },
            { label: "Total Candidates", value: candidateCount ?? 0, color: "bg-purple-50 text-purple-600" },
            { label: "Hired", value: 0, color: "bg-emerald-50 text-emerald-600" },
            { label: "Avg. Score", value: "—", color: "bg-amber-50 text-amber-600" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-slate-100 p-5">
              <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-5">
            <BarChart3 className="w-7 h-7 text-indigo-400" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Detailed analytics coming soon</h2>
          <p className="text-slate-500 text-sm mb-4 text-center max-w-sm">
            Charts for time-to-hire, pipeline conversion rates, and source tracking are on the roadmap.
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 px-4 py-2 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            Coming in next release
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
