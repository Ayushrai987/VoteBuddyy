// ============================================================
// VoteBuddy - All India States & UTs Data
// Migrated from data.js + expanded with additional fields
// ============================================================
import { State } from "@/types";

export const states: State[] = [
  { name: "Andhra Pradesh", slug: "andhra-pradesh", capital: "Amaravati", type: "State", loksabha: 25, vidhansabha: 175, districts: 26, approxVoters: "3.9 Cr", phases: 1, lastElection: "2024", lastWinner: "TDP+ (NDA)", cm: "N. Chandrababu Naidu", governor: "S. Abdul Nazeer", electionStatus: "concluded" },
  { name: "Arunachal Pradesh", slug: "arunachal-pradesh", capital: "Itanagar", type: "State", loksabha: 2, vidhansabha: 60, districts: 26, approxVoters: "8.5 L", phases: 1, lastElection: "2024", lastWinner: "BJP", cm: "Pema Khandu", governor: "Lt. Gen. K.T. Parnaik", electionStatus: "concluded" },
  { name: "Assam", slug: "assam", capital: "Dispur", type: "State", loksabha: 14, vidhansabha: 126, districts: 35, approxVoters: "2.4 Cr", phases: 3, lastElection: "2024", lastWinner: "BJP+ (NDA)", cm: "Himanta Biswa Sarma", governor: "Gulab Chand Kataria", electionStatus: "upcoming" },
  { name: "Bihar", slug: "bihar", capital: "Patna", type: "State", loksabha: 40, vidhansabha: 243, districts: 38, approxVoters: "7.3 Cr", phases: 7, lastElection: "2025", lastWinner: "NDA", cm: "Nitish Kumar", governor: "Rajendra Vishwanath Arlekar", electionStatus: "concluded" },
  { name: "Chhattisgarh", slug: "chhattisgarh", capital: "Raipur", type: "State", loksabha: 11, vidhansabha: 90, districts: 33, approxVoters: "2.0 Cr", phases: 2, lastElection: "2024", lastWinner: "BJP", cm: "Vishnu Deo Sai", governor: "Ramen Deka", electionStatus: "concluded" },
  { name: "Goa", slug: "goa", capital: "Panaji", type: "State", loksabha: 2, vidhansabha: 40, districts: 2, approxVoters: "11.5 L", phases: 1, lastElection: "2024", lastWinner: "BJP", cm: "Pramod Sawant", governor: "P.S. Sreedharan Pillai", electionStatus: "concluded" },
  { name: "Gujarat", slug: "gujarat", capital: "Gandhinagar", type: "State", loksabha: 26, vidhansabha: 182, districts: 33, approxVoters: "4.7 Cr", phases: 1, lastElection: "2024", lastWinner: "BJP", cm: "Bhupendra Patel", governor: "Acharya Devvrat", electionStatus: "concluded" },
  { name: "Haryana", slug: "haryana", capital: "Chandigarh", type: "State", loksabha: 10, vidhansabha: 90, districts: 22, approxVoters: "1.9 Cr", phases: 1, lastElection: "2024", lastWinner: "BJP", cm: "Nayab Singh Saini", governor: "Bandaru Dattatreya", electionStatus: "concluded" },
  { name: "Himachal Pradesh", slug: "himachal-pradesh", capital: "Shimla", type: "State", loksabha: 4, vidhansabha: 68, districts: 12, approxVoters: "53 L", phases: 1, lastElection: "2024", lastWinner: "BJP", cm: "Sukhvinder Singh Sukhu", governor: "Shiv Pratap Shukla", electionStatus: "concluded" },
  { name: "Jharkhand", slug: "jharkhand", capital: "Ranchi", type: "State", loksabha: 14, vidhansabha: 81, districts: 24, approxVoters: "2.3 Cr", phases: 4, lastElection: "2024", lastWinner: "JMM+ (INDIA)", cm: "Hemant Soren", governor: "Santosh Kumar Gangwar", electionStatus: "concluded" },
  { name: "Karnataka", slug: "karnataka", capital: "Bengaluru", type: "State", loksabha: 28, vidhansabha: 224, districts: 31, approxVoters: "5.3 Cr", phases: 1, lastElection: "2024", lastWinner: "NDA", cm: "Siddaramaiah", governor: "Thaawarchand Gehlot", electionStatus: "concluded" },
  { name: "Kerala", slug: "kerala", capital: "Thiruvananthapuram", type: "State", loksabha: 20, vidhansabha: 140, districts: 14, approxVoters: "2.7 Cr", phases: 1, lastElection: "2024", lastWinner: "UDF", cm: "Pinarayi Vijayan", governor: "Rajendra Vishwanath Arlekar", electionStatus: "upcoming" },
  { name: "Madhya Pradesh", slug: "madhya-pradesh", capital: "Bhopal", type: "State", loksabha: 29, vidhansabha: 230, districts: 55, approxVoters: "5.1 Cr", phases: 1, lastElection: "2024", lastWinner: "BJP", cm: "Mohan Yadav", governor: "Mangubhai Chhaganbhai Patel", electionStatus: "concluded" },
  { name: "Maharashtra", slug: "maharashtra", capital: "Mumbai", type: "State", loksabha: 48, vidhansabha: 288, districts: 36, approxVoters: "9.2 Cr", phases: 1, lastElection: "2024", lastWinner: "Mahayuti (NDA)", cm: "Devendra Fadnavis", governor: "C.P. Radhakrishnan", electionStatus: "concluded" },
  { name: "Manipur", slug: "manipur", capital: "Imphal", type: "State", loksabha: 2, vidhansabha: 60, districts: 16, approxVoters: "20 L", phases: 2, lastElection: "2024", lastWinner: "BJP", cm: "N. Biren Singh", governor: "Ajay Kumar Bhalla", electionStatus: "concluded" },
  { name: "Meghalaya", slug: "meghalaya", capital: "Shillong", type: "State", loksabha: 2, vidhansabha: 60, districts: 12, approxVoters: "19 L", phases: 1, lastElection: "2024", lastWinner: "NPP", cm: "Conrad Sangma", governor: "C.H. Vijayashankar", electionStatus: "concluded" },
  { name: "Mizoram", slug: "mizoram", capital: "Aizawl", type: "State", loksabha: 1, vidhansabha: 40, districts: 11, approxVoters: "8 L", phases: 1, lastElection: "2024", lastWinner: "ZPM", cm: "Lalduhoma", governor: "Gen. (Dr.) Vijay Kumar Singh", electionStatus: "concluded" },
  { name: "Nagaland", slug: "nagaland", capital: "Kohima", type: "State", loksabha: 1, vidhansabha: 60, districts: 16, approxVoters: "13 L", phases: 1, lastElection: "2024", lastWinner: "NDPP-BJP", cm: "Neiphiu Rio", governor: "La Ganesan", electionStatus: "concluded" },
  { name: "Odisha", slug: "odisha", capital: "Bhubaneswar", type: "State", loksabha: 21, vidhansabha: 147, districts: 30, approxVoters: "3.3 Cr", phases: 4, lastElection: "2024", lastWinner: "BJP", cm: "Mohan Charan Majhi", governor: "Raghubar Das", electionStatus: "concluded" },
  { name: "Punjab", slug: "punjab", capital: "Chandigarh", type: "State", loksabha: 13, vidhansabha: 117, districts: 23, approxVoters: "2.1 Cr", phases: 1, lastElection: "2024", lastWinner: "INC", cm: "Bhagwant Mann", governor: "Gulab Chand Kataria", electionStatus: "concluded" },
  { name: "Rajasthan", slug: "rajasthan", capital: "Jaipur", type: "State", loksabha: 25, vidhansabha: 200, districts: 50, approxVoters: "5.0 Cr", phases: 1, lastElection: "2024", lastWinner: "BJP", cm: "Bhajan Lal Sharma", governor: "Haribhau Kisanrao Bagde", electionStatus: "concluded" },
  { name: "Sikkim", slug: "sikkim", capital: "Gangtok", type: "State", loksabha: 1, vidhansabha: 32, districts: 6, approxVoters: "4.5 L", phases: 1, lastElection: "2024", lastWinner: "SKM", cm: "Prem Singh Tamang", governor: "Om Prakash Mathur", electionStatus: "concluded" },
  { name: "Tamil Nadu", slug: "tamil-nadu", capital: "Chennai", type: "State", loksabha: 39, vidhansabha: 234, districts: 38, approxVoters: "6.2 Cr", phases: 1, lastElection: "2024", lastWinner: "DMK+ (INDIA)", cm: "M.K. Stalin", governor: "R.N. Ravi", electionStatus: "upcoming" },
  { name: "Telangana", slug: "telangana", capital: "Hyderabad", type: "State", loksabha: 17, vidhansabha: 119, districts: 33, approxVoters: "3.1 Cr", phases: 1, lastElection: "2024", lastWinner: "INC", cm: "A. Revanth Reddy", governor: "Jishnu Dev Varma", electionStatus: "concluded" },
  { name: "Tripura", slug: "tripura", capital: "Agartala", type: "State", loksabha: 2, vidhansabha: 60, districts: 8, approxVoters: "27 L", phases: 1, lastElection: "2024", lastWinner: "BJP", cm: "Manik Saha", governor: "Indra Sena Reddy Nallu", electionStatus: "concluded" },
  { name: "Uttar Pradesh", slug: "uttar-pradesh", capital: "Lucknow", type: "State", loksabha: 80, vidhansabha: 403, districts: 75, approxVoters: "15.2 Cr", phases: 7, lastElection: "2024", lastWinner: "BJP+ (NDA)", cm: "Yogi Adityanath", governor: "Anandiben Patel", electionStatus: "concluded" },
  { name: "Uttarakhand", slug: "uttarakhand", capital: "Dehradun", type: "State", loksabha: 5, vidhansabha: 70, districts: 13, approxVoters: "78 L", phases: 1, lastElection: "2024", lastWinner: "BJP", cm: "Pushkar Singh Dhami", governor: "Lt. Gen. Gurmit Singh", electionStatus: "concluded" },
  { name: "West Bengal", slug: "west-bengal", capital: "Kolkata", type: "State", loksabha: 42, vidhansabha: 294, districts: 23, approxVoters: "7.3 Cr", phases: 7, lastElection: "2024", lastWinner: "TMC", cm: "Mamata Banerjee", governor: "C.V. Ananda Bose", electionStatus: "upcoming" },
  // Union Territories
  { name: "Andaman & Nicobar", slug: "andaman-nicobar", capital: "Port Blair", type: "UT", loksabha: 1, vidhansabha: 0, districts: 3, approxVoters: "3 L", phases: 1, lastElection: "2024", lastWinner: "BJP", cm: "Lt. Governor", electionStatus: "none" },
  { name: "Chandigarh", slug: "chandigarh", capital: "Chandigarh", type: "UT", loksabha: 1, vidhansabha: 0, districts: 1, approxVoters: "6.5 L", phases: 1, lastElection: "2024", lastWinner: "BJP", cm: "Administrator", electionStatus: "none" },
  { name: "DNH & Daman Diu", slug: "dnh-daman-diu", capital: "Daman", type: "UT", loksabha: 2, vidhansabha: 0, districts: 3, approxVoters: "4 L", phases: 1, lastElection: "2024", lastWinner: "BJP", cm: "Administrator", electionStatus: "none" },
  { name: "Delhi", slug: "delhi", capital: "New Delhi", type: "UT", loksabha: 7, vidhansabha: 70, districts: 11, approxVoters: "1.5 Cr", phases: 1, lastElection: "2024", lastWinner: "BJP (LS)", cm: "Rekha Gupta", governor: "V.K. Saxena", electionStatus: "concluded" },
  { name: "Jammu & Kashmir", slug: "jammu-kashmir", capital: "Srinagar", type: "UT", loksabha: 5, vidhansabha: 90, districts: 20, approxVoters: "76 L", phases: 3, lastElection: "2024", lastWinner: "NC-INC", cm: "Omar Abdullah", electionStatus: "concluded" },
  { name: "Ladakh", slug: "ladakh", capital: "Leh", type: "UT", loksabha: 1, vidhansabha: 0, districts: 2, approxVoters: "1.8 L", phases: 1, lastElection: "2024", lastWinner: "Independent", cm: "Lt. Governor", electionStatus: "none" },
  { name: "Lakshadweep", slug: "lakshadweep", capital: "Kavaratti", type: "UT", loksabha: 1, vidhansabha: 0, districts: 1, approxVoters: "55 K", phases: 1, lastElection: "2024", lastWinner: "INC", cm: "Administrator", electionStatus: "none" },
  { name: "Puducherry", slug: "puducherry", capital: "Puducherry", type: "UT", loksabha: 1, vidhansabha: 30, districts: 4, approxVoters: "10 L", phases: 1, lastElection: "2024", lastWinner: "NDA", cm: "N. Rangasamy", electionStatus: "upcoming" },
];

export function getStateBySlug(slug: string): State | undefined {
  return states.find((s) => s.slug === slug);
}

export function getStatesByType(type: "State" | "UT"): State[] {
  return states.filter((s) => s.type === type);
}

export function getTotalLSSeats(): number {
  return states.reduce((sum, s) => sum + s.loksabha, 0);
}

export function getTotalVSSeats(): number {
  return states.reduce((sum, s) => sum + s.vidhansabha, 0);
}
