import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RecruitAI — Career Portal",
  description: "Browse open positions and apply today",
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Portal header */}
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
              </svg>
            </div>
            <span className="text-base font-bold text-slate-900">Recruit<span className="text-indigo-600">AI</span></span>
          </a>
          <a href="/portal/jobs" className="text-sm text-slate-600 hover:text-slate-900 font-medium">
            View All Jobs
          </a>
        </div>
      </header>
      {children}
    </div>
  );
}
