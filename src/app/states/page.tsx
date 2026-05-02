"use client";
import { useState } from "react";
import Link from "next/link";
import { states } from "@/data/states";
import { allElections, getElectionStatus } from "@/data/elections";

export default function StatesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "State" | "UT">("all");

  const filtered = states.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.capital.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || s.type === filter;
    return matchSearch && matchFilter;
  });

  const statesList = filtered.filter((s) => s.type === "State");
  const utsList = filtered.filter((s) => s.type === "UT");

  const getStatusDisplay = (stateName: string, currentStatus: string | undefined) => {
    const election = allElections.find(e => e.name.includes(stateName) || (e.phases.some(p => p.states.includes(stateName))));
    if (election && election.electionDate) {
      return getElectionStatus(election.electionDate);
    }
    
    // Fallback to static status
    switch (currentStatus) {
      case "upcoming": return { label: "Upcoming", color: "orange" };
      case "live": return { label: "Live", color: "orange", pulse: true };
      case "concluded": return { label: "Concluded", color: "gray" };
      default: return { label: "UT", color: "gray" };
    }
  };

  return (
    <div className="page-enter mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-3">
          State Explorer
        </h1>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
          Explore detailed election data for all 28 states and 8 union territories of India.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-8 max-w-xl mx-auto">
        <div className="relative flex-1 w-full">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search states or capitals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20 transition-all"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "State", "UT"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                filter === f
                  ? "bg-gradient-to-r from-saffron-500 to-saffron-400 text-white shadow-lg shadow-saffron-500/25"
                  : "bg-[var(--bg-glass)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-saffron-500/30"
              }`}
            >
              {f === "all" ? "All" : f === "State" ? "States" : "UTs"}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="stat-card">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Total Entities</span>
          <p className="text-2xl font-extrabold gradient-text mt-1">{filtered.length}</p>
        </div>
        <div className="stat-card">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Total LS Seats</span>
          <p className="text-2xl font-extrabold gradient-text mt-1">{filtered.reduce((a, s) => a + s.loksabha, 0)}</p>
        </div>
        <div className="stat-card">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Total VS Seats</span>
          <p className="text-2xl font-extrabold gradient-text mt-1">{filtered.reduce((a, s) => a + s.vidhansabha, 0).toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Total Districts</span>
          <p className="text-2xl font-extrabold gradient-text mt-1">{filtered.reduce((a, s) => a + s.districts, 0)}</p>
        </div>
      </div>

      {/* States grid */}
      {statesList.length > 0 && (
        <>
          <h2 className="section-heading mb-4">States ({statesList.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 stagger-children">
            {statesList.map((state) => (
              <Link
                key={state.slug}
                href={`/states/${state.slug}`}
                className="glass-card-hover p-5 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-saffron-500 transition-colors">
                    {state.name}
                  </h3>
                  <div className="flex flex-col items-end gap-1">
                    {(() => {
                      const display = getStatusDisplay(state.name, state.electionStatus);
                      const election = allElections.find(e => e.name.includes(state.name));
                      return (
                        <>
                          <span className={`pill-badge text-[0.6rem] flex items-center gap-1 ${
                            display.color === "orange" ? "pill-badge-accent" : "pill-badge-green"
                          }`}>
                            {display.pulse && <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />}
                            {display.label}
                          </span>
                          {election && !election.isAnnounced && (
                            <span className="text-[0.55rem] text-orange-500 font-bold uppercase tracking-tighter">
                              Schedule Not Announced
                            </span>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-[0.65rem] text-[var(--text-muted)] uppercase tracking-wider">Capital</span>
                    <p className="text-[var(--text-secondary)] font-medium">{state.capital}</p>
                  </div>
                  <div>
                    <span className="text-[0.65rem] text-[var(--text-muted)] uppercase tracking-wider">LS Seats</span>
                    <p className="text-[var(--text-secondary)] font-bold">{state.loksabha}</p>
                  </div>
                  <div>
                    <span className="text-[0.65rem] text-[var(--text-muted)] uppercase tracking-wider">VS Seats</span>
                    <p className="text-[var(--text-secondary)] font-bold">{state.vidhansabha || "N/A"}</p>
                  </div>
                  <div>
                    <span className="text-[0.65rem] text-[var(--text-muted)] uppercase tracking-wider">Voters</span>
                    <p className="text-[var(--text-secondary)] font-medium">{state.approxVoters}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
                  <span className="text-xs text-[var(--text-muted)]">
                    CM: <strong className="text-[var(--text-secondary)]">{state.cm}</strong>
                  </span>
                  <span className="text-xs text-saffron-500 font-semibold group-hover:translate-x-1 transition-transform">
                    View
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* UTs grid */}
      {utsList.length > 0 && (
        <>
          <h2 className="section-heading mb-4">Union Territories ({utsList.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
            {utsList.map((ut) => (
              <Link
                key={ut.slug}
                href={`/states/${ut.slug}`}
                className="glass-card-hover p-5 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-saffron-500 transition-colors">
                    {ut.name}
                  </h3>
                  <span className="pill-badge text-[0.6rem]">UT</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-[0.65rem] text-[var(--text-muted)] uppercase tracking-wider">Capital</span>
                    <p className="text-[var(--text-secondary)] font-medium">{ut.capital}</p>
                  </div>
                  <div>
                    <span className="text-[0.65rem] text-[var(--text-muted)] uppercase tracking-wider">LS Seats</span>
                    <p className="text-[var(--text-secondary)] font-bold">{ut.loksabha}</p>
                  </div>
                  <div>
                    <span className="text-[0.65rem] text-[var(--text-muted)] uppercase tracking-wider">Voters</span>
                    <p className="text-[var(--text-secondary)] font-medium">{ut.approxVoters}</p>
                  </div>
                  <div>
                    <span className="text-[0.65rem] text-[var(--text-muted)] uppercase tracking-wider">Head</span>
                    <p className="text-[var(--text-secondary)] font-medium text-xs">{ut.cm}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <span className="text-5xl block mb-4"></span>
          <p className="text-[var(--text-secondary)]">No states or UTs match your search.</p>
        </div>
      )}
    </div>
  );
}
