import Link from "next/link";
import { Zap, Mail, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Contact Us — RecruitAI",
  description: "Get in touch with the RecruitAI team.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-base font-bold text-slate-900">Recruit<span className="text-indigo-600">AI</span></span>
          </Link>
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-900">← Back to home</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Contact Us</h1>
        <p className="text-slate-500 mb-10">We&apos;d love to hear from you. Reach out for support, sales, or general enquiries.</p>

        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
              <Mail className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="font-bold text-slate-900 mb-1">Support</h2>
            <p className="text-sm text-slate-500 mb-3">Technical help, billing questions, or account issues.</p>
            <a href="mailto:support@recruitai.app" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              support@recruitai.app
            </a>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
              <MessageSquare className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="font-bold text-slate-900 mb-1">Sales</h2>
            <p className="text-sm text-slate-500 mb-3">Enterprise plans, custom integrations, or volume pricing.</p>
            <a href="mailto:sales@recruitai.app" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              sales@recruitai.app
            </a>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">Already a customer?</h2>
          <p className="text-white/70 text-sm mb-6">Sign in to your dashboard and use the in-app support chat.</p>
          <Link href="/login"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold text-sm px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors">
            Go to dashboard →
          </Link>
        </div>
      </main>
    </div>
  );
}
