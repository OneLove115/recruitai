import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  CalendarCheck,
  BarChart3,
  Settings,
  Zap,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const displayName = user.user_metadata?.full_name?.split(" ")[0] ?? "there";

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
    { icon: Briefcase, label: "Jobs", href: "/dashboard/jobs" },
    { icon: Users, label: "Candidates", href: "/dashboard/candidates" },
    { icon: CalendarCheck, label: "Interviews", href: "/dashboard/interviews" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  const stats = [
    { label: "Active Jobs", value: "8", change: "+2 this week", icon: Briefcase, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Total Applicants", value: "342", change: "+47 today", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Interviews Scheduled", value: "12", change: "Next: Today 2pm", icon: CalendarCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Avg. Time to Hire", value: "6.2d", change: "↓ 40% vs last month", icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">
              Recruit<span className="text-indigo-600">AI</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    item.active
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Upgrade banner */}
        <div className="p-4 border-t border-slate-100">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
            <p className="text-xs font-bold text-indigo-900 mb-1">Free trial — 12 days left</p>
            <p className="text-xs text-indigo-600 mb-3">Upgrade to keep access</p>
            <Link
              href="/dashboard/billing"
              className="block text-center text-xs font-semibold bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Upgrade now
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Good morning, {displayName} 👋
            </h1>
            <p className="text-sm text-slate-500">Here&apos;s what&apos;s happening today</p>
          </div>
          <Link
            href="/dashboard/jobs/new"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New Job
          </Link>
        </header>

        <div className="p-8">
          {/* Stats grid */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            {stats.map((stat) => {
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
                  <p className="text-xs text-emerald-600 font-medium mt-1">{stat.change}</p>
                </div>
              );
            })}
          </div>

          {/* Recent jobs */}
          <div className="bg-white rounded-xl border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-slate-900">Active Job Listings</h2>
              <Link href="/dashboard/jobs" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                View all →
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { title: "Senior Frontend Engineer", applicants: 127, shortlisted: 18, status: "Active" },
                { title: "Product Manager", applicants: 84, shortlisted: 12, status: "Active" },
                { title: "DevOps Engineer", applicants: 51, shortlisted: 7, status: "Active" },
                { title: "UX Designer", applicants: 93, shortlisted: 15, status: "Paused" },
              ].map((job) => (
                <div key={job.title} className="flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-indigo-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{job.title}</p>
                      <p className="text-xs text-slate-500">
                        {job.applicants} applicants · {job.shortlisted} shortlisted
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      job.status === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }`}>
                      {job.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
