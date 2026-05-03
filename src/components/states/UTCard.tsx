'use client';

import Link from "next/link";

interface UT {
  name: string;
  slug: string;
  capital: string;
  loksabha: number;
  approxVoters: string;
  cm: string;
}

/**
 * Card component for displaying Union Territory data.
 * 
 * @param {Object} props - Component props.
 * @param {UT} props.ut - The UT data object.
 * @returns {JSX.Element} The rendered UT card.
 */
export function UTCard({ ut }: { ut: UT }) {
  return (
    <Link
      href={`/states/${ut.slug}`}
      className="glass-card-hover p-5 group transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-saffron-500 transition-colors">
          {ut.name}
        </h3>
        <span className="pill-badge text-[0.6rem]">Union Territory</span>
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
      <div className="mt-3 pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
        <span className="text-xs text-saffron-500 font-semibold group-hover:translate-x-1 transition-transform">
          View Details
        </span>
      </div>
    </Link>
  );
}
