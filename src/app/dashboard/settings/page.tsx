import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Settings, User, Bell, Lock, CreditCard } from "lucide-react";
import Link from "next/link";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const displayName = user.user_metadata?.full_name ?? user.email ?? "User";
  const company = user.user_metadata?.company_name ?? "";

  return (
    <DashboardLayout>
      <header className="bg-white border-b border-slate-100 px-8 py-4">
        <h1 className="text-xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500">Manage your account and preferences</p>
      </header>
      <div className="p-8 max-w-2xl space-y-6">
        {/* Profile */}
        <div className="bg-white rounded-xl border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
              <User className="w-4 h-4 text-indigo-600" />
            </div>
            <h2 className="font-semibold text-slate-900">Profile</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Full name</label>
              <p className="text-sm text-slate-900 font-medium">{displayName}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Email</label>
              <p className="text-sm text-slate-900 font-medium">{user.email}</p>
            </div>
            {company && (
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Company</label>
                <p className="text-sm text-slate-900 font-medium">{company}</p>
              </div>
            )}
          </div>
        </div>

        {/* Notifications placeholder */}
        <div className="bg-white rounded-xl border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
              <Bell className="w-4 h-4 text-purple-600" />
            </div>
            <h2 className="font-semibold text-slate-900">Notifications</h2>
          </div>
          <p className="text-sm text-slate-500">Email notification preferences coming soon.</p>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Lock className="w-4 h-4 text-emerald-600" />
            </div>
            <h2 className="font-semibold text-slate-900">Security</h2>
          </div>
          <Link href="/forgot-password"
            className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            Change password →
          </Link>
        </div>

        {/* Billing */}
        <div className="bg-white rounded-xl border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-amber-600" />
            </div>
            <h2 className="font-semibold text-slate-900">Billing</h2>
          </div>
          <p className="text-sm text-slate-500 mb-3">Manage your subscription and payment details.</p>
          <Link href="/dashboard/billing"
            className="inline-flex items-center gap-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
            <Settings className="w-4 h-4" />
            Manage billing
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
