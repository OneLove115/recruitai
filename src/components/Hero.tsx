"use client";

import Link from "next/link";
import { ArrowRight, Play, Star, CheckCircle2, TrendingUp, Users, Zap } from "lucide-react";

const stats = [
  { value: "10x", label: "Faster hiring" },
  { value: "94%", label: "Match accuracy" },
  { value: "2,400+", label: "Recruiters" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-70" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 mb-8">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
              </span>
              <span className="text-sm font-medium text-indigo-700">
                AI-Powered Recruitment · Now in v2.0
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-[1.08] tracking-tight mb-6">
              Hire the{" "}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  best talent
                </span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-indigo-100 -z-10 rounded-sm" />
              </span>{" "}
              10x faster
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-slate-500 leading-relaxed mb-10 max-w-lg">
              RecruitAI scores CVs against hidden criteria, manages your entire
              pipeline, and surfaces candidates you&apos;d otherwise miss —
              all in one stunning platform.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-14">
              <Link
                href="/signup"
                className="group inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 active:scale-95"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="group inline-flex items-center gap-3 text-slate-700 font-semibold text-base hover:text-indigo-600 transition-colors">
                <span className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md shadow-slate-200 group-hover:shadow-indigo-100 transition-shadow border border-slate-100">
                  <Play className="w-4 h-4 fill-indigo-600 text-indigo-600 ml-0.5" />
                </span>
                Watch Demo
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6">
              <div className="flex -space-x-2">
                {[
                  "bg-indigo-400",
                  "bg-purple-400",
                  "bg-pink-400",
                  "bg-blue-400",
                  "bg-teal-400",
                ].map((color, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${color} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-500">
                  <span className="font-semibold text-slate-700">4.9/5</span>{" "}
                  from 800+ reviews
                </p>
              </div>
            </div>
          </div>

          {/* Right column — Dashboard preview */}
          <div className="relative">
            {/* Floating badges */}
            <div className="absolute -left-8 top-16 z-10 animate-float">
              <div className="bg-white rounded-xl shadow-lg shadow-slate-200 px-4 py-3 flex items-center gap-3 border border-slate-100">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">This week</p>
                  <p className="text-sm font-bold text-slate-900">+24 hires</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 bottom-24 z-10 animate-float" style={{ animationDelay: "1s" }}>
              <div className="bg-white rounded-xl shadow-lg shadow-slate-200 px-4 py-3 flex items-center gap-3 border border-slate-100">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">AI Match Score</p>
                  <p className="text-sm font-bold text-slate-900">94% accurate</p>
                </div>
              </div>
            </div>

            {/* Main dashboard card */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-300 border border-slate-200">
              {/* Browser chrome */}
              <div className="bg-slate-100 px-4 py-3 flex items-center gap-2 border-b border-slate-200">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 mx-4 bg-white rounded-md px-3 py-1 text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-slate-200 inline-block" />
                  app.recruitai.io/dashboard
                </div>
              </div>

              {/* Dashboard content */}
              <div className="bg-white p-6">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-semibold text-slate-900">Senior Frontend Engineer</h3>
                    <p className="text-sm text-slate-500">127 applicants · Updated 2h ago</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100">
                    Active
                  </span>
                </div>

                {/* Candidate list */}
                <div className="space-y-3">
                  {[
                    { name: "Sarah Chen", score: 97, role: "Ex-Google · 8yr exp", color: "bg-violet-100 text-violet-700" },
                    { name: "Marcus Reid", score: 91, role: "Ex-Meta · 6yr exp", color: "bg-blue-100 text-blue-700" },
                    { name: "Priya Sharma", score: 89, role: "Ex-Stripe · 5yr exp", color: "bg-pink-100 text-pink-700" },
                    { name: "James Liu", score: 83, role: "Ex-Airbnb · 4yr exp", color: "bg-amber-100 text-amber-700" },
                  ].map((candidate, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 transition-colors cursor-pointer group"
                    >
                      <div className={`w-9 h-9 rounded-lg ${candidate.color} flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                        {candidate.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900">{candidate.name}</p>
                        <p className="text-xs text-slate-500">{candidate.role}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-bold text-slate-900">{candidate.score}</span>
                          <span className="text-xs text-slate-400">/100</span>
                        </div>
                        <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                            style={{ width: `${candidate.score}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom stats */}
                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-4">
                  {[
                    { icon: Users, value: "127", label: "Applicants" },
                    { icon: CheckCircle2, value: "18", label: "Shortlisted" },
                    { icon: Zap, value: "4.2h", label: "Avg. response" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <p className="text-lg font-bold text-slate-900">{stat.value}</p>
                      <p className="text-xs text-slate-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-20 pt-10 border-t border-slate-100 grid grid-cols-3 gap-8 max-w-lg">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
