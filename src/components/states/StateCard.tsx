'use client';

import Link from "next/link";
import { allElections, getElectionStatus } from "@/data/elections";

interface State {
  name: string;
  slug: string;
  capital: string;
  loksabha: number;
  vidhansabha: number;
  approxVoters: string;
  cm: string;
  electionStatus?: string;
}

/**
 * Card component for displaying state-specific election data.
 * Includes dynamic election status badges and transition effects.
 * 
 * @param {Object} props - Component props.
 * @param {State} props.state - The state data object.
 * @returns {JSX.Element} The rendered state card.
 */
export function StateCard({ state }: { state: State }) {
  const getStatusDisplay = (stateName: string, currentStatus: string | undefined) => {
    const election = allElections.find(e => e.name.includes(stateName) || (e.phases.some(p => p.states.includes(stateName))));
    if (election && election.electionDate) {
      return getElectionStatus(election.electionDate);
    }
    
    switch (currentStatus) {
      case "upcoming": return { label: "Upcoming", color: "orange" };
      case "live": return { label: "Live", color: "orange", pulse: true };
      case "concluded": return { label: "Concluded", color: "gray" };
      default: return { label: "Upcoming", color: "orange" };
    }
  };

  const display = getStatusDisplay(state.name, state.electionStatus);
  const election = allElections.find(e => e.name.includes(state.name));

  return (
    <Link
      href={`/states/${state.slug}`}
      className="glass-card-hover p-5 group transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-saffron-500 transition-colors">
          {state.name}
        </h3>
        <div className="flex flex-col items-end gap-1">
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
          View Details
        </span>
      </div>
    </Link>
  );
}
