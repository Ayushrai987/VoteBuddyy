// ============================================================
// VoteBuddy - Core TypeScript Types
// ============================================================

export interface State {
  name: string;
  slug: string;
  capital: string;
  type: "State" | "UT";
  loksabha: number;
  vidhansabha: number;
  districts: number;
  approxVoters: string;
  phases: number;
  lastElection: string;
  lastWinner: string;
  cm: string;
  governor?: string;
  area?: string;
  electionStatus?: "active" | "upcoming" | "concluded" | "live" | "none";
}

export interface Constituency {
  name: string;
  type: "LS" | "VS";
  state: string;
  district: string;
  division?: string;
  reservedFor?: "General" | "SC" | "ST";
}

export interface ElectionPhase {
  phase: number;
  date: string;
  states: string[];
  seats: number;
  districts?: string;
}

export interface Election {
  id: string;
  name: string;
  year: number;
  type: "Lok Sabha" | "Vidhan Sabha" | "By-Election" | "Local Body";
  totalSeats: number;
  phases: ElectionPhase[];
  notificationDate?: string;
  resultDate?: string;
  status: "completed" | "ongoing" | "upcoming" | "live";
  electionDate?: string; // ISO format or representative date
  isAnnounced?: boolean;
}

export interface Candidate {
  id: string;
  name: string;
  party: string;
  partyShort: string;
  constituency: string;
  state: string;
  photo?: string;
  gender: "Male" | "Female" | "Other";
  age: number;
  education?: string;
  criminalCases?: number;
  assets?: string;
  liabilities?: string;
  result?: "Won" | "Lost";
  votes?: number;
  margin?: number;
  electionYear: number;
}

export interface Booth {
  id: string;
  name: string;
  number: number;
  address: string;
  constituency: string;
  district: string;
  state: string;
  latitude?: number;
  longitude?: number;
  bloName?: string;
  bloPhone?: string;
  landmark?: string;
  accessibility: {
    ramp: boolean;
    wheelchair: boolean;
    drinkingWater: boolean;
    shade: boolean;
    toilets: boolean;
  };
}

export interface ECIRule {
  id: string;
  title: string;
  category: string;
  summary: string;
  fullText: string[];
  plainEnglish: string;
  notificationLink?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  topic?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  state?: string;
  constituency?: string;
  savedBooth?: string;
  bookmarkedCandidates: string[];
  savedRules: string[];
  createdAt: number;
}

export interface ElectionResult {
  year: number;
  constituency: string;
  state: string;
  winner: string;
  winnerParty: string;
  winnerVotes: number;
  runnerUp: string;
  runnerUpParty: string;
  runnerUpVotes: number;
  margin: number;
  totalVotes: number;
  nota: number;
  turnout: number;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  date: string;
  state?: string;
  category: string;
  factCheck?: "verified" | "unverified" | "disputed";
  image?: string;
}
