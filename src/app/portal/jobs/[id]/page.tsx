import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Clock, ArrowLeft, DollarSign } from "lucide-react";
import ApplicationForm from "@/components/portal/ApplicationForm";

const employmentTypeLabel: Record<string, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  "contract": "Contract",
  "internship": "Internship",
};

export default async function PortalJobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: job } = await supabase
    .from("jobs")
    .select("id, title, location, remote, employment_type, description, requirements, salary_min, salary_max, created_at")
    .eq("id", id)
    .eq("status", "active")
    .single();

  if (!job) notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/portal/jobs" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm mb-8">
        <ArrowLeft className="w-4 h-4" /> All Positions
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Job details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-100 p-8 mb-6">
            <h1 className="text-2xl font-bold text-slate-900 mb-3">{job.title}</h1>
            <div className="flex flex-wrap gap-3 mb-6 text-sm text-slate-500">
              {job.location && (
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{job.location}</span>
              )}
              {job.remote && (
                <span className="bg-indigo-50 text-indigo-700 font-semibold px-3 py-1 rounded-full text-xs">Remote</span>
              )}
              {job.employment_type && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {employmentTypeLabel[job.employment_type] ?? job.employment_type}
                </span>
              )}
              {(job.salary_min || job.salary_max) && (
                <span className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4" />
                  {job.salary_min && job.salary_max
                    ? `£${job.salary_min.toLocaleString()} – £${job.salary_max.toLocaleString()}`
                    : job.salary_min
                    ? `From £${job.salary_min.toLocaleString()}`
                    : `Up to £${job.salary_max!.toLocaleString()}`}
                </span>
              )}
            </div>

            {job.description && (
              <div className="mb-6">
                <h2 className="text-base font-semibold text-slate-900 mb-2">About the Role</h2>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{job.description}</p>
              </div>
            )}

            {job.requirements && (
              <div>
                <h2 className="text-base font-semibold text-slate-900 mb-2">Requirements</h2>
                <ul className="text-sm text-slate-600 space-y-2">
                  {job.requirements.split("\n").filter(Boolean).map((req: string, i: number) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-indigo-500 font-bold mt-0.5">•</span>
                      {req.trim()}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Application form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 sticky top-6">
            <h2 className="text-lg font-bold text-slate-900 mb-5">Apply Now</h2>
            <ApplicationForm jobId={job.id} jobTitle={job.title} />
          </div>
        </div>
      </div>
    </main>
  );
}
