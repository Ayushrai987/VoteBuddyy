// ============================================================
// VoteBuddy - Elections & Constituency Data
// ============================================================
import { Election } from "@/types";

export const lokSabha2024: Election = {
  id: "ls-2024",
  name: "18th Lok Sabha General Election",
  year: 2024,
  type: "Lok Sabha",
  totalSeats: 543,
  status: "completed",
  notificationDate: "March 16, 2024",
  resultDate: "June 4, 2024",
  phases: [
    { phase: 1, date: "April 19, 2024", states: ["Rajasthan", "Tamil Nadu", "Uttarakhand", "Arunachal Pradesh", "Meghalaya", "Sikkim", "Mizoram", "Nagaland", "Tripura", "Manipur", "Andaman & Nicobar", "Lakshadweep", "Puducherry", "Jammu & Kashmir", "Assam", "Bihar", "Chhattisgarh", "Madhya Pradesh", "Maharashtra", "Uttar Pradesh", "West Bengal"], seats: 102 },
    { phase: 2, date: "April 26, 2024", states: ["Assam", "Bihar", "Chhattisgarh", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Rajasthan", "Tripura", "Uttar Pradesh", "West Bengal", "Jammu & Kashmir"], seats: 89 },
    { phase: 3, date: "May 7, 2024", states: ["Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Karnataka", "Madhya Pradesh", "Maharashtra", "Uttar Pradesh", "West Bengal", "Dadra & Nagar Haveli", "Daman & Diu"], seats: 94 },
    { phase: 4, date: "May 13, 2024", states: ["Andhra Pradesh", "Bihar", "Jharkhand", "Madhya Pradesh", "Maharashtra", "Odisha", "Telangana", "Uttar Pradesh", "West Bengal", "Jammu & Kashmir"], seats: 96 },
    { phase: 5, date: "May 20, 2024", states: ["Bihar", "Jharkhand", "Maharashtra", "Odisha", "Uttar Pradesh", "West Bengal", "Ladakh", "Jammu & Kashmir"], seats: 49 },
    { phase: 6, date: "May 25, 2024", states: ["Bihar", "Haryana", "Jharkhand", "Odisha", "Uttar Pradesh", "West Bengal", "Delhi"], seats: 57 },
    { phase: 7, date: "June 1, 2024", states: ["Bihar", "Himachal Pradesh", "Jharkhand", "Odisha", "Punjab", "Uttar Pradesh", "West Bengal", "Chandigarh"], seats: 57 },
  ],
};

export const upDeepDive = {
  totalLS: 80,
  totalVS: 403,
  totalBooths: "1,74,351",
  totalVoters: "15.2 Crore",
  phases: 7,
  divisions: {
    "Agra Division": ["Agra", "Fatehpur Sikri", "Firozabad", "Mainpuri", "Mathura"],
    "Prayagraj Division": ["Prayagraj", "Phulpur", "Pratapgarh", "Barabanki"],
    "Azamgarh Division": ["Azamgarh", "Lalganj", "Ghosi", "Ballia"],
    "Bareilly Division": ["Bareilly", "Pilibhit", "Shahjahanpur", "Badaun", "Aonla"],
    "Basti Division": ["Basti", "Sant Kabir Nagar", "Khalilabad", "Domariaganj"],
    "Chitrakoot Division": ["Banda", "Hamirpur", "Fatehpur"],
    "Devi Patan Division": ["Gonda", "Balrampur", "Shravasti"],
    "Faizabad/Ayodhya Division": ["Ayodhya", "Sultanpur", "Amethi", "Ambedkar Nagar", "Bahraich", "Kaiserganj"],
    "Gorakhpur Division": ["Gorakhpur", "Maharajganj", "Bansgaon", "Deoria", "Kushinagar", "Salempur"],
    "Jhansi Division": ["Jhansi", "Jalaun", "Lalitpur"],
    "Kanpur Division": ["Kanpur", "Akbarpur", "Etawah", "Farrukhabad", "Kannauj", "Unnao"],
    "Lucknow Division": ["Lucknow", "Mohanlalganj", "Rae Bareli", "Sitapur", "Dhaurahra", "Misrikh", "Hardoi"],
    "Meerut Division": ["Meerut", "Baghpat", "Ghaziabad", "Gautam Buddha Nagar", "Hapur", "Bulandshahr", "Khurja"],
    "Mirzapur Division": ["Mirzapur", "Robertsganj", "Bhadohi", "Jaunpur", "Machhlishahr"],
    "Moradabad Division": ["Moradabad", "Rampur", "Sambhal", "Amroha"],
    "Saharanpur Division": ["Saharanpur", "Kairana", "Muzaffarnagar", "Bijnor", "Nagina"],
    "Varanasi Division": ["Varanasi", "Chandauli", "Ghazipur"],
  },
  phaseBreakdown: [
    { phase: 1, districts: "Western UP - Shamli, Muzaffarnagar, Meerut, Hapur, Ghaziabad, G.B.Nagar, Bulandshahr, Aligarh, Baghpat, Bijnor, Saharanpur", seats: 10, date: "April 19, 2024" },
    { phase: 2, districts: "Amroha, Moradabad, Rampur, Bareilly, Pilibhit, Shahjahanpur, Kheri, Hardoi, Sambhal, Badaun", seats: 8, date: "April 26, 2024" },
    { phase: 3, districts: "Hathras, Agra, Firozabad, Mainpuri, Etah, Kasganj, Etawah, Farrukhabad, Kannauj, Auraiya", seats: 10, date: "May 7, 2024" },
    { phase: 4, districts: "Lucknow, Sitapur, Rae Bareli, Unnao, Kanpur, Fatehpur, Banda, Hamirpur, Jhansi, Lalitpur, Jalaun", seats: 12, date: "May 13, 2024" },
    { phase: 5, districts: "Prayagraj, Pratapgarh, Barabanki, Sultanpur, Amethi, Gonda, Bahraich, Shravasti, Balrampur", seats: 12, date: "May 20, 2024" },
    { phase: 6, districts: "Ayodhya, Ambedkar Nagar, Basti, S.K.Nagar, Gorakhpur, Maharajganj, Deoria, Kushinagar, Ballia", seats: 14, date: "May 25, 2024" },
    { phase: 7, districts: "Varanasi, Chandauli, Mirzapur, Bhadohi, Jaunpur, Ghazipur, Azamgarh, Mau", seats: 14, date: "June 1, 2024" },
  ],
};

// Party colors for visualization
export const partyColors: Record<string, string> = {
  "BJP": "#FF6B00",
  "INC": "#19AAED",
  "TMC": "#00A651",
  "DMK": "#E40000",
  "TDP": "#FFED00",
  "JDU": "#003366",
  "YSRCP": "#318CE7",
  "AAP": "#0066B3",
  "SP": "#FF0000",
  "BSP": "#22409A",
  "NCP": "#004B87",
  "SHS": "#FF6600",
  "BJD": "#009933",
  "AIDMK": "#00FF00",
  "CPM": "#FF0000",
  "JMM": "#006400",
  "Others": "#888888",
};

// Lok Sabha 2024 Results Summary (top parties)
export const ls2024Results = [
  { party: "BJP", seats: 240, voteShare: 36.56, color: "#FF6B00" },
  { party: "INC", seats: 99, voteShare: 21.19, color: "#19AAED" },
  { party: "SP", seats: 37, voteShare: 4.54, color: "#FF0000" },
  { party: "TMC", seats: 29, voteShare: 4.46, color: "#00A651" },
  { party: "DMK", seats: 22, voteShare: 1.77, color: "#E40000" },
  { party: "TDP", seats: 16, voteShare: 1.67, color: "#FFED00" },
  { party: "JDU", seats: 12, voteShare: 1.31, color: "#003366" },
  { party: "YSRCP", seats: 4, voteShare: 2.09, color: "#318CE7" },
  { party: "Others", seats: 84, voteShare: 26.41, color: "#888888" },
];

export const ls2019Results = [
  { party: "BJP", seats: 303, voteShare: 37.36, color: "#FF6B00" },
  { party: "INC", seats: 52, voteShare: 19.49, color: "#19AAED" },
  { party: "DMK", seats: 23, voteShare: 1.79, color: "#E40000" },
  { party: "TMC", seats: 22, voteShare: 4.07, color: "#00A651" },
  { party: "YSRCP", seats: 22, voteShare: 2.53, color: "#318CE7" },
  { party: "SHS", seats: 18, voteShare: 2.10, color: "#FF6600" },
  { party: "JDU", seats: 16, voteShare: 1.46, color: "#003366" },
  { party: "BJD", seats: 12, voteShare: 1.66, color: "#009933" },
  { party: "Others", seats: 75, voteShare: 29.54, color: "#888888" },
];

export const quickStats = {
  totalVoters: "97 Cr+",
  totalBooths: "10.5 L+",
  totalLSSeats: 543,
  totalStates: 28,
  totalUTs: 8,
  totalVSSeats: "4,120+",
  avgDuration: "45 days",
  totalPhases2024: 7,
};
