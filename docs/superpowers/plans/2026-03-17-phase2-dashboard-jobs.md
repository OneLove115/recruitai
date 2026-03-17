# RecruitAI Phase 2: Dashboard Layout + Jobs Management

**Goal:** Extract shared DashboardLayout, build full Jobs CRUD with real Supabase data, add tests.

**Architecture:**
- `src/components/dashboard/DashboardLayout.tsx` — Client Component, shared sidebar+header wrapper
- `src/app/dashboard/jobs/page.tsx` — Server Component, jobs listing
- `src/app/dashboard/jobs/new/page.tsx` — Client Component, create job form
- `src/app/dashboard/jobs/[id]/page.tsx` — edit job (server fetch → client form)
- `src/app/actions/jobs.ts` — Server Actions for CRUD
- `src/app/dashboard/jobs/__tests__/jobs.test.tsx` — tests

**DB:** Jobs table already exists. Add `salary_min int, salary_max int, requirements text` columns via migration.

---

## Task 1: DashboardLayout component

**Files:**
- Create: `src/components/dashboard/DashboardLayout.tsx`
- Modify: `src/app/dashboard/page.tsx` (use DashboardLayout)
- Modify: `src/app/dashboard/billing/page.tsx` (use DashboardLayout)

Create `src/components/dashboard/DashboardLayout.tsx` — Client Component with sidebar + top header:

```tsx
"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Briefcase, Users, CalendarCheck, BarChart3, Settings, Zap, Plus } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Briefcase, label: "Jobs", href: "/dashboard/jobs" },
  { icon: Users, label: "Candidates", href: "/dashboard/candidates" },
  { icon: CalendarCheck, label: "Interviews", href: "/dashboard/interviews" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
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
              const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
        <div className="p-4 border-t border-slate-100">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
            <p className="text-xs font-bold text-indigo-900 mb-1">Free trial — 14 days left</p>
            <p className="text-xs text-indigo-600 mb-3">Upgrade to keep access</p>
            <Link href="/dashboard/billing"
              className="block text-center text-xs font-semibold bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Upgrade now
            </Link>
          </div>
        </div>
      </aside>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
```

Update `dashboard/page.tsx` to use DashboardLayout (remove the inline sidebar, wrap with DashboardLayout).

- [ ] Create DashboardLayout component
- [ ] Update dashboard/page.tsx to use DashboardLayout
- [ ] Update billing/page.tsx to use DashboardLayout
- [ ] Run build check: `npm run build -- --no-lint 2>&1 | tail -5`
- [ ] Commit: `git commit -m "feat: extract DashboardLayout shared sidebar component"`

---

## Task 2: Jobs server action

**Files:**
- Create: `src/app/actions/jobs.ts`

```ts
"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createJob(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const title = formData.get("title") as string;
  const location = formData.get("location") as string | null;
  const remote = formData.get("remote") === "on";
  const employment_type = formData.get("employment_type") as string | null;
  const description = formData.get("description") as string | null;
  const requirements = formData.get("requirements") as string | null;
  const salary_min = formData.get("salary_min") ? Number(formData.get("salary_min")) : null;
  const salary_max = formData.get("salary_max") ? Number(formData.get("salary_max")) : null;

  if (!title?.trim()) {
    return { error: "Job title is required" };
  }

  const { error } = await supabase.from("jobs").insert({
    owner_id: user.id,
    title: title.trim(),
    location: location || null,
    remote,
    employment_type: employment_type || null,
    description: description || null,
    requirements: requirements || null,
    salary_min,
    salary_max,
    status: "active",
  });

  if (error) return { error: error.message };
  redirect("/dashboard/jobs");
}

export async function updateJob(id: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const title = formData.get("title") as string;
  if (!title?.trim()) return { error: "Job title is required" };

  const { error } = await supabase.from("jobs").update({
    title: title.trim(),
    location: (formData.get("location") as string) || null,
    remote: formData.get("remote") === "on",
    employment_type: (formData.get("employment_type") as string) || null,
    description: (formData.get("description") as string) || null,
    requirements: (formData.get("requirements") as string) || null,
    salary_min: formData.get("salary_min") ? Number(formData.get("salary_min")) : null,
    salary_max: formData.get("salary_max") ? Number(formData.get("salary_max")) : null,
    status: (formData.get("status") as string) || "active",
  }).eq("id", id).eq("owner_id", user.id);

  if (error) return { error: error.message };
  redirect("/dashboard/jobs");
}

export async function deleteJob(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase.from("jobs").delete().eq("id", id).eq("owner_id", user.id);
  if (error) return { error: error.message };
  redirect("/dashboard/jobs");
}
```

- [ ] Create `src/app/actions/jobs.ts`
- [ ] Commit: `git commit -m "feat: jobs server actions (create/update/delete)"`

---

## Task 3: Jobs listing page

**Files:**
- Create: `src/app/dashboard/jobs/page.tsx`

Server Component: fetch jobs for current user, display as cards.

```tsx
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
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColors[job.status] ?? statusColors.active}`}>
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
                          {employmentTypeLabel[job.employment_type] ?? job.employment_type}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        0 candidates
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-slate-400">
                    {new Date(job.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
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
```

- [ ] Create `src/app/dashboard/jobs/page.tsx`
- [ ] Commit: `git commit -m "feat: jobs listing page with real Supabase data"`

---

## Task 4: Job create + edit forms

**Files:**
- Create: `src/app/dashboard/jobs/new/page.tsx`
- Create: `src/app/dashboard/jobs/[id]/page.tsx`
- Create: `src/components/dashboard/JobForm.tsx`

`JobForm.tsx` is the shared form component (Client Component):
- Fields: title*, location, remote (checkbox), employment_type (select), description (textarea), requirements (textarea), salary_min/max
- `action` prop = server action (create or update)
- Shows validation error if returned

`jobs/new/page.tsx`:
```tsx
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import JobForm from "@/components/dashboard/JobForm";
import { createJob } from "@/app/actions/jobs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewJobPage() {
  return (
    <DashboardLayout>
      <header className="bg-white border-b border-slate-100 px-8 py-4">
        <Link href="/dashboard/jobs" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Jobs
        </Link>
        <h1 className="text-xl font-bold text-slate-900 mt-2">Post New Job</h1>
      </header>
      <div className="p-8 max-w-2xl">
        <JobForm action={createJob} />
      </div>
    </DashboardLayout>
  );
}
```

`jobs/[id]/page.tsx`: Server Component fetches job, renders JobForm with initial values and updateJob action.

- [ ] Create `src/components/dashboard/JobForm.tsx`
- [ ] Create `src/app/dashboard/jobs/new/page.tsx`
- [ ] Create `src/app/dashboard/jobs/[id]/page.tsx`
- [ ] Commit: `git commit -m "feat: job create and edit forms"`

---

## Task 5: DB migration for extended jobs fields

**Files:**
- Create: `supabase/migrations/20260317000002_jobs_extended.sql`

```sql
-- Add extended fields to jobs table
alter table jobs
  add column if not exists requirements text,
  add column if not exists salary_min integer,
  add column if not exists salary_max integer,
  add column if not exists hidden_criteria jsonb default '[]';
```

- [ ] Create migration file
- [ ] Commit: `git commit -m "chore: migration for extended jobs fields"`

---

## Task 6: Tests

**Files:**
- Create: `src/app/dashboard/jobs/__tests__/jobs.test.tsx`

Test:
1. DashboardLayout renders nav links (Dashboard, Jobs, Candidates, etc.)
2. JobForm: shows title required error when submitting empty form
3. Jobs page empty state shows "No jobs yet"

Use `vi.mock("next/navigation", ...)` to mock `usePathname`.

- [ ] Create test file
- [ ] Run `npm run test:run` — all tests must pass
- [ ] Commit: `git commit -m "test: jobs dashboard and form tests"`
