"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { states } from "@/data/states";
import { quickStats, ls2024Results } from "@/data/elections";
import { getNextElection } from "@/lib/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { StatCounter } from "@/components/home/StatCounter";
import { CountdownTimer } from "@/components/home/CountdownTimer";
import { NewsTicker } from "@/components/home/NewsTicker";

// ============================================================
// CTA Card
// ============================================================
function CTACard({ icon, title, desc, href, color }: { icon: string; title: string; desc: string; href: string; color: string }) {
  const { t } = useLanguage();
  return (
    <Link href={href} className="glass-card-hover p-6 flex flex-col gap-3 group">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border border-[var(--border-color)]"
        style={{ background: `${color}15` }}
      >
        {icon}
      </div>
      <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-saffron-500 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{desc}</p>
      <span className="text-saffron-500 text-sm font-semibold mt-auto flex items-center gap-1 group-hover:gap-2 transition-all">
        {t('common.explore')}
      </span>
    </Link>
  );
}

// ============================================================
// Party Result Bar
// ============================================================
function PartyBar({ party, seats, total, color }: { party: string; seats: number; total: number; color: string }) {
  const pct = (seats / total) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-bold text-[var(--text-primary)] w-12 text-right">{party}</span>
      <div className="flex-1 h-7 bg-[var(--bg-glass)] rounded-lg overflow-hidden border border-[var(--border-color)]">
        <div
          className="h-full rounded-lg flex items-center px-2 transition-all duration-1000 ease-out"
          style={{ width: `${pct}%`, background: color, minWidth: seats > 0 ? "30px" : "0" }}
        >
          <span className="text-[0.65rem] font-bold text-white drop-shadow">{seats}</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// HOME PAGE
// ============================================================
export default function HomePage() {
  const { t, language } = useLanguage();
  const totalStates = states.filter((s) => s.type === "State").length;
  const totalUTs = states.filter((s) => s.type === "UT").length;
  
  const nextElection = getNextElection();

  const ctas = [
    { icon: "", title: t('nav.voterServices'), desc: language === 'en' ? "Register to vote, correct details, check status, download voter ID, and more." : "वोट देने के लिए पंजीकरण करें, विवरण सुधारें, स्थिति जांचें, मतदाता पहचान पत्र डाउनलोड करें, और बहुत कुछ।", href: "/voter", color: "#0EA5E9" },
    { icon: "", title: t('nav.states'), desc: language === 'en' ? "Interactive India map with detailed data for all 28 states and 8 union territories." : "सभी 28 राज्यों और 8 केंद्र शासित प्रदेशों के विस्तृत डेटा के साथ इंटरैक्टिव भारत मानचित्र।", href: "/states", color: "#138808" },
    { icon: "", title: t('nav.results'), desc: language === 'en' ? "Historical results from 2009-2024 with swing analysis, party tallies, and turnout data." : "स्विंग विश्लेषण, पार्टी मिलान और मतदान डेटा के साथ 2009-2024 के ऐतिहासिक परिणाम।", href: "/results", color: "#8B5CF6" },
    { icon: "", title: t('nav.eciRules'), desc: language === 'en' ? "Complete guide to Model Code of Conduct, campaign rules, EVM/VVPAT, and more." : "आदर्श आचार संहिता, अभियान नियम, ईवीएम/वीवीपीएटी, और बहुत कुछ के लिए संपूर्ण मार्गदर्शिका।", href: "/eci-rules", color: "#EC4899" },
    { icon: "", title: t('nav.aiChat'), desc: language === 'en' ? "Ask VoteBuddy anything about Indian elections in English or Hindi. Powered by AI." : "वोटबडी से भारतीय चुनावों के बारे में अंग्रेजी या हिंदी में कुछ भी पूछें। एआई द्वारा संचालित।", href: "/ai-assistant", color: "#F59E0B" },
  ];

  const statsGrid = [
    { label: t('home.registeredVoters'), value: 97, suffix: language === 'en' ? " Cr+" : " करोड़+", icon: "" },
    { label: t('home.pollingBooths'), value: 10, suffix: language === 'en' ? ".5 L+" : ".5 लाख+", icon: "" },
    { label: t('home.lsSeats'), value: 543, suffix: "", icon: "" },
    { label: t('home.states'), value: totalStates, suffix: "", icon: "" },
    { label: t('home.uts'), value: totalUTs, suffix: "", icon: "" },
    { label: t('home.vsSeats'), value: 4120, suffix: "+", icon: "" },
  ];

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-8 sm:pt-20 sm:pb-12">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 pill-badge pill-badge-accent mb-6 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {t('home.heroBadge')}
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              {t('home.guideTo')} {" "}
              <span className="gradient-text">{t('home.indianElections')}</span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed mb-4 max-w-2xl mx-auto">
              {t('home.heroSubtitle')}
            </p>
            <p className="text-base text-[var(--text-muted)] font-hindi mb-8">
              {t('home.heroHindiSubtitle')}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
              <Link href="/booth-finder" className="btn-accent text-base px-8 py-3 rounded-xl flex items-center gap-2">
                {t('nav.boothFinder')}
              </Link>
              <Link href="/voter" className="btn-ghost text-base px-8 py-3 rounded-xl flex items-center gap-2">
                {t('home.checkVoterStatus')}
              </Link>
            </div>

            {/* Countdown */}
            <div className="glass-card inline-flex flex-col items-center gap-3 px-8 py-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2">
                {nextElection ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    {nextElection.name}
                    {!nextElection.isAnnounced && (
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-500 text-[0.6rem]">
                        {language === 'en' ? 'Schedule Not Announced' : 'कार्यक्रम घोषित नहीं'}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-[var(--text-muted)]" />
                    {language === 'en' ? 'Elections 2026' : 'चुनाव 2026'}
                  </>
                )}
              </span>
              {nextElection?.electionDate ? (
                <CountdownTimer targetDate={nextElection.electionDate} />
              ) : (
                <div className="text-xl font-bold gradient-text">
                  {language === 'en' ? 'Coming Soon' : 'जल्द आ रहा है'}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* News Ticker */}
      <NewsTicker />

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 stagger-children">
          {statsGrid.map((stat) => (
            <div key={stat.label} className="stat-card">
              <StatCounter target={stat.value} suffix={stat.suffix} />
              <span className="text-[0.65rem] text-[var(--text-muted)] font-semibold uppercase tracking-wider mt-1 block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTAs */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] mb-2">
            {t('home.whatToDo')}
          </h2>
          <p className="text-[var(--text-secondary)]">
            {t('home.accessTools')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
          {ctas.map((cta) => (
            <CTACard key={cta.href} {...cta} />
          ))}
        </div>
      </section>

      {/* 2024 Results Snapshot */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
        <div className="glass-card p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)]">
                {t('home.resultsSnapshot')}
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">{language === 'en' ? '18th General Election - 543 Seats' : '18वां आम चुनाव - 543 सीटें'}</p>
            </div>
            <Link href="/results" className="text-sm font-semibold text-saffron-500 hover:underline">
              {t('home.viewFullResults')}
            </Link>
          </div>

          {/* NDA vs INDIA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl border border-saffron-500/20 bg-saffron-500/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-saffron-500">NDA</span>
                <span className="text-2xl font-extrabold text-saffron-500">293</span>
              </div>
              <div className="h-2 bg-[var(--bg-glass)] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-saffron-500 to-saffron-400 rounded-full" style={{ width: "53.9%" }} />
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-1">{t('home.majorityMark')}: 272</p>
            </div>
            <div className="p-4 rounded-xl border border-india-ashoka/20 bg-india-ashoka/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-india-ashoka">I.N.D.I.A</span>
                <span className="text-2xl font-extrabold text-india-ashoka">234</span>
              </div>
              <div className="h-2 bg-[var(--bg-glass)] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-india-ashoka to-blue-400 rounded-full" style={{ width: "43.1%" }} />
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-1">{t('home.others')}: 16 {t('home.seats')}</p>
            </div>
          </div>

          {/* Party bars */}
          <div className="space-y-2">
            {ls2024Results.map((r) => (
              <PartyBar key={r.party} party={r.party} seats={r.seats} total={543} color={r.color} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
