import { Briefcase, Cpu, Trophy } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Briefcase,
    title: "Create Your Job",
    description:
      "Describe the role, set your hidden scoring criteria, and define what your ideal candidate looks like — in minutes.",
    detail: "AI crafts your job description",
    bg: "bg-indigo-600",
    light: "bg-indigo-50",
    textColor: "text-indigo-600",
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI Screens CVs",
    description:
      "Our AI instantly reads every application, scores candidates against your criteria, and ranks them by fit — automatically.",
    detail: "Processes 100s of CVs in seconds",
    bg: "bg-purple-600",
    light: "bg-purple-50",
    textColor: "text-purple-600",
  },
  {
    number: "03",
    icon: Trophy,
    title: "Hire the Best Match",
    description:
      "Review your ranked shortlist, schedule interviews with one click, and make confident hiring decisions backed by data.",
    detail: "Average 4.2hr time to shortlist",
    bg: "bg-emerald-600",
    light: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 mb-5 shadow-sm">
            <span className="text-sm font-semibold text-slate-700">Simple process</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-5">
            From job post to hired{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              in days, not weeks
            </span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            Three simple steps to transform your hiring process from chaos to clarity.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-emerald-200 z-0" />

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative">
                  {/* Step card */}
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
                    {/* Number & Icon */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-5xl font-black text-slate-100 leading-none">
                        {step.number}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed mb-5">
                      {step.description}
                    </p>

                    {/* Detail pill */}
                    <div className={`inline-flex items-center gap-2 ${step.light} rounded-full px-3 py-1.5`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${step.bg}`} />
                      <span className={`text-xs font-semibold ${step.textColor}`}>
                        {step.detail}
                      </span>
                    </div>
                  </div>

                  {/* Arrow (between steps, mobile) */}
                  {i < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <div className="w-0.5 h-8 bg-slate-200" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
