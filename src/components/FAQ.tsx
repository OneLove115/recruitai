"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How does AI CV scoring work?",
    answer:
      "Our AI reads every CV in seconds, extracting skills, experience, education, and achievements. It then scores each candidate against your defined criteria — both public and hidden. Hidden criteria are confidential scoring factors that candidates can't see, like culture fit indicators, growth potential, or salary expectations. This prevents candidates from gaming the system while giving you deeper insights.",
  },
  {
    question: "What are hidden criteria?",
    answer:
      "Hidden criteria are private scoring factors you define that candidates cannot see on their end. Examples include: willingness to relocate, salary alignment with your range, cultural fit indicators, leadership potential, or communication style. This lets you score candidates on what actually matters without them tailoring applications to game your system.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! Every new account gets a 14-day free trial with full access to all features. No credit card required to start. You can post unlimited jobs, use AI scoring, and manage your entire pipeline during the trial period.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Absolutely. RecruitAI is a monthly or annual subscription with no long-term contracts. You can cancel from your dashboard at any time — your access continues until the end of your billing period. We also offer a 30-day money-back guarantee if you're not satisfied.",
  },
  {
    question: "How do you protect candidate data?",
    answer:
      "Security is our top priority. All data is encrypted at rest and in transit using AES-256 and TLS 1.3. We're GDPR and SOC 2 Type II compliant. Candidate data is stored in secure data centers with strict access controls, and you maintain full ownership of your data. We never sell or share candidate information with third parties.",
  },
  {
    question: "What integrations do you support?",
    answer:
      "RecruitAI integrates with all major tools: Gmail and Outlook for email sync, Google Calendar and Microsoft Calendar for scheduling, Slack for team notifications, and ATS platforms like Greenhouse and Lever via our API. We also have a robust API for custom integrations.",
  },
  {
    question: "Do you offer enterprise plans?",
    answer:
      "Yes! Enterprise plans include dedicated account management, custom AI model training on your historical hiring data, SSO/SAML authentication, advanced security controls, SLA guarantees, and custom integrations. Contact our sales team for a tailored quote.",
  },
  {
    question: "How long does onboarding take?",
    answer:
      "Most teams are up and running within 30 minutes. The platform is intuitive and requires no technical knowledge. We offer live onboarding sessions, video tutorials, and a comprehensive help center. For enterprise customers, we provide white-glove onboarding with your dedicated account manager.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 mb-5">
            <span className="text-sm font-semibold text-indigo-700">Got questions?</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-5">
            Frequently asked{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              questions
            </span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            Everything you need to know about RecruitAI before getting started.
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={cn(
                  "rounded-xl border transition-all duration-200 overflow-hidden",
                  isOpen
                    ? "bg-white border-indigo-100 shadow-lg shadow-indigo-50"
                    : "bg-white/50 border-slate-100 hover:border-slate-200"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span
                    className={cn(
                      "font-semibold transition-colors",
                      isOpen ? "text-indigo-600" : "text-slate-900"
                    )}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center transition-all flex-shrink-0 ml-4",
                      isOpen ? "bg-indigo-50 rotate-180" : "bg-slate-50"
                    )}
                  >
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-colors",
                        isOpen ? "text-indigo-600" : "text-slate-400"
                      )}
                    />
                  </div>
                </button>
                <div
                  className={cn(
                    "transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-slate-600 leading-relaxed text-sm">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 mb-3">Still have questions?</p>
          <a
            href="mailto:support@recruitai.io"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Contact our support team
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}