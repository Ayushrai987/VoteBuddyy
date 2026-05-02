"use client";
import { useState } from "react";
import { eciRules, boothRules } from "@/data/eci-rules";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

const categories = Object.values(eciRules);

export default function ECIRulesPage() {
  const { t, language } = useLanguage();
  const [search, setSearch] = useState("");
  const [activeRule, setActiveRule] = useState<string | null>(null);

  const filtered = categories.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.summary.toLowerCase().includes(search.toLowerCase()) ||
      r.points.some((p) => p.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="page-enter mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-3">
          {t('rules.libraryTitle')}
        </h1>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
          {t('rules.librarySubtitle')}
        </p>
      </div>

      {/* Search */}
      <div className="max-w-lg mx-auto mb-10">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder={t('rules.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20 transition-all"
          />
        </div>
      </div>

      {/* Rule cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
        {filtered.map((rule) => {
          const isOpen = activeRule === rule.id;
          return (
            <div key={rule.id} className="glass-card overflow-hidden transition-all">
              <button
                onClick={() => setActiveRule(isOpen ? null : rule.id)}
                className="w-full p-6 text-left flex items-start gap-4 hover:bg-[var(--bg-glass)] transition-all"
              >
                <span className="text-2xl flex-shrink-0 mt-0.5">{rule.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-[var(--text-primary)]">
                      {rule.title}
                    </h3>
                    <svg
                      className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${isOpen ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] font-hindi mt-0.5">{rule.titleHi}</p>
                  <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">{rule.summary}</p>
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 animate-fade-up">
                  {/* Plain English */}
                  <div className="info-card mb-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-saffron-500 mb-2">
                      {t('rules.whatThisMeans')}
                    </h4>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {rule.plainEnglish}
                    </p>
                  </div>

                  {/* Points */}
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                    {t('rules.keyPoints')}
                  </h4>
                  <ul className="space-y-2 mb-4">
                    {rule.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Extras */}
                  {rule.extras && (
                    <div className="p-3 rounded-lg bg-[var(--bg-glass)] border border-[var(--border-color)]">
                      {Object.entries(rule.extras).map(([k, v]) => (
                        <p key={k} className="text-sm text-[var(--text-secondary)]">
                          <strong className="text-[var(--text-primary)]">{k}:</strong> {v}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[var(--border-color)]">
                    <a
                      href="https://eci.gov.in/mcc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[var(--text-muted)] hover:text-saffron-500 transition-colors flex items-center gap-1"
                    >
                      {t('rules.readFullNotification')}
                    </a>
                    <Link
                      href={`/ai-assistant?context=${encodeURIComponent(rule.title)}`}
                      className="text-xs text-saffron-500 font-semibold hover:underline flex items-center gap-1"
                    >
                      {t('rules.askVoteBuddy')}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Booth Rules Section */}
      <div className="glass-card p-6 sm:p-8 mb-8">
        <h2 className="text-xl font-extrabold text-[var(--text-primary)] mb-6">
          {t('rules.pollingBoothRules')}
        </h2>

        <div className="info-card mb-6">
          <p className="text-sm text-[var(--text-secondary)]">
            <strong>{t('rules.voterLimit')}:</strong> {boothRules.voterLimit}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Facilities */}
          <div>
            <h3 className="section-heading mb-3">{t('rules.mandatoryFacilities')}</h3>
            <ul className="space-y-2">
              {boothRules.mandatoryFacilities.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="section-heading mb-3">{t('rules.locationCriteria')}</h3>
            <ul className="space-y-2">
              {boothRules.locationCriteria.map((l, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Officials */}
        <div className="mt-8">
          <h3 className="section-heading mb-4">{t('rules.keyOfficials')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.values(boothRules.officials).map((official) => (
              <div key={official.title} className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-glass)]">
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">{official.title}</h4>
                </div>
                <ul className="space-y-1.5">
                  {official.duties.map((d, i) => (
                    <li key={i} className="text-xs text-[var(--text-secondary)] flex items-start gap-1.5">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[var(--text-secondary)]">{t('rules.noResults')}</p>
        </div>
      )}
    </div>
  );
}
