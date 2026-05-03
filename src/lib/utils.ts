import { allElections } from "@/data/elections";
import { Election } from "@/types";

/**
 * Determines the status of an election based on the current date.
 * 
 * @param {string | undefined} electionDateStr - ISO date string of the election.
 * @returns {Object} Object containing status label, color theme, and animations.
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
 * Retrieves the next upcoming election from the global data set.
 * 
 * @returns {Election | undefined} The election object or undefined if none found.
 */
export const getNextElection = (): Election | undefined => {
  const now = new Date();
  return allElections
    .filter(e => e.electionDate && new Date(e.electionDate) > now)
    .sort((a, b) => new Date(a.electionDate!).getTime() - new Date(b.electionDate!).getTime())[0];
};

/**
 * Convenience helper to get the formatted date of the next election.
 * 
 * @returns {string} The ISO date string or empty string.
 */
export const getNextElectionDate = (): string => {
  const next = getNextElection();
  return next?.electionDate || "";
};

/**
 * Formats numeric vote counts into localized, human-readable strings.
 * Supports Crore (Cr), Lakh (L), and Thousand (K) denominations.
 * 
 * @param {number} count - The raw numeric count.
 * @returns {string} Formatted string (e.g., "1.2 Cr+").
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
 * Validates the format of an Indian EPIC (Voter ID) number.
 * Standard format: 3 uppercase letters followed by 7 numeric digits.
 * 
 * @param {string} epic - The EPIC string to validate.
 * @returns {boolean} True if format is valid, false otherwise.
 */
export const isValidEPIC = (epic: string): boolean => {
  const regex = /^[A-Z]{3}[0-9]{7}$/;
  return regex.test(epic.toUpperCase());
};
