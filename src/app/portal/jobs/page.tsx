import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { MapPin, Clock, Briefcase } from "lucide-react";

const employmentTypeLabel: Record<string, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  "contract": "Contract",
  "internship": "Internship",
};

export default async function PortalJobsPage() {
  const supabase = await createClient();

  const { data: jobs } = await supabase
    .from("jobs")
    .select("id, title, location, remote, employment_type, description, created_at")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Open Positions</h1>
        <p className="text-slate-500">
          {jobs?.length ? `${jobs.length} position${jobs.length !== 1 ? "s" : ""} available` : "No open positions right now"}
        </p>
      </div>

      {!jobs?.length ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-indigo-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">No open positions</h2>
          <p className="text-slate-500">Check back soon for new opportunities.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <Link key={job.id} href={`/portal/jobs/${job.id}`}
              className="bg-white rounded-2xl border border-slate-100 p-6 hover:border-indigo-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors mb-2">
                    {job.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-3">
                    {job.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" /> {job.location}
                      </span>
                    )}
                    {job.remote && (
                      <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full">Remote</span>
                    )}
                    {job.employment_type && (
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {employmentTypeLabel[job.employment_type] ?? job.employment_type}
                      </span>
                    )}
                  </div>
                  {job.description && (
                    <p className="text-sm text-slate-600 line-clamp-2">{job.description}</p>
                  )}
                </div>
                <div className="ml-4 flex-shrink-0">
                  <span className="inline-flex items-center bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg group-hover:bg-indigo-700 transition-colors">
                    Apply →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
