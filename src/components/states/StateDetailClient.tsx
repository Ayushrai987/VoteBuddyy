"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { State } from "@/types";
import Link from "next/link";
import { allElections, getElectionStatus } from "@/data/elections";

type Props = {
  state: State;
  up: {
    totalLS: number;
    totalVS: number;
    totalBooths: string;
    totalVoters: string;
    divisions: Record<string, string[]>;
    phaseBreakdown: { phase: number; date: string; seats: number; districts: string }[];
  } | null;
};

export default function StateDetailClient({ state, up }: Props) {
  const { t, language } = useLanguage();
  const isUP = state.slug === "uttar-pradesh";

  const getStatusDisplay = () => {
    const election = allElections.find(e => e.name.includes(state.name));
    if (election && election.electionDate) {
      const display = getElectionStatus(election.electionDate);
      return { ...display, isAnnounced: election.isAnnounced };
    }
    
    // Fallback to static status
    switch (state.electionStatus) {
      case "upcoming": return { label: t('states.upcoming'), color: "orange", isAnnounced: true };
      case "live": return { label: "Live", color: "orange", pulse: true, isAnnounced: true };
      case "concluded": return { label: t('states.concluded'), color: "gray", isAnnounced: true };
      default: return { label: state.type, color: "gray", isAnnounced: true };
    }
  };

  const status = getStatusDisplay();

  const infoGrid = [
    { label: t('states.capital'), value: state.capital, icon: "" },
    { label: t('states.type'), value: state.type === "State" ? (language === 'en' ? "State" : "राज्य") : (language === 'en' ? "Union Territory" : "केंद्र शासित प्रदेश"), icon: "" },
    { label: t('states.lsSeats'), value: state.loksabha.toString(), icon: "" },
    { label: t('states.vsSeats'), value: state.vidhansabha ? state.vidhansabha.toString() : "N/A", icon: "" },
    { label: t('states.districts'), value: state.districts.toString(), icon: "" },
    { label: t('states.registeredVoters'), value: state.approxVoters, icon: "" },
    { label: t('states.phases'), value: state.phases.toString(), icon: "" },
    { label: t('states.lastElection'), value: state.lastElection, icon: "" },
    { label: t('states.lastWinner'), value: state.lastWinner, icon: "" },
    { label: t('states.cm'), value: state.cm, icon: "" },
    ...(state.governor ? [{ label: t('states.governor'), value: state.governor, icon: "" }] : []),
  ];

  return (
    <div className="page-enter mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
        <Link href="/states" className="hover:text-saffron-500 transition-colors">{t('nav.states')}</Link>
        <span>/</span>
        <span className="text-[var(--text-primary)] font-medium">{state.name}</span>
      </nav>

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
            {state.name}
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            {state.type === "State" ? (language === 'en' ? "State" : "राज्य") : (language === 'en' ? "Union Territory" : "केंद्र शासित प्रदेश")} - {t('states.capital')}: {state.capital}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex gap-2">
            <span className={`pill-badge flex items-center gap-1 ${
              status.color === "orange" ? "pill-badge-accent" : "pill-badge-green"
            }`}>
              {status.pulse && <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />}
              {status.label}
            </span>
            <span className="pill-badge">{state.type}</span>
          </div>
          {!status.isAnnounced && (
            <span className="text-[0.6rem] text-orange-500 font-bold uppercase tracking-wider">
              {language === 'en' ? 'Schedule Not Announced' : 'कार्यक्रम घोषित नहीं'}
            </span>
          )}
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {infoGrid.map((item) => (
          <div key={item.label} className="glass-card p-4 hover:border-saffron-500/30 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[0.65rem] text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                {item.label}
              </span>
            </div>
            <p className="text-base font-bold text-[var(--text-primary)]">{item.value}</p>
          </div>
        ))}
      </div>

      {/* UP Deep Dive */}
      {isUP && up && (
        <>
          {/* UP Stats */}
          <div className="glass-card p-6 sm:p-8 mb-8">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
              <h2 className="text-xl font-extrabold gradient-text">
                {state.name} - {t('states.deepDive')}
              </h2>
              <span className="pill-badge pill-badge-accent">
                {language === 'en' ? 'Largest State by LS Seats' : 'लोकसभा सीटों के हिसाब से सबसे बड़ा राज्य'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="stat-card">
                <span className="text-xs text-[var(--text-muted)]">{t('states.lsSeats')}</span>
                <p className="text-2xl font-extrabold gradient-text">{up.totalLS}</p>
              </div>
              <div className="stat-card">
                <span className="text-xs text-[var(--text-muted)]">{t('states.vsSeats')}</span>
                <p className="text-2xl font-extrabold gradient-text">{up.totalVS}</p>
              </div>
              <div className="stat-card">
                <span className="text-xs text-[var(--text-muted)]">{language === 'en' ? 'Total Booths' : 'कुल बूथ'}</span>
                <p className="text-lg font-extrabold gradient-text">{up.totalBooths}</p>
              </div>
              <div className="stat-card">
                <span className="text-xs text-[var(--text-muted)]">{t('states.registeredVoters')}</span>
                <p className="text-lg font-extrabold gradient-text">{up.totalVoters}</p>
              </div>
            </div>

            {/* Divisions */}
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-4">
              {up.totalLS} {t('states.divisions')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {Object.entries(up.divisions).map(([division, seats]) => (
                <div key={division} className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-glass)] hover:border-saffron-500/30 transition-all">
                  <h4 className="text-sm font-bold text-saffron-500 mb-2">{division}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {seats.map((seat) => (
                      <span key={seat} className="px-2 py-1 text-xs rounded-md bg-[var(--bg-input)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                        {seat}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Phase Breakdown */}
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-4">
              {t('states.phases')} {t('states.phaseBreakdown')}
            </h3>
            <div className="space-y-3">
              {up.phaseBreakdown.map((phase) => (
                <div key={phase.phase} className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-glass)] hover:border-saffron-500/30 transition-all">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-saffron-500/20 to-saffron-400/10 border border-saffron-500/20 flex items-center justify-center text-sm font-bold text-saffron-500">
                        {phase.phase}
                      </span>
                      <span className="text-sm font-bold text-[var(--text-primary)]">{language === 'en' ? 'Phase' : 'चरण'} {phase.phase}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[var(--text-muted)]">{phase.date}</span>
                      <span className="pill-badge text-[0.6rem]">{phase.seats} {language === 'en' ? 'seats' : 'सीटें'}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{phase.districts}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Non-UP states: basic info */}
      {!isUP && (
        <div className="glass-card p-6 sm:p-8">
          <h2 className="text-xl font-extrabold text-[var(--text-primary)] mb-4">
            {t('states.summary')}
          </h2>
          <div className="info-card mb-4">
            <p className="text-sm text-[var(--text-secondary)]">
              <strong>{state.name}</strong> {language === 'en' ? 'has' : 'के पास'} <strong>{state.loksabha}</strong> {t('states.lsSeats')}
              {state.vidhansabha ? (language === 'en' ? ` and ${state.vidhansabha} Vidhan Sabha seats` : ` और ${state.vidhansabha} विधानसभा सीटें`) : ""}.
              {language === 'en' ? 'With approximately' : 'लगभग'} <strong>{state.approxVoters}</strong> {t('states.registeredVoters')} {language === 'en' ? 'across' : 'जो'} <strong>{state.districts}</strong> {t('states.districts')} {language === 'en' ? 'districts, the last election in' : 'में फैले हुए हैं,'} {state.lastElection} {language === 'en' ? 'was won by' : 'में हुए पिछले चुनाव में'} <strong>{state.lastWinner}</strong> {language === 'hi' ? 'की जीत हुई थी।' : 'won.'}
            </p>
          </div>
          <div className="info-card">
            <p className="text-sm text-[var(--text-secondary)]">
              {state.cm !== "Lt. Governor" && state.cm !== "Administrator"
                ? (language === 'en' ? `The current Chief Minister is ${state.cm}.` : `वर्तमान मुख्यमंत्री ${state.cm} हैं।`)
                : (language === 'en' ? `${state.name} is administered by ${state.cm}.` : `${state.name} का प्रशासन ${state.cm} द्वारा किया जाता है।`)}
              {state.governor && (language === 'en' ? ` The Governor is ${state.governor}.` : ` राज्यपाल ${state.governor} हैं।`)}
            </p>
          </div>
        </div>
      )}

      {/* Back */}
      <div className="mt-8">
        <Link href="/states" className="btn-ghost inline-flex items-center gap-2">
          {t('states.backToAll')}
        </Link>
      </div>
    </div>
  );
}
