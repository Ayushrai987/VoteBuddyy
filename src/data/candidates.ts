// ============================================================
// VoteBuddy - Sample Candidate Data
// ============================================================
import { Candidate } from "@/types";

export const sampleCandidates: Candidate[] = [
  // Varanasi
  { id: "c1", name: "Narendra Modi", party: "Bharatiya Janata Party", partyShort: "BJP", constituency: "Varanasi", state: "Uttar Pradesh", gender: "Male", age: 74, education: "MA Political Science", criminalCases: 0, assets: "Rs.3.02 Cr", liabilities: "Rs.0", result: "Won", votes: 612970, margin: 152513, electionYear: 2024 },
  { id: "c2", name: "Ajay Rai", party: "Indian National Congress", partyShort: "INC", constituency: "Varanasi", state: "Uttar Pradesh", gender: "Male", age: 62, education: "Intermediate", criminalCases: 2, assets: "Rs.8.4 Cr", liabilities: "Rs.1.2 Cr", result: "Lost", votes: 460457, margin: -152513, electionYear: 2024 },
  // Amethi
  { id: "c3", name: "Kishori Lal Sharma", party: "Indian National Congress", partyShort: "INC", constituency: "Amethi", state: "Uttar Pradesh", gender: "Male", age: 56, education: "Graduate", criminalCases: 0, assets: "Rs.1.8 Cr", liabilities: "Rs.0", result: "Won", votes: 510019, margin: 167196, electionYear: 2024 },
  { id: "c4", name: "Smriti Irani", party: "Bharatiya Janata Party", partyShort: "BJP", constituency: "Amethi", state: "Uttar Pradesh", gender: "Female", age: 48, education: "BA (Unfinished)", criminalCases: 0, assets: "Rs.15.3 Cr", liabilities: "Rs.0.8 Cr", result: "Lost", votes: 342823, margin: -167196, electionYear: 2024 },
  // Rae Bareli
  { id: "c5", name: "Rahul Gandhi", party: "Indian National Congress", partyShort: "INC", constituency: "Rae Bareli", state: "Uttar Pradesh", gender: "Male", age: 54, education: "MPhil Development Studies", criminalCases: 0, assets: "Rs.20.5 Cr", liabilities: "Rs.0", result: "Won", votes: 687649, margin: 390030, electionYear: 2024 },
  // Lucknow
  { id: "c6", name: "Rajnath Singh", party: "Bharatiya Janata Party", partyShort: "BJP", constituency: "Lucknow", state: "Uttar Pradesh", gender: "Male", age: 73, education: "MA Political Science", criminalCases: 0, assets: "Rs.7.2 Cr", liabilities: "Rs.0", result: "Won", votes: 572852, margin: 75782, electionYear: 2024 },
  // Indore
  { id: "c7", name: "Lalwani Mohan Yadav", party: "Bharatiya Janata Party", partyShort: "BJP", constituency: "Indore", state: "Madhya Pradesh", gender: "Male", age: 52, education: "Graduate", criminalCases: 0, assets: "Rs.5.1 Cr", liabilities: "Rs.0.3 Cr", result: "Won", votes: 1211884, margin: 1175092, electionYear: 2024 },
  // Wayanad
  { id: "c8", name: "Priyanka Gandhi Vadra", party: "Indian National Congress", partyShort: "INC", constituency: "Wayanad", state: "Kerala", gender: "Female", age: 52, education: "MA (Psychology)", criminalCases: 0, assets: "Rs.12.3 Cr", liabilities: "Rs.0", result: "Won", votes: 647445, margin: 410931, electionYear: 2024 },
  // Gorakhpur
  { id: "c9", name: "Ravi Kishan", party: "Bharatiya Janata Party", partyShort: "BJP", constituency: "Gorakhpur", state: "Uttar Pradesh", gender: "Male", age: 55, education: "BA", criminalCases: 1, assets: "Rs.28.8 Cr", liabilities: "Rs.3.5 Cr", result: "Won", votes: 547496, margin: 98937, electionYear: 2024 },
  // Mumbai North
  { id: "c10", name: "Piyush Goyal", party: "Bharatiya Janata Party", partyShort: "BJP", constituency: "Mumbai North", state: "Maharashtra", gender: "Male", age: 60, education: "CA, Law Graduate", criminalCases: 0, assets: "Rs.18.6 Cr", liabilities: "Rs.0", result: "Won", votes: 587281, margin: 209623, electionYear: 2024 },
  // Thiruvananthapuram
  { id: "c11", name: "Shashi Tharoor", party: "Indian National Congress", partyShort: "INC", constituency: "Thiruvananthapuram", state: "Kerala", gender: "Male", age: 68, education: "PhD", criminalCases: 1, assets: "Rs.34.2 Cr", liabilities: "Rs.1.8 Cr", result: "Lost", votes: 341032, margin: -74711, electionYear: 2024 },
  // Chennai South
  { id: "c12", name: "Thamizhachi Thangapandian", party: "Dravida Munnetra Kazhagam", partyShort: "DMK", constituency: "Chennai South", state: "Tamil Nadu", gender: "Female", age: 56, education: "MBA", criminalCases: 0, assets: "Rs.4.6 Cr", liabilities: "Rs.0.2 Cr", result: "Won", votes: 496820, margin: 218742, electionYear: 2024 },
];

export const partyList = [
  { short: "BJP", full: "Bharatiya Janata Party", color: "#FF6B00", seats2024: 240 },
  { short: "INC", full: "Indian National Congress", color: "#19AAED", seats2024: 99 },
  { short: "SP", full: "Samajwadi Party", color: "#FF0000", seats2024: 37 },
  { short: "TMC", full: "All India Trinamool Congress", color: "#00A651", seats2024: 29 },
  { short: "DMK", full: "Dravida Munnetra Kazhagam", color: "#E40000", seats2024: 22 },
  { short: "TDP", full: "Telugu Desam Party", color: "#FFED00", seats2024: 16 },
  { short: "JDU", full: "Janata Dal (United)", color: "#003366", seats2024: 12 },
  { short: "SHS", full: "Shiv Sena", color: "#FF6600", seats2024: 7 },
  { short: "NCP", full: "Nationalist Congress Party", color: "#004B87", seats2024: 2 },
  { short: "AAP", full: "Aam Aadmi Party", color: "#0066B3", seats2024: 3 },
  { short: "YSRCP", full: "YSR Congress Party", color: "#318CE7", seats2024: 4 },
  { short: "BSP", full: "Bahujan Samaj Party", color: "#22409A", seats2024: 0 },
  { short: "CPM", full: "Communist Party of India (Marxist)", color: "#CC0000", seats2024: 4 },
  { short: "JMM", full: "Jharkhand Mukti Morcha", color: "#006400", seats2024: 3 },
];
