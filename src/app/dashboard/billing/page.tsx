"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Zap, CreditCard, Calendar, Download } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const features = [
  "Unlimited job postings",
  "AI CV scoring & ranking",
  "Hidden criteria builder",
  "Pipeline Kanban board",
  "Interview scheduling",
  "Candidate portal",
  "Hiring analytics dashboard",
  "Email & calendar integrations",
  "Team collaboration tools",
  "Priority support",
];

export default function BillingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
  const [loading, setLoading] = useState(false);

  const monthlyPrice = 79;
  const yearlyPrice = 758;
  const yearlySavings = monthlyPrice * 12 - yearlyPrice;

  const handleCheckout = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      window.location.href = "/login";
      return;
    }

    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ billing }),
      });

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Upgrade to Pro
          </h1>
          <p className="text-slate-500">
            Unlock all features and hire smarter with RecruitAI
          </p>
        </div>

        {/* Plan card */}
        <div className="bg-white rounded-2xl border-2 border-indigo-600 shadow-xl shadow-indigo-100 p-8 mb-8">
          {/* Popular badge */}
          <div className="flex items-center justify-center mb-6">
            <span className="inline-flex items-center gap-1.5 bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">
              <Zap className="w-3 h-3" />
              Most Popular
            </span>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Pro Plan</h2>
            <p className="text-slate-500 text-sm">Everything you need to hire faster</p>
          </div>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span
              className={`text-sm font-medium transition-colors ${
                billing === "monthly" ? "text-slate-900" : "text-slate-400"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                billing === "yearly" ? "bg-indigo-600" : "bg-slate-200"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${
                  billing === "yearly" ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium flex items-center gap-2 ${
                billing === "yearly" ? "text-slate-900" : "text-slate-400"
              }`}
            >
              Yearly
              <span className="inline-flex items-center bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">
                Save ${yearlySavings}
              </span>
            </span>
          </div>

          {/* Price */}
          <div className="text-center mb-8">
            <div className="flex items-end justify-center gap-1">
              <span className="text-2xl font-bold text-slate-500">$</span>
              <span className="text-6xl font-black text-slate-900">
                {billing === "monthly" ? monthlyPrice : Math.round(yearlyPrice / 12)}
              </span>
              <span className="text-slate-500 mb-2">/month per recruiter</span>
            </div>
            {billing === "yearly" && (
              <p className="text-sm text-emerald-600 font-medium mt-2">
                Billed ${yearlyPrice}/year · Save ${yearlySavings} vs monthly
              </p>
            )}
          </div>

          {/* CTA */}
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 active:scale-95 mb-8"
          >
            {loading ? "Redirecting..." : "Start 14-day free trial"}
          </button>

          <p className="text-center text-xs text-slate-400 mb-8">
            No credit card required · Cancel anytime
          </p>

          {/* Features */}
          <div className="grid sm:grid-cols-2 gap-3">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-indigo-600 stroke-[2.5]" />
                </div>
                <span className="text-sm text-slate-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="bg-slate-900 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Need a custom plan?</h3>
            <p className="text-slate-400 text-sm">
              Enterprise teams of 10+ get dedicated support, custom AI training, and more.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
          >
            Talk to sales
          </Link>
        </div>

        {/* Footer info */}
        <div className="mt-8 flex items-center justify-center gap-8 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            <span>Secure payment via Stripe</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}