import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Briefcase, Plus, MapPin, Clock, Users } from "lucide-react";

const employmentTypeLabel: Record<string, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  "contract": "Contract",
  "internship": "Internship",
};

const statusColors: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700",
  paused: "bg-yellow-100 text-yellow-700",
  closed: "bg-slate-100 text-slate-500",
};

export default async function JobsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <DashboardLayout>
      <header className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Jobs</h1>
          <p className="text-sm text-slate-500">{jobs?.length ?? 0} job{jobs?.length !== 1 ? "s" : ""} posted</p>
        </div>
        <Link href="/dashboard/jobs/new"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Job
        </Link>
      </header>

      <div className="p-8">
        {!jobs?.length ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6">
              <Briefcase className="w-8 h-8 text-indigo-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">No jobs yet</h2>
            <p className="text-slate-500 text-sm mb-8 text-center max-w-sm">
              Post your first job to start attracting candidates.
            </p>
            <Link href="/dashboard/jobs/new"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Post your first job
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {jobs.map((job) => (
              <Link key={job.id} href={`/dashboard/jobs/${job.id}`}
                className="bg-white rounded-xl border border-slate-100 p-6 hover:border-indigo-200 hover:shadow-sm transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">
                        {job.title}
                      </h3>
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColors[job.status as string] ?? statusColors.active}`}>
                        {job.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      {job.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {job.location}
                        </span>
                      )}
                      {job.remote && <span className="text-indigo-600 font-medium">Remote</span>}
                      {job.employment_type && (
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {employmentTypeLabel[job.employment_type as string] ?? job.employment_type}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        0 candidates
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-slate-400">
                    {new Date(job.created_at as string).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
