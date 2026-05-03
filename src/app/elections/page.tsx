// ============================================================
// VoteBuddy - Elections Page
// ============================================================
"use client";
import { useState } from "react";
import { lokSabha2024, upcomingElections2026 } from "@/data/elections";
import { electionProcess } from "@/data/eci-rules";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ElectionCard } from "@/components/elections/ElectionCard";
import { getElectionStatus } from "@/lib/utils";

function PhaseStepper({ phases }: { phases: typeof lokSabha2024.phases }) {
  const [activePhase, setActivePhase] = useState(0);
  const { t, language } = useLanguage();

  return (
    <div>
      {/* Phase dots */}
      <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
        {phases.map((p, i) => (
          <button
            key={i}
            onClick={() => setActivePhase(i)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activePhase === i
                ? "bg-gradient-to-r from-saffron-500 to-saffron-400 text-white shadow-lg shadow-saffron-500/25"
                : "bg-[var(--bg-glass)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-saffron-500/30 hover:text-[var(--text-primary)]"
            }`}
          >
            {t('elections.phase')} {p.phase}
          </button>
        ))}
      </div>

      {/* Active phase detail */}
      <div className="glass-card p-6 animate-fade-up" key={activePhase}>
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-[var(--text-primary)]">
              {t('elections.phase')} {phases[activePhase].phase}
            </h3>
            <p className="text-saffron-500 font-semibold text-sm mt-1">
              {phases[activePhase].date}
            </p>
          </div>
          <div className="pill-badge pill-badge-accent text-base px-5 py-2">
            {phases[activePhase].seats} {t('elections.seats')}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3">
            {t('elections.statesCovered')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {phases[activePhase].states.map((state) => (
              <span
                key={state}
                className="px-3 py-1.5 rounded-lg bg-[var(--bg-glass)] border border-[var(--border-color)] text-sm text-[var(--text-secondary)] font-medium"
              >
                {state}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline visualization */}
      <div className="mt-8 relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[var(--border-color)]" />
        {phases.map((p, i) => (
          <div key={i} className="relative flex items-start gap-4 mb-6 pl-12">
            <div className={`absolute left-4 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              i <= activePhase 
                ? "border-saffron-500 bg-saffron-500/20" 
                : "border-[var(--border-color)] bg-[var(--bg-glass)]"
            }`}>
              {i < activePhase && (
                <svg className="w-3 h-3 text-saffron-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className={`flex-1 ${i === activePhase ? "opacity-100" : "opacity-50"}`}>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm font-bold text-[var(--text-primary)]">{t('elections.phase')} {p.phase}</span>
                <span className="text-xs text-[var(--text-muted)]">{p.date}</span>
                <span className="pill-badge text-[0.6rem]">{p.seats} {t('elections.seats')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ElectionsPage() {
  const { t, language } = useLanguage();
  const tabs = [
    { id: "Lok Sabha", label: t('elections.lokSabha') },
    { id: "Vidhan Sabha", label: t('elections.vidhanSabha') },
    { id: "By-Elections", label: t('elections.byElections') },
    { id: "Local Body", label: t('elections.localBody') }
  ];
  const [activeTab, setActiveTab] = useState("Lok Sabha");

  return (
    <div className="page-enter mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-3">
          {t('elections.hubTitle')}
        </h1>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
          {t('elections.hubSubtitle')}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-saffron-500 to-saffron-400 text-white shadow-lg shadow-saffron-500/25"
                : "bg-[var(--bg-glass)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-saffron-500/30 hover:text-[var(--text-primary)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "Lok Sabha" && (
        <div className="animate-fade-up">
          {/* 2024 Details */}
          <div className="glass-card p-6 sm:p-8 mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold gradient-text">
                  {lokSabha2024.name}
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mt-1">
                  {lokSabha2024.totalSeats} {t('elections.seats')} - {lokSabha2024.phases.length} {t('states.phases')}
                </p>
              </div>
              <span className="pill-badge pill-badge-green">{t('elections.completed')}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="stat-card">
                <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">{t('elections.notification')}</span>
                <p className="text-sm font-bold text-[var(--text-primary)] mt-1">{lokSabha2024.notificationDate}</p>
              </div>
              <div className="stat-card">
                <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">{t('elections.firstPoll')}</span>
                <p className="text-sm font-bold text-[var(--text-primary)] mt-1">{lokSabha2024.phases[0].date}</p>
              </div>
              <div className="stat-card">
                <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">{t('elections.lastPoll')}</span>
                <p className="text-sm font-bold text-[var(--text-primary)] mt-1">{lokSabha2024.phases[6].date}</p>
              </div>
              <div className="stat-card">
                <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">{t('elections.results')}</span>
                <p className="text-sm font-bold text-[var(--text-primary)] mt-1">{lokSabha2024.resultDate}</p>
              </div>
            </div>

            <PhaseStepper phases={lokSabha2024.phases} />
          </div>

          {/* Election Process */}
          <div className="glass-card p-6 sm:p-8">
            <h2 className="text-xl font-extrabold text-[var(--text-primary)] mb-6">
              {t('elections.processTitle')}
            </h2>
            <div className="space-y-4">
              {electionProcess.map((step) => (
                <div
                  key={step.step}
                  className="flex items-start gap-4 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-glass)] hover:border-saffron-500/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron-500/20 to-saffron-400/10 border border-saffron-500/20 flex items-center justify-center text-lg flex-shrink-0">
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm font-bold text-[var(--text-primary)]">
                        {t('elections.step')} {step.step}: {language === 'en' ? step.title : step.titleHi}
                      </span>
                      {step.duration && (
                        <span className="pill-badge text-[0.6rem]">{step.duration}</span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Vidhan Sabha" && (
        <div className="animate-fade-up">
          <div className="glass-card p-6 sm:p-8 mb-8">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">{t('elections.vidhanSabha')}</h2>
            <p className="text-[var(--text-secondary)] max-w-md mb-6">
              {language === 'en' ? 'Tracking state elections for the 2026 cycle.' : '2026 चक्र के लिए राज्य चुनावों पर नज़र रखना।'}
            </p>
            
            <h3 className="section-heading mb-4">{t('elections.upcoming')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left mb-10">
              {upcomingElections2026.map((e) => (
                <ElectionCard key={e.id} election={e} />
              ))}
            </div>

            <h3 className="section-heading mb-4">{t('elections.completed')} (2024-2025)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
              {[
                { state: "Bihar", year: "2025", seats: 243 },
                { state: "Delhi", year: "2025", seats: 70 },
                { state: "Maharashtra", year: "2024", seats: 288 },
                { state: "Haryana", year: "2024", seats: 90 },
                { state: "Jharkhand", year: "2024", seats: 81 },
                { state: "J&K", year: "2024", seats: 90 },
              ].map((e) => (
                <div key={e.state} className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-glass)] hover:border-saffron-500/30 transition-all opacity-70">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-[var(--text-primary)]">{e.state}</span>
                    <span className="pill-badge pill-badge-green text-[0.6rem]">
                      {t('elections.completed')}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">{e.seats} {t('elections.seats')} - {e.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {(activeTab === "By-Elections" || activeTab === "Local Body") && (
        <div className="glass-card p-8 text-center animate-fade-up">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">{t(`elections.${activeTab === "By-Elections" ? 'byElections' : 'localBody'}`)}</h2>
          <p className="text-[var(--text-secondary)] max-w-md mx-auto">
            {activeTab === "By-Elections"
              ? (language === 'en' ? "By-election data for vacancies due to death, resignation, or disqualification of sitting members." : "सत्तारूढ़ सदस्यों की मृत्यु, इस्तीफे या अयोग्यता के कारण रिक्तियों के लिए उपचुनाव डेटा।")
              : (language === 'en' ? "Municipal, Panchayat, and local body election data organized by state." : "राज्य द्वारा आयोजित नगरपालिका, पंचायत और स्थानीय निकाय चुनाव डेटा।")}
          </p>
          <p className="text-sm text-[var(--text-muted)] mt-4">{t('elections.dataSoon')}</p>
        </div>
      )}
    </div>
  );
}
