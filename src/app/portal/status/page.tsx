"use client";
import { useState } from "react";
import { getApplicationStatus } from "@/app/actions/portal";
import { Search, Briefcase, CheckCircle, Clock, XCircle } from "lucide-react";

const statusConfig: Record<string, { label: string; icon: typeof Clock; color: string; bg: string }> = {
  applied: { label: "Applied", icon: Clock, color: "text-blue-700", bg: "bg-blue-50" },
  reviewing: { label: "Under Review", icon: Clock, color: "text-yellow-700", bg: "bg-yellow-50" },
  interview: { label: "Interview Scheduled", icon: CheckCircle, color: "text-purple-700", bg: "bg-purple-50" },
  offer: { label: "Offer Extended", icon: CheckCircle, color: "text-emerald-700", bg: "bg-emerald-50" },
  rejected: { label: "Not Selected", icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
};

type Application = {
  id: string;
  status: string;
  created_at: string;
  jobs?: { title: string } | null;
};

export default function ApplicationStatusPage() {
  const [email, setEmail] = useState("");
  const [applications, setApplications] = useState<Application[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    const results = await getApplicationStatus(email.trim());
    setApplications(results as unknown as Application[]);
    setLoading(false);
  };

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Track Your Application</h1>
        <p className="text-slate-500">Enter your email to see your application status</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button type="submit" disabled={loading}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold px-5 py-3 rounded-xl transition-colors">
          {loading ? <Clock className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          Search
        </button>
      </form>

      {applications !== null && (
        <div>
          {applications.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
              <p className="text-slate-500">No applications found for <strong>{email}</strong></p>
              <a href="/portal/jobs" className="mt-4 inline-block text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                Browse open positions →
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-slate-500">{applications.length} application{applications.length !== 1 ? "s" : ""} found</p>
              {applications.map((app) => {
                const config = statusConfig[app.status] ?? statusConfig.applied;
                const Icon = config.icon;
                return (
                  <div key={app.id} className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${config.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">
                        {(app as any).jobs?.title ?? "Unknown Position"}
                      </p>
                      <p className={`text-sm font-medium ${config.color}`}>{config.label}</p>
                    </div>
                    <div className="text-xs text-slate-400">
                      {new Date(app.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
