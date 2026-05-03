import { allElections } from "@/data/elections";
import { Election } from "@/types";

/**
 * Returns the status of an election based on its date.
 * Labels: Concluded, Upcoming, Live
 */
export const getElectionStatus = (electionDateStr: string | undefined) => {
  if (!electionDateStr) return { label: "Upcoming", color: "orange", status: "upcoming" as const };
  
  const now = new Date();
  const electionDate = new Date(electionDateStr);
  
  // Set time to 00:00:00 for accurate day comparison
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const eDate = new Date(electionDate.getFullYear(), electionDate.getMonth(), electionDate.getDate());
  
  const diffTime = eDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { label: "Concluded", color: "gray", status: "completed" as const };
  } else if (diffDays >= 0 && diffDays <= 7) {
    // Current or very soon
    return { label: "Live", color: "orange", status: "live" as const, pulse: true };
  } else {
    return { label: "Upcoming", color: "orange", status: "upcoming" as const };
  }
};

/**
 * Returns the next upcoming election
 */
export const getNextElection = (): Election | undefined => {
  const now = new Date();
  return allElections
    .filter(e => e.electionDate && new Date(e.electionDate) > now)
    .sort((a, b) => new Date(a.electionDate!).getTime() - new Date(b.electionDate!).getTime())[0];
};

/**
 * Returns the date string for the next election
 */
export const getNextElectionDate = (): string => {
  const next = getNextElection();
  return next?.electionDate || "";
};

/**
 * Formats vote counts into human readable strings (e.g. 1.2M+, 50K+)
 */
export const formatVoteCount = (count: number): string => {
  if (count >= 10000000) {
    return (count / 10000000).toFixed(1).replace(/\.0$/, '') + " Cr+";
  }
  if (count >= 100000) {
    return (count / 100000).toFixed(1).replace(/\.0$/, '') + " L+";
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + " K+";
  }
  return count.toString();
};

/**
 * Validates Indian EPIC (Voter ID) number format
 * Standard format: 3 letters followed by 7 digits
 */
export const isValidEPIC = (epic: string): boolean => {
  const regex = /^[A-Z]{3}[0-9]{7}$/;
  return regex.test(epic.toUpperCase());
};
