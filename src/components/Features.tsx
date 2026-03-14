import {
  Brain,
  EyeOff,
  GitMerge,
  CalendarCheck,
  UserCircle,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI CV Scoring",
    description:
      "Our AI reads and scores every CV against your job criteria in seconds — cutting shortlisting time by 85%.",
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    icon: EyeOff,
    title: "Hidden Criteria",
    description:
      "Define confidential scoring factors your candidates can't game. Culture fit, growth potential, salary expectations — all private.",
    gradient: "from-indigo-500 to-blue-600",
    bg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    icon: GitMerge,
    title: "Pipeline Management",
    description:
      "A beautiful Kanban board that keeps your entire recruitment process visible and moving. No more spreadsheets.",
    gradient: "from-blue-500 to-cyan-600",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: CalendarCheck,
    title: "Interview Scheduling",
    description:
      "Automated scheduling that syncs with your calendar, sends reminders, and eliminates back-and-forth emails.",
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: UserCircle,
    title: "Candidate Portal",
    description:
      "Give candidates a branded portal to track their application status, submit documents, and schedule interviews.",
    gradient: "from-orange-500 to-amber-600",
    bg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    icon: BarChart3,
    title: "Hiring Analytics",
    description:
      "Deep insights into your pipeline health, time-to-hire, source quality, and diversity metrics — all in real time.",
    gradient: "from-pink-500 to-rose-600",
    bg: "bg-pink-50",
    iconColor: "text-pink-600",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 mb-5">
            <span className="text-sm font-semibold text-indigo-700">Everything you need</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-5">
            Recruitment software that{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              actually works
            </span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            Every feature is purpose-built for modern recruitment agencies and
            in-house teams who refuse to settle for mediocre hires.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-8 rounded-2xl bg-white border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 cursor-default"
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {feature.description}
                </p>

                {/* Hover gradient line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${feature.gradient} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
