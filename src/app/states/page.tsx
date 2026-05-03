"use client";
import { useState } from "react";
import Link from "next/link";
import { states } from "@/data/states";
import { allElections, getElectionStatus } from "@/data/elections";

import { StateCard } from "@/components/states/StateCard";
import { UTCard } from "@/components/states/UTCard";

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
              <StateCard key={state.slug} state={state as any} />
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
              <UTCard key={ut.slug} ut={ut as any} />
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
