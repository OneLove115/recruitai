import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { CalendarCheck, Clock } from "lucide-react";

export default async function InterviewsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <DashboardLayout>
      <header className="bg-white border-b border-slate-100 px-8 py-4">
        <h1 className="text-xl font-bold text-slate-900">Interviews</h1>
        <p className="text-sm text-slate-500">Manage and schedule candidate interviews</p>
      </header>
      <div className="p-8 flex flex-col items-center justify-center py-24">
        <div className="w-16 h-16 rounded-2xl bg-yellow-50 flex items-center justify-center mb-6">
          <CalendarCheck className="w-8 h-8 text-yellow-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Interview scheduling coming soon</h2>
        <p className="text-slate-500 text-sm mb-4 text-center max-w-sm">
          Schedule and track interviews directly from your pipeline. Move candidates to the <strong>Interview</strong> stage to get started.
        </p>
        <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-4 py-2 rounded-full">
          <Clock className="w-3.5 h-3.5" />
          Coming in next release
        </div>
      </div>
    </DashboardLayout>
  );
}
