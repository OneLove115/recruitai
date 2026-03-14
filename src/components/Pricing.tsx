"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

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

const enterpriseFeatures = [
  "Everything in Pro",
  "Dedicated account manager",
  "Custom AI model training",
  "SSO & advanced security",
  "SLA guarantee",
  "Custom integrations",
];

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");

  const monthlyPrice = 79;
  const yearlyPrice = 758;
  const yearlySavings = monthlyPrice * 12 - yearlyPrice;

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-700">Simple pricing</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-5">
            One plan,{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              all features
            </span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            No feature gating, no surprises. Every recruiter gets the full RecruitAI experience.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span
            className={cn(
              "text-sm font-medium transition-colors",
              billing === "monthly" ? "text-slate-900" : "text-slate-400"
            )}
          >
            Monthly
          </span>
          <button
            onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")}
            className={cn(
              "relative w-14 h-7 rounded-full transition-colors duration-200",
              billing === "yearly" ? "bg-indigo-600" : "bg-slate-200"
            )}
            aria-label="Toggle billing period"
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200",
                billing === "yearly" ? "translate-x-7" : "translate-x-0"
              )}
            />
          </button>
          <span
            className={cn(
              "text-sm font-medium transition-colors flex items-center gap-2",
              billing === "yearly" ? "text-slate-900" : "text-slate-400"
            )}
          >
            Yearly
            <span className="inline-flex items-center bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">
              Save ${yearlySavings}
            </span>
          </span>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* Pro plan */}
          <div className="relative rounded-2xl bg-white border-2 border-indigo-600 shadow-xl shadow-indigo-100 p-8 flex flex-col">
            {/* Popular badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1.5 bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                <Sparkles className="w-3 h-3" />
                Most Popular
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-1">Pro</h3>
              <p className="text-slate-500 text-sm">For growing recruitment teams</p>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-end gap-1">
                <span className="text-2xl font-bold text-slate-500">$</span>
                <span className="text-5xl font-black text-slate-900">
                  {billing === "monthly" ? monthlyPrice : Math.round(yearlyPrice / 12)}
                </span>
                <span className="text-slate-500 text-sm mb-2">/ mo per recruiter</span>
              </div>
              {billing === "yearly" && (
                <p className="text-sm text-emerald-600 font-medium mt-1">
                  Billed ${yearlyPrice}/year · Save ${yearlySavings} vs monthly
                </p>
              )}
              {billing === "monthly" && (
                <p className="text-sm text-slate-400 mt-1">
                  Billed ${monthlyPrice}/month per recruiter
                </p>
              )}
            </div>

            {/* CTA */}
            <Link
              href="/signup"
              className="group w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 active:scale-95 mb-8"
            >
              Start 14-day free trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <p className="text-xs text-slate-400 text-center mb-8">
              No credit card required · Cancel anytime
            </p>

            {/* Features */}
            <div className="space-y-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-indigo-600 stroke-[2.5]" />
                  </div>
                  <span className="text-sm text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise plan */}
          <div className="relative rounded-2xl bg-slate-900 border border-slate-800 p-8 flex flex-col">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-1">Enterprise</h3>
              <p className="text-slate-400 text-sm">For large agencies & corporates</p>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-end gap-1">
                <span className="text-4xl font-black text-white">Custom</span>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Tailored pricing for teams of 10+
              </p>
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-semibold py-3.5 px-6 rounded-xl transition-all mb-8"
            >
              Talk to sales
            </Link>

            <div className="h-px bg-slate-700 mb-8" />

            {/* Features */}
            <div className="space-y-3">
              {enterpriseFeatures.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-emerald-400 stroke-[2.5]" />
                  </div>
                  <span className="text-sm text-slate-300">{feature}</span>
                </div>
              ))}
            </div>

            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-600/20 to-transparent rounded-2xl" />
          </div>
        </div>

        {/* Money back guarantee */}
        <div className="text-center mt-12">
          <p className="text-sm text-slate-500">
            🛡️{" "}
            <span className="font-semibold text-slate-700">30-day money-back guarantee</span>{" "}
            — if RecruitAI doesn&apos;t save you time, we&apos;ll refund you in full.
          </p>
        </div>
      </div>
    </section>
  );
}
