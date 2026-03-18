import Link from "next/link";
import { Zap } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — RecruitAI",
  description: "Read the RecruitAI privacy policy.",
};

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-10">Last updated: March 2026</p>

        <div className="bg-white rounded-2xl border border-slate-100 p-8 space-y-8 text-sm text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly (account registration details, job postings, candidate data), information generated through use of the Service (usage logs, session data), and information from third-party integrations you authorise.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">2. How We Use Your Information</h2>
            <p>We use your information to provide and improve the Service, process payments, send service-related communications, provide customer support, and comply with legal obligations. We do not sell your personal data to third parties.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">3. Candidate Data</h2>
            <p>When candidates apply through the RecruitAI portal, their data is stored on behalf of the hiring organisation. Candidates may request access to, correction of, or deletion of their personal data by contacting the hiring organisation or us directly.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">4. AI Processing</h2>
            <p>Candidate CVs and job requirements may be processed by AI models to generate suitability scores. This processing is automated. Candidates can request human review of any automated decision. AI scores are stored and can be deleted upon request.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">5. Data Storage and Security</h2>
            <p>Data is stored using Supabase (PostgreSQL) with encryption at rest. We implement industry-standard security measures including TLS encryption in transit, access controls, and regular security audits.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">6. Data Retention</h2>
            <p>We retain account data for the duration of your subscription plus 90 days. Candidate data is retained as long as the associated job posting is active or until you delete it. You can request deletion of your data at any time.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">7. Your Rights (GDPR)</h2>
            <p>If you are in the EEA, you have rights to: access your personal data, correct inaccurate data, request erasure, restrict processing, data portability, and object to processing. Contact us to exercise these rights.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">8. Cookies</h2>
            <p>We use essential cookies for authentication and session management. We do not use tracking or advertising cookies. You can disable cookies in your browser but this may affect functionality.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">9. Third-Party Services</h2>
            <p>We use Stripe for payment processing, Supabase for database hosting, and Anthropic for AI CV scoring. Each provider operates under their own privacy policy.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">10. Contact</h2>
            <p>For privacy enquiries, please <Link href="/contact" className="text-indigo-600 hover:underline">contact us</Link>.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
