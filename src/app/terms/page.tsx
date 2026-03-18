import Link from "next/link";
import { Zap } from "lucide-react";

export const metadata = {
  title: "Terms of Service — RecruitAI",
  description: "Read the RecruitAI terms of service.",
};

export default function TermsPage() {
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
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-slate-500 mb-10">Last updated: March 2026</p>

        <div className="bg-white rounded-2xl border border-slate-100 p-8 space-y-8 text-sm text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using RecruitAI (&ldquo;the Service&rdquo;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">2. Description of Service</h2>
            <p>RecruitAI provides an AI-powered recruitment platform that helps organisations screen, score, and manage job candidates. The Service includes job posting tools, candidate pipeline management, AI CV scoring, and a public candidate portal.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">3. User Accounts</h2>
            <p>You must create an account to access most features. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must provide accurate, current, and complete information during registration.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">4. Acceptable Use</h2>
            <p>You agree not to use the Service to discriminate unlawfully against candidates, post misleading job listings, collect personal data beyond what is necessary for recruitment, or violate any applicable employment or data protection laws.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">5. Data and Privacy</h2>
            <p>Our use of personal data is governed by our <Link href="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</Link>. You are responsible for ensuring you have a lawful basis for processing candidate data through the Service and for complying with applicable data protection regulations including GDPR.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">6. Subscription and Payments</h2>
            <p>Paid plans are billed in advance. Subscription fees are non-refundable except as required by law. We reserve the right to modify pricing with reasonable notice. Your subscription will automatically renew unless cancelled before the renewal date.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">7. AI Scoring Disclaimer</h2>
            <p>AI candidate scores are provided as a decision-support tool only. They are not employment decisions. You remain solely responsible for all hiring decisions. AI scoring should be used as one input alongside human judgement, not as a sole determinant.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">8. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, RecruitAI shall not be liable for indirect, incidental, special, or consequential damages arising from your use of the Service. Our total liability shall not exceed the fees paid by you in the 12 months preceding the claim.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">9. Termination</h2>
            <p>Either party may terminate the agreement at any time. Upon termination, your access to the Service will cease and we may delete your data in accordance with our data retention policy.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">10. Contact</h2>
            <p>Questions about these terms? <Link href="/contact" className="text-indigo-600 hover:underline">Contact us</Link>.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
