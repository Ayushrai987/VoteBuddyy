"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Candidate } from "@/types";
import Link from "next/link";

type Props = {
  candidate: Candidate;
  partyData?: { short: string; full: string; color: string; seats2024: number };
  opponent?: Candidate;
  partyList: { short: string; full: string; color: string; seats2024: number }[];
};

export default function CandidateDetailClient({ candidate, partyData, opponent, partyList }: Props) {
  const { t, language } = useLanguage();

  return (
    <div className="page-enter mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
        <Link href="/candidates" className="hover:text-saffron-500 transition-colors">{t('nav.candidates')}</Link>
        <span>/</span>
        <span className="text-[var(--text-primary)] font-medium">{candidate.name}</span>
      </nav>

      {/* Profile header */}
      <div className="glass-card overflow-hidden mb-8">
        <div className="h-2" style={{ background: partyData?.color || "#888" }} />
        <div className="p-6 sm:p-8">
          <div className="flex items-start gap-5 flex-wrap">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg" style={{ background: partyData?.color || "#888" }}>
              {candidate.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">{candidate.name}</h1>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className="pill-badge" style={{ background: (partyData?.color || "#888") + "20", borderColor: (partyData?.color || "#888") + "40", color: partyData?.color }}>
                  {candidate.party}
                </span>
                <span className={`pill-badge ${candidate.result === "Won" ? "pill-badge-green" : "pill-badge-accent"}`}>
                  {candidate.result === "Won" ? t('candidates.won') : t('candidates.lost')} - LS {candidate.electionYear}
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mt-2">
                {candidate.constituency}, {candidate.state}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="stat-card">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{t('candidates.votes')}</span>
          <p className="text-xl font-extrabold gradient-text mt-1">{candidate.votes?.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{t('candidates.margin')}</span>
          <p className={`text-xl font-extrabold mt-1 ${(candidate.margin || 0) > 0 ? "text-green-500" : "text-red-500"}`}>
            {candidate.margin ? ((candidate.margin > 0 ? "+" : "") + candidate.margin.toLocaleString()) : "N/A"}
          </p>
        </div>
        <div className="stat-card">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{t('candidates.age')}</span>
          <p className="text-xl font-extrabold text-[var(--text-primary)] mt-1">{candidate.age}</p>
        </div>
        <div className="stat-card">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{t('candidates.criminalCases')}</span>
          <p className={`text-xl font-extrabold mt-1 ${(candidate.criminalCases || 0) > 0 ? "text-red-500" : "text-green-500"}`}>
            {candidate.criminalCases || 0}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-6">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">{t('candidates.personalDetails')}</h2>
          <div className="space-y-3">
            {[
              { label: t('candidates.fullName'), value: candidate.name },
              { label: t('candidates.party'), value: candidate.party },
              { label: t('candidates.constituency'), value: candidate.constituency },
              { label: t('candidates.state'), value: candidate.state },
              { label: t('candidates.gender'), value: candidate.gender },
              { label: t('candidates.age'), value: `${candidate.age} ${language === 'en' ? 'years' : 'वर्ष'}` },
              { label: t('candidates.education'), value: candidate.education || "N/A" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm border-b border-[var(--border-color)] pb-2">
                <span className="text-[var(--text-muted)]">{item.label}</span>
                <span className="font-medium text-[var(--text-primary)]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">{t('candidates.affidavitSummary')}</h2>
          <div className="space-y-3">
            {[
              { label: t('candidates.declaredAssets'), value: candidate.assets || "N/A" },
              { label: t('candidates.declaredLiabilities'), value: candidate.liabilities || "Rs.0" },
              { label: t('candidates.criminalCases'), value: (candidate.criminalCases || 0).toString(), highlight: (candidate.criminalCases || 0) > 0 },
              { label: t('candidates.education'), value: candidate.education || "N/A" },
              { label: t('candidates.electionYear'), value: candidate.electionYear.toString() },
              { label: t('candidates.result'), value: candidate.result === "Won" ? t('candidates.won') : t('candidates.lost') },
              { label: t('candidates.totalVotes'), value: candidate.votes?.toLocaleString() || "N/A" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm border-b border-[var(--border-color)] pb-2">
                <span className="text-[var(--text-muted)]">{item.label}</span>
                <span className={`font-medium ${item.highlight ? "text-red-500" : "text-[var(--text-primary)]"}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Opponent comparison */}
      {opponent && (
        <div className="glass-card p-6 mb-8">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">{t('candidates.vsOpponent')} - {candidate.constituency}</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1 text-right">
              <p className="font-bold text-[var(--text-primary)]">{candidate.name}</p>
              <p className="text-xs text-[var(--text-muted)]">{candidate.partyShort}</p>
              <p className="text-lg font-extrabold mt-1" style={{ color: partyData?.color }}>{candidate.votes?.toLocaleString()}</p>
            </div>
            <div className="text-center px-4">
              <span className="text-2xl font-black text-[var(--text-muted)]">VS</span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-[var(--text-primary)]">{opponent.name}</p>
              <p className="text-xs text-[var(--text-muted)]">{opponent.partyShort}</p>
              <p className="text-lg font-extrabold mt-1" style={{ color: partyList.find((p) => p.short === opponent.partyShort)?.color }}>
                {opponent.votes?.toLocaleString()}
              </p>
            </div>
          </div>
          {/* Visual bar */}
          <div className="mt-4 h-4 rounded-full overflow-hidden flex border border-[var(--border-color)]">
            <div className="h-full transition-all duration-1000" style={{
              width: `${((candidate.votes || 0) / ((candidate.votes || 0) + (opponent.votes || 0))) * 100}%`,
              background: partyData?.color || "#888",
            }} />
            <div className="h-full transition-all duration-1000 flex-1" style={{
              background: partyList.find((p) => p.short === opponent.partyShort)?.color || "#888",
            }} />
          </div>
        </div>
      )}

      <Link href="/candidates" className="btn-ghost inline-flex items-center gap-2">
        {t('candidates.backToAll')}
      </Link>
    </div>
  );
}
