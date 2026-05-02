"use client";
import { useState } from "react";
import { voterRegistration } from "@/data/eci-rules";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function VoterServicesPage() {
  const [activeSection, setActiveSection] = useState("form6");
  const [birthDate, setBirthDate] = useState("");
  const [eligibilityResult, setEligibilityResult] = useState<string | null>(null);
  const { language, t } = useLanguage();

  const sections = [
    { id: "form6", label: t('voter.newRegistration'), icon: "" },
    { id: "form7", label: t('voter.deletionObjection'), icon: "" },
    { id: "form8", label: t('voter.correction'), icon: "" },
    { id: "epic", label: t('voter.voterIdEpic'), icon: "" },
    { id: "helpline", label: t('voter.helpline1950'), icon: "" },
    { id: "eligibility", label: t('voter.eligibilityCheck'), icon: "" },
  ];

  function checkEligibility() {
    if (!birthDate) return;
    const dob = new Date(birthDate);
    const qualifyingDate = new Date("2026-01-01");
    const age = Math.floor((qualifyingDate.getTime() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    
    if (age >= 18) {
      setEligibilityResult(t('voter.eligibleMsg').replace("{age}", age.toString()));
    } else {
      const turnDate = new Date(dob);
      turnDate.setFullYear(turnDate.getFullYear() + 18);
      const dateStr = turnDate.toLocaleDateString(language === 'en' ? "en-IN" : "hi-IN", { day: "numeric", month: "long", year: "numeric" });
      setEligibilityResult(t('voter.notEligibleMsg').replace("{date}", dateStr));
    }
  }

  const reg = voterRegistration;

  return (
    <div className="page-enter mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-3">
          {t('voter.hubTitle')}
        </h1>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
          {t('voter.hubSubtitle')}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
        <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer"
          className="glass-card-hover p-4 text-center">
          <span className="text-2xl block mb-2"></span>
          <span className="text-xs font-bold text-[var(--text-primary)]">{t('voter.nvspPortal')}</span>
        </a>
        <a href="https://voterportal.eci.gov.in" target="_blank" rel="noopener noreferrer"
          className="glass-card-hover p-4 text-center">
          <span className="text-2xl block mb-2"></span>
          <span className="text-xs font-bold text-[var(--text-primary)]">{t('voter.checkVoterList')}</span>
        </a>
        <a href="tel:1950" className="glass-card-hover p-4 text-center">
          <span className="text-2xl block mb-2"></span>
          <span className="text-xs font-bold text-[var(--text-primary)]">{t('voter.call1950')}</span>
        </a>
        <a href="https://voters.eci.gov.in/download-epic" target="_blank" rel="noopener noreferrer"
          className="glass-card-hover p-4 text-center">
          <span className="text-2xl block mb-2"></span>
          <span className="text-xs font-bold text-[var(--text-primary)]">{t('voter.downloadEpic')}</span>
        </a>
        <a href="https://voters.eci.gov.in/track-application" target="_blank" rel="noopener noreferrer"
          className="glass-card-hover p-4 text-center">
          <span className="text-2xl block mb-2"></span>
          <span className="text-xs font-bold text-[var(--text-primary)]">{t('voter.trackStatus')}</span>
        </a>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <nav className="lg:w-64 flex-shrink-0">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeSection === s.id
                    ? "bg-gradient-to-r from-saffron-500/15 to-saffron-400/10 text-saffron-500 border border-saffron-500/20"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-glass)] border border-transparent"
                }`}
              >
                <span className="text-lg"></span>
                {s.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1">
          {/* Form 6 */}
          {activeSection === "form6" && (
            <div className="glass-card p-6 sm:p-8 animate-fade-up">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl"></span>
                <div>
                  <h2 className="text-xl font-extrabold text-[var(--text-primary)]">{language === 'en' ? reg.form6.title : reg.form6.titleHi}</h2>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <p className="text-sm text-[var(--text-secondary)]">{language === 'en' ? reg.form6.summary : 'नए मतदाताओं के पंजीकरण के लिए फॉर्म।'}</p>
                <button 
                  onClick={() => window.print()}
                  className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-glass)] border border-[var(--border-color)] text-xs font-bold text-[var(--text-primary)] hover:border-saffron-500 transition-all"
                >
                  {t('voter.printChecklist')}
                </button>
              </div>

              <h3 className="section-heading mb-3">{t('voter.stepByStep')}</h3>
              <ol className="space-y-3 mb-6">
                {reg.form6.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-br from-saffron-500/20 to-saffron-400/10 border border-saffron-500/20 flex items-center justify-center text-xs font-bold text-saffron-500 flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm text-[var(--text-secondary)]">{step}</span>
                  </li>
                ))}
              </ol>

              <h3 className="section-heading mb-3">{t('voter.requiredDocs')}</h3>
              <ul className="space-y-2 mb-6">
                {reg.form6.documents.map((doc, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="text-green-500 flex-shrink-0"></span>
                    {doc}
                  </li>
                ))}
              </ul>

              <div className="info-card">
                <h4 className="text-xs font-bold uppercase tracking-wider text-saffron-500 mb-2">{t('voter.qualifyingDates')}</h4>
                <div className="flex flex-wrap gap-2">
                  {reg.form6.qualifyingDates.map((d) => (
                    <span key={d} className="pill-badge pill-badge-accent">{d}</span>
                  ))}
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-2">{t('voter.qualifyingDesc')}</p>
              </div>
            </div>
          )}

          {/* Form 7 */}
          {activeSection === "form7" && (
            <div className="glass-card p-6 sm:p-8 animate-fade-up">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl"></span>
                <div>
                  <h2 className="text-xl font-extrabold text-[var(--text-primary)]">{language === 'en' ? reg.form7.title : reg.form7.titleHi}</h2>
                </div>
              </div>
              <ul className="space-y-3">
                {reg.form7.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="text-saffron-500 flex-shrink-0"></span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Form 8 */}
          {activeSection === "form8" && (
            <div className="glass-card p-6 sm:p-8 animate-fade-up">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl"></span>
                <div>
                  <h2 className="text-xl font-extrabold text-[var(--text-primary)]">{language === 'en' ? reg.form8.title : reg.form8.titleHi}</h2>
                </div>
              </div>
              <ul className="space-y-3">
                {reg.form8.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="text-saffron-500 flex-shrink-0"></span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* EPIC */}
          {activeSection === "epic" && (
            <div className="glass-card p-6 sm:p-8 animate-fade-up">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl"></span>
                <div>
                  <h2 className="text-xl font-extrabold text-[var(--text-primary)]">{language === 'en' ? reg.epic.title : reg.epic.titleHi}</h2>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {reg.epic.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="text-saffron-500 flex-shrink-0"></span>
                    {d}
                  </li>
                ))}
              </ul>

              <h3 className="section-heading mb-3">{t('voter.alternativeIds')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {reg.epic.alternativeIds.map((id, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[var(--text-secondary)] p-2 rounded-lg bg-[var(--bg-glass)] border border-[var(--border-color)]">
                    <span className="text-green-500"></span>
                    {id}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Helpline */}
          {activeSection === "helpline" && (
            <div className="glass-card p-6 sm:p-8 animate-fade-up">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl"></span>
                <div>
                  <h2 className="text-xl font-extrabold text-[var(--text-primary)]">{language === 'en' ? reg.helpline.title : reg.helpline.titleHi}</h2>
                </div>
              </div>

              <div className="text-center py-6 mb-6">
                <a href="tel:1950" className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-saffron-500 to-saffron-400 text-white text-xl font-bold shadow-lg shadow-saffron-500/30 hover:shadow-saffron-500/50 transition-all hover:scale-105">
                  {t('voter.callNow')}
                </a>
                <p className="text-sm text-[var(--text-muted)] mt-3">{t('voter.callDesc')}</p>
              </div>

              <ul className="space-y-3">
                {reg.helpline.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="text-saffron-500 flex-shrink-0"></span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Eligibility */}
          {activeSection === "eligibility" && (
            <div className="glass-card p-6 sm:p-8 animate-fade-up">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl"></span>
                <div>
                  <h2 className="text-xl font-extrabold text-[var(--text-primary)]">{t('voter.ageChecker')}</h2>
                  <p className="text-sm text-[var(--text-secondary)]">{t('voter.ageCheckerDesc')}</p>
                </div>
              </div>

              <div className="max-w-sm mx-auto text-center py-6">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2 text-left">
                  {t('voter.enterDob')}
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => { setBirthDate(e.target.value); setEligibilityResult(null); }}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20 transition-all mb-4"
                />
                <button
                  onClick={checkEligibility}
                  disabled={!birthDate}
                  className="btn-accent px-8 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed w-full"
                >
                  {t('voter.checkButton')}
                </button>

                {eligibilityResult && (
                  <div className={`mt-6 p-4 rounded-xl border text-sm text-left leading-relaxed ${
                    eligibilityResult.includes(t('voter.eligibleMsg').substring(0, 10))
                      ? "border-green-500/30 bg-green-500/10 text-green-400"
                      : "border-red-500/30 bg-red-500/10 text-red-400"
                  }`}>
                    {eligibilityResult}
                  </div>
                )}
              </div>

              <div className="info-card mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-saffron-500 mb-2">
                  {t('voter.upcomingQualifying')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="pill-badge pill-badge-accent">Jan 1, 2026</span>
                  <span className="pill-badge">Apr 1, 2026</span>
                  <span className="pill-badge">Jul 1, 2026</span>
                  <span className="pill-badge">Oct 1, 2026</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
