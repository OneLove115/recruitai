import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "RecruitAI completely transformed our hiring process. We used to spend 3 weeks shortlisting for a senior role — now it takes 4 hours. The AI scoring is scarily accurate.",
    author: "Alexandra Morrison",
    title: "Managing Director",
    company: "TalentBridge Global",
    avatar: "AM",
    avatarBg: "bg-violet-500",
    rating: 5,
    metric: "85% reduction in shortlisting time",
  },
  {
    quote:
      "The hidden criteria feature is a game-changer. I can score candidates on cultural fit and growth mindset without them gaming the system. Our offer acceptance rate went from 62% to 91%.",
    author: "James Whitfield",
    title: "Head of Talent Acquisition",
    company: "Nexus Talent Partners",
    avatar: "JW",
    avatarBg: "bg-indigo-500",
    rating: 5,
    metric: "91% offer acceptance rate",
  },
  {
    quote:
      "I was sceptical about AI recruitment tools, but RecruitAI proved me wrong. The candidate portal alone saves us 6 hours a week in email back-and-forth. Absolutely worth every penny.",
    author: "Priya Chandrasekhar",
    title: "VP People & Culture",
    company: "Elevate Search Group",
    avatar: "PC",
    avatarBg: "bg-pink-500",
    rating: 5,
    metric: "6hrs saved per week",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-5">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span className="text-sm font-semibold text-amber-700">Customer stories</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-5">
            Loved by{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              recruitment leaders
            </span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            Don&apos;t take our word for it — hear from recruiters who&apos;ve made the switch.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              className="relative p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-indigo-200 mb-5" />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-700 leading-relaxed mb-6 text-sm">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Metric highlight */}
              <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-2 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span className="text-xs font-bold text-indigo-700">{t.metric}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                <div
                  className={`w-10 h-10 rounded-full ${t.avatarBg} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{t.author}</p>
                  <p className="text-xs text-slate-500">
                    {t.title} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
