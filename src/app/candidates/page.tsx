"use client";
import { useState } from "react";
import Link from "next/link";
import { sampleCandidates, partyList } from "@/data/candidates";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function CandidatesPage() {
  const { t, language } = useLanguage();
  const [search, setSearch] = useState("");
  const [partyFilter, setPartyFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [resultFilter, setResultFilter] = useState<"" | "Won" | "Lost">("");
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const candidates = sampleCandidates.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.constituency.toLowerCase().includes(search.toLowerCase());
    const matchParty = !partyFilter || c.partyShort === partyFilter;
    const matchState = !stateFilter || c.state === stateFilter;
    const matchResult = !resultFilter || c.result === resultFilter;
    return matchSearch && matchParty && matchState && matchResult;
  });

  const uniqueStates = Array.from(new Set(sampleCandidates.map((c) => c.state)));
  const uniqueParties = Array.from(new Set(sampleCandidates.map((c) => c.partyShort)));
  const compareList = sampleCandidates.filter((c) => compareIds.includes(c.id));

  function toggleCompare(id: string) {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  }

  return (
    <div className="page-enter mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-3">
          {t('candidates.title')}
        </h1>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
          {t('candidates.subtitle')}
        </p>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 sm:p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="lg:col-span-2">
            <input
              type="text"
              placeholder={t('candidates.searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20 transition-all"
            />
          </div>
          <select value={partyFilter} onChange={(e) => setPartyFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-saffron-500 transition-all">
            <option value="">{t('candidates.allParties')}</option>
            {uniqueParties.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-saffron-500 transition-all">
            <option value="">{t('candidates.allStates')}</option>
            {uniqueStates.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={resultFilter} onChange={(e) => setResultFilter(e.target.value as "" | "Won" | "Lost")}
            className="px-3 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-saffron-500 transition-all">
            <option value="">{t('candidates.allResults')}</option>
            <option value="Won">{t('candidates.won')}</option>
            <option value="Lost">{t('candidates.lost')}</option>
          </select>
        </div>
        <div className="flex items-center justify-between mt-3 text-xs text-[var(--text-muted)]">
          <span>{t('candidates.showing')} {candidates.length} {t('candidates.of')} {sampleCandidates.length} {t('candidates.candidates')}</span>
          {compareIds.length > 0 && (
            <button onClick={() => setCompareIds([])} className="text-saffron-500 hover:underline">
              {t('candidates.clearCompare')} ({compareIds.length}/3)
            </button>
          )}
        </div>
      </div>

      {/* Compare panel */}
      {compareList.length >= 2 && (
        <div className="glass-card p-6 mb-8 animate-fade-up">
          <h2 className="text-lg font-extrabold text-[var(--text-primary)] mb-4">{t('candidates.compareTitle')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border-color)]">
                  <th className="text-left py-2 px-3 text-xs text-[var(--text-muted)] uppercase">{t('candidates.metric')}</th>
                  {compareList.map((c) => (
                    <th key={c.id} className="text-left py-2 px-3 text-xs font-bold text-[var(--text-primary)]">{c.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: t('candidates.party'), get: (c: any) => c.partyShort },
                  { label: t('candidates.constituency'), get: (c: any) => c.constituency },
                  { label: t('candidates.state'), get: (c: any) => c.state },
                  { label: t('candidates.age'), get: (c: any) => c.age.toString() },
                  { label: t('candidates.education'), get: (c: any) => c.education || "N/A" },
                  { label: t('candidates.criminalCases'), get: (c: any) => c.criminalCases?.toString() || "0" },
                  { label: t('candidates.assets'), get: (c: any) => c.assets || "N/A" },
                  { label: t('candidates.votes'), get: (c: any) => c.votes?.toLocaleString() || "N/A" },
                  { label: t('candidates.margin'), get: (c: any) => c.margin ? (c.margin > 0 ? "+" : "") + c.margin.toLocaleString() : "N/A" },
                  { label: t('candidates.result'), get: (c: any) => c.result === "Won" ? t('candidates.won') : t('candidates.lost') },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-glass)]">
                    <td className="py-2 px-3 text-xs font-semibold text-[var(--text-muted)]">{row.label}</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-2 px-3 text-sm text-[var(--text-secondary)]">{row.get(c)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Candidate cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {candidates.map((c) => {
          const partyData = partyList.find((p) => p.short === c.partyShort);
          const isComparing = compareIds.includes(c.id);
          return (
            <div key={c.id} className={`glass-card overflow-hidden transition-all ${isComparing ? "ring-2 ring-saffron-500" : ""}`}>
              {/* Party color bar */}
              <div className="h-1.5" style={{ background: partyData?.color || "#888" }} />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white" style={{ background: partyData?.color || "#888" }}>
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <Link href={`/candidates/${c.id}`} className="text-base font-bold text-[var(--text-primary)] hover:text-saffron-500 transition-colors">
                        {c.name}
                      </Link>
                      <p className="text-xs text-[var(--text-muted)]">{c.partyShort} - {c.constituency}</p>
                    </div>
                  </div>
                  <span className={`pill-badge text-[0.6rem] ${c.result === "Won" ? "pill-badge-green" : "pill-badge-accent"}`}>
                    {c.result === "Won" ? t('candidates.won') : t('candidates.lost')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="p-2 rounded-lg bg-[var(--bg-glass)] border border-[var(--border-color)]">
                    <span className="text-[var(--text-muted)]">{t('candidates.votes')}</span>
                    <p className="font-bold text-[var(--text-primary)]">{c.votes?.toLocaleString()}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-[var(--bg-glass)] border border-[var(--border-color)]">
                    <span className="text-[var(--text-muted)]">{t('candidates.margin')}</span>
                    <p className={`font-bold ${(c.margin || 0) > 0 ? "text-green-500" : "text-red-500"}`}>
                      {c.margin ? ((c.margin > 0 ? "+" : "") + c.margin.toLocaleString()) : "N/A"}
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-[var(--bg-glass)] border border-[var(--border-color)]">
                    <span className="text-[var(--text-muted)]">{t('candidates.criminalCases')}</span>
                    <p className={`font-bold ${(c.criminalCases || 0) > 0 ? "text-red-500" : "text-green-500"}`}>
                      {c.criminalCases || 0}
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-[var(--bg-glass)] border border-[var(--border-color)]">
                    <span className="text-[var(--text-muted)]">{t('candidates.assets')}</span>
                    <p className="font-bold text-[var(--text-primary)]">{c.assets}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]">
                  <span className="text-xs text-[var(--text-muted)]">{c.state} - {c.electionYear}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleCompare(c.id)}
                      className={`text-xs px-3 py-1 rounded-lg border transition-all ${
                        isComparing
                          ? "border-saffron-500 bg-saffron-500/10 text-saffron-500"
                          : "border-[var(--border-color)] text-[var(--text-muted)] hover:border-saffron-500/30"
                      }`}
                    >
                      {isComparing ? t('candidates.compare') : t('candidates.compare')}
                    </button>
                    <Link href={`/candidates/${c.id}`} className="text-xs text-saffron-500 font-semibold hover:underline px-2 py-1">
                      {t('candidates.view')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {candidates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[var(--text-secondary)]">{t('candidates.noResults')}</p>
        </div>
      )}
    </div>
  );
}
