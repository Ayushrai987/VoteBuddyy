const ELECTION_DATA={
states:[
{name:"Andhra Pradesh",capital:"Amaravati",type:"State",loksabha:25,vidhansabha:175,districts:26,approxVoters:"3.9 Cr",phases:1,lastElection:"2024",lastWinner:"TDP+ (NDA)",cm:"N. Chandrababu Naidu"},
{name:"Arunachal Pradesh",capital:"Itanagar",type:"State",loksabha:2,vidhansabha:60,districts:26,approxVoters:"8.5 L",phases:1,lastElection:"2024",lastWinner:"BJP",cm:"Pema Khandu"},
{name:"Assam",capital:"Dispur",type:"State",loksabha:14,vidhansabha:126,districts:35,approxVoters:"2.4 Cr",phases:3,lastElection:"2024",lastWinner:"BJP+ (NDA)",cm:"Himanta Biswa Sarma"},
{name:"Bihar",capital:"Patna",type:"State",loksabha:40,vidhansabha:243,districts:38,approxVoters:"7.3 Cr",phases:7,lastElection:"2024",lastWinner:"NDA",cm:"Nitish Kumar"},
{name:"Chhattisgarh",capital:"Raipur",type:"State",loksabha:11,vidhansabha:90,districts:33,approxVoters:"2.0 Cr",phases:2,lastElection:"2024",lastWinner:"BJP",cm:"Vishnu Deo Sai"},
{name:"Goa",capital:"Panaji",type:"State",loksabha:2,vidhansabha:40,districts:2,approxVoters:"11.5 L",phases:1,lastElection:"2024",lastWinner:"BJP",cm:"Pramod Sawant"},
{name:"Gujarat",capital:"Gandhinagar",type:"State",loksabha:26,vidhansabha:182,districts:33,approxVoters:"4.7 Cr",phases:1,lastElection:"2024",lastWinner:"BJP",cm:"Bhupendra Patel"},
{name:"Haryana",capital:"Chandigarh",type:"State",loksabha:10,vidhansabha:90,districts:22,approxVoters:"1.9 Cr",phases:1,lastElection:"2024",lastWinner:"BJP",cm:"Nayab Singh Saini"},
{name:"Himachal Pradesh",capital:"Shimla",type:"State",loksabha:4,vidhansabha:68,districts:12,approxVoters:"53 L",phases:1,lastElection:"2024",lastWinner:"BJP",cm:"Sukhvinder Singh Sukhu"},
{name:"Jharkhand",capital:"Ranchi",type:"State",loksabha:14,vidhansabha:81,districts:24,approxVoters:"2.3 Cr",phases:4,lastElection:"2024",lastWinner:"JMM+ (INDIA)",cm:"Hemant Soren"},
{name:"Karnataka",capital:"Bengaluru",type:"State",loksabha:28,vidhansabha:224,districts:31,approxVoters:"5.3 Cr",phases:1,lastElection:"2024",lastWinner:"NDA",cm:"Siddaramaiah"},
{name:"Kerala",capital:"Thiruvananthapuram",type:"State",loksabha:20,vidhansabha:140,districts:14,approxVoters:"2.7 Cr",phases:1,lastElection:"2024",lastWinner:"UDF",cm:"Pinarayi Vijayan"},
{name:"Madhya Pradesh",capital:"Bhopal",type:"State",loksabha:29,vidhansabha:230,districts:55,approxVoters:"5.1 Cr",phases:1,lastElection:"2024",lastWinner:"BJP",cm:"Mohan Yadav"},
{name:"Maharashtra",capital:"Mumbai",type:"State",loksabha:48,vidhansabha:288,districts:36,approxVoters:"9.2 Cr",phases:1,lastElection:"2024",lastWinner:"Mahayuti (NDA)",cm:"Devendra Fadnavis"},
{name:"Manipur",capital:"Imphal",type:"State",loksabha:2,vidhansabha:60,districts:16,approxVoters:"20 L",phases:2,lastElection:"2024",lastWinner:"BJP",cm:"N. Biren Singh"},
{name:"Meghalaya",capital:"Shillong",type:"State",loksabha:2,vidhansabha:60,districts:12,approxVoters:"19 L",phases:1,lastElection:"2024",lastWinner:"NPP",cm:"Conrad Sangma"},
{name:"Mizoram",capital:"Aizawl",type:"State",loksabha:1,vidhansabha:40,districts:11,approxVoters:"8 L",phases:1,lastElection:"2024",lastWinner:"ZPM",cm:"Lalduhoma"},
{name:"Nagaland",capital:"Kohima",type:"State",loksabha:1,vidhansabha:60,districts:16,approxVoters:"13 L",phases:1,lastElection:"2024",lastWinner:"NDPP-BJP",cm:"Neiphiu Rio"},
{name:"Odisha",capital:"Bhubaneswar",type:"State",loksabha:21,vidhansabha:147,districts:30,approxVoters:"3.3 Cr",phases:4,lastElection:"2024",lastWinner:"BJP",cm:"Mohan Charan Majhi"},
{name:"Punjab",capital:"Chandigarh",type:"State",loksabha:13,vidhansabha:117,districts:23,approxVoters:"2.1 Cr",phases:1,lastElection:"2024",lastWinner:"INC",cm:"Bhagwant Mann"},
{name:"Rajasthan",capital:"Jaipur",type:"State",loksabha:25,vidhansabha:200,districts:50,approxVoters:"5.0 Cr",phases:1,lastElection:"2024",lastWinner:"BJP",cm:"Bhajan Lal Sharma"},
{name:"Sikkim",capital:"Gangtok",type:"State",loksabha:1,vidhansabha:32,districts:6,approxVoters:"4.5 L",phases:1,lastElection:"2024",lastWinner:"SKM",cm:"Prem Singh Tamang"},
{name:"Tamil Nadu",capital:"Chennai",type:"State",loksabha:39,vidhansabha:234,districts:38,approxVoters:"6.2 Cr",phases:1,lastElection:"2024",lastWinner:"DMK+ (INDIA)",cm:"M.K. Stalin"},
{name:"Telangana",capital:"Hyderabad",type:"State",loksabha:17,vidhansabha:119,districts:33,approxVoters:"3.1 Cr",phases:1,lastElection:"2024",lastWinner:"INC",cm:"A. Revanth Reddy"},
{name:"Tripura",capital:"Agartala",type:"State",loksabha:2,vidhansabha:60,districts:8,approxVoters:"27 L",phases:1,lastElection:"2024",lastWinner:"BJP",cm:"Manik Saha"},
{name:"Uttar Pradesh",capital:"Lucknow",type:"State",loksabha:80,vidhansabha:403,districts:75,approxVoters:"15.2 Cr",phases:7,lastElection:"2024",lastWinner:"BJP+ (NDA)",cm:"Yogi Adityanath"},
{name:"Uttarakhand",capital:"Dehradun",type:"State",loksabha:5,vidhansabha:70,districts:13,approxVoters:"78 L",phases:1,lastElection:"2024",lastWinner:"BJP",cm:"Pushkar Singh Dhami"},
{name:"West Bengal",capital:"Kolkata",type:"State",loksabha:42,vidhansabha:294,districts:23,approxVoters:"7.3 Cr",phases:7,lastElection:"2024",lastWinner:"TMC",cm:"Mamata Banerjee"},
{name:"Andaman & Nicobar",capital:"Port Blair",type:"UT",loksabha:1,vidhansabha:0,districts:3,approxVoters:"3 L",phases:1,lastElection:"2024",lastWinner:"BJP",cm:"Lt. Governor"},
{name:"Chandigarh",capital:"Chandigarh",type:"UT",loksabha:1,vidhansabha:0,districts:1,approxVoters:"6.5 L",phases:1,lastElection:"2024",lastWinner:"BJP",cm:"Administrator"},
{name:"DNH & Daman Diu",capital:"Daman",type:"UT",loksabha:2,vidhansabha:0,districts:3,approxVoters:"4 L",phases:1,lastElection:"2024",lastWinner:"BJP",cm:"Administrator"},
{name:"Delhi",capital:"New Delhi",type:"UT",loksabha:7,vidhansabha:70,districts:11,approxVoters:"1.5 Cr",phases:1,lastElection:"2024",lastWinner:"BJP (LS)",cm:"Rekha Gupta"},
{name:"Jammu & Kashmir",capital:"Srinagar",type:"UT",loksabha:5,vidhansabha:90,districts:20,approxVoters:"76 L",phases:3,lastElection:"2024",lastWinner:"NC-INC",cm:"Omar Abdullah"},
{name:"Ladakh",capital:"Leh",type:"UT",loksabha:1,vidhansabha:0,districts:2,approxVoters:"1.8 L",phases:1,lastElection:"2024",lastWinner:"Independent",cm:"Lt. Governor"},
{name:"Lakshadweep",capital:"Kavaratti",type:"UT",loksabha:1,vidhansabha:0,districts:1,approxVoters:"55 K",phases:1,lastElection:"2024",lastWinner:"INC",cm:"Administrator"},
{name:"Puducherry",capital:"Puducherry",type:"UT",loksabha:1,vidhansabha:30,districts:4,approxVoters:"10 L",phases:1,lastElection:"2024",lastWinner:"NDA",cm:"N. Rangasamy"}
],

// UP Deep Dive
upDeepDive:{
totalLS:80,totalVS:403,totalBooths:"~1.74 Lakh",totalVoters:"~15.2 Crore",phases:7,
divisions:{
"Agra":["Agra","Fatehpur Sikri","Firozabad","Mainpuri","Mathura"],
"Prayagraj":["Prayagraj","Phulpur","Pratapgarh","Barabanki"],
"Azamgarh":["Azamgarh","Lalganj","Ghosi","Ballia"],
"Bareilly":["Bareilly","Pilibhit","Shahjahanpur","Badaun","Aonla"],
"Basti":["Basti","Sant Kabir Nagar","Khalilabad","Domariaganj"],
"Chitrakoot":["Banda","Hamirpur","Fatehpur"],
"Devipatan":["Gonda","Balrampur","Shravasti"],
"Ayodhya":["Ayodhya","Sultanpur","Amethi","Ambedkar Nagar","Bahraich","Kaiserganj"],
"Gorakhpur":["Gorakhpur","Maharajganj","Bansgaon","Deoria","Kushinagar","Salempur"],
"Jhansi":["Jhansi","Jalaun","Lalitpur"],
"Kanpur":["Kanpur","Akbarpur","Etawah","Farrukhabad","Kannauj","Unnao"],
"Lucknow":["Lucknow","Mohanlalganj","Rae Bareli","Sitapur","Dhaurahra","Misrikh","Hardoi"],
"Meerut":["Meerut","Baghpat","Ghaziabad","Gautam Buddha Nagar","Hapur","Bulandshahr","Khurja"],
"Mirzapur":["Mirzapur","Robertsganj","Bhadohi","Jaunpur","Machhlishahr"],
"Moradabad":["Moradabad","Rampur","Sambhal","Amroha"],
"Saharanpur":["Saharanpur","Kairana","Muzaffarnagar","Bijnor","Nagina"],
"Varanasi":["Varanasi","Chandauli","Ghazipur","Salempur"]
},
phaseBreakdown:[
{phase:1,districts:"Western UP — Shamli, Muzaffarnagar, Meerut, Hapur, Ghaziabad, G.B.Nagar, Bulandshahr, Aligarh, Baghpat, Bijnor, Saharanpur",seats:10},
{phase:2,districts:"Amroha, Moradabad, Rampur, Bareilly, Pilibhit, Shahjahanpur, Kheri, Hardoi, Sambhal, Badaun",seats:8},
{phase:3,districts:"Hathras, Agra, Firozabad, Mainpuri, Etah, Kasganj, Etawah, Farrukhabad, Kannauj, Auraiya, Budaun",seats:10},
{phase:4,districts:"Lucknow, Sitapur, Rae Bareli, Unnao, Kanpur, Fatehpur, Banda, Hamirpur, Jhansi, Lalitpur, Jalaun",seats:12},
{phase:5,districts:"Prayagraj, Pratapgarh, Barabanki, Sultanpur, Amethi, Amethi, Gonda, Bahraich, Shravasti, Balrampur",seats:12},
{phase:6,districts:"Ayodhya, Ambedkar Nagar, Basti, S.K.Nagar, Gorakhpur, Maharajganj, Deoria, Kushinagar, Ballia",seats:14},
{phase:7,districts:"Varanasi, Chandauli, Mirzapur, Bhadohi, Jaunpur, Ghazipur, Azamgarh, Mau",seats:14}
]
},

electionProcess:[
{step:1,title:"Announcement",titleHi:"चुनाव की घोषणा",desc:"ECI announces election schedule with dates for nomination, scrutiny, withdrawal, and polling."},
{step:2,title:"Model Code of Conduct",titleHi:"आदर्श आचार संहिता",desc:"MCC comes into effect immediately. All parties must follow strict guidelines."},
{step:3,title:"Filing Nominations",titleHi:"नामांकन दाखिल",desc:"Candidates file papers with Returning Officer. Deposit: ₹25,000 General / ₹12,500 SC-ST (LS)."},
{step:4,title:"Scrutiny",titleHi:"नामांकन जांच",desc:"Returning Officer verifies all nomination papers for eligibility and validity."},
{step:5,title:"Withdrawal",titleHi:"नामांकन वापसी",desc:"Candidates may withdraw nominations before the deadline."},
{step:6,title:"Campaigning",titleHi:"चुनाव प्रचार",desc:"Rallies, media campaigns, door-to-door. Must stop 48 hours before polling."},
{step:7,title:"Polling Day",titleHi:"मतदान दिवस",desc:"Voters cast votes via EVMs at designated booths. Typically 7 AM to 6 PM."},
{step:8,title:"Counting",titleHi:"मतगणना",desc:"Postal ballots counted first, then EVM votes at designated centers."},
{step:9,title:"Results",titleHi:"परिणाम घोषणा",desc:"Constituency-wise results declared. FPTP system — most votes wins."},
{step:10,title:"Government Formation",titleHi:"सरकार गठन",desc:"Majority party/coalition forms government."}
],

boothRules:{
voterLimit:"Maximum 1500 voters per polling booth. Auxiliary booth created if exceeded.",
mandatoryFacilities:["Ramp for disabled/elderly (wheelchair accessible)","Drinking water","Shade/shelter for queue","VVPAT with every EVM","Separate queue for women, 65+, PwD","Voter assistance booth","Toilet facility","Adequate lighting","First aid kit","Signage in local language"],
officials:{
blo:{title:"BLO (Booth Level Officer)",duties:["Door-to-door voter list verification","New voter registration help","Distributes voter slips","Updates Electoral Roll","Reports to ERO","Handles ~1000-1500 voters"]},
sectorOfficer:{title:"Sector Officer",duties:["Supervises 10-15 booths","Ensures material delivery/collection","Monitors polling, reports issues","Coordinates with Presiding Officers","Ensures mock poll completion","Reports to Returning Officer"]},
presidingOfficer:{title:"Presiding Officer",duties:["In-charge of polling booth","Conducts mock poll at 5:30 AM","Ensures free and fair polling","Handles Form 17A","Seals EVM after polling","Prepares vote account"]}
},
locationCriteria:["Government building (school, panchayat bhavan)","Within 2 km walking distance","Road accessible","Not a religious place","Not private property without permission","Adequate space per ECI specs","Proper security arrangements","Not near any party office"],
boothLocator:{
methods:[
{title:"ECI Voter Portal",icon:"🌐",steps:["Visit voterportal.eci.gov.in","Click 'Know Your Polling Station'","Enter EPIC number or Form details","View booth name, address, map"]},
{title:"Helpline 1950",icon:"📞",steps:["Call toll-free 1950","Select language","Provide EPIC number or name","Get booth details by phone"]},
{title:"SMS Lookup",icon:"💬",steps:["SMS 'EPIC <your number>' to 1950 or 166","Receive booth details via SMS","Works on any mobile phone"]},
{title:"Voter Helpline App",icon:"📱",steps:["Download from Play Store / App Store","Register with mobile number","Search polling station","Get GPS navigation to booth"]}
]}
},

eciRules:{
mcc:{title:"Model Code of Conduct",points:["No aggravation of caste/communal differences","Criticism limited to policies — no personal attacks","No appeal to caste/communal feelings","No government machinery for campaigning","No new project announcements after MCC","No official media for party propaganda","No campaign office within 200m of booth","All ads need MCMC pre-certification","No exit polls during polling period"]},
nomination:{title:"Nomination & Scrutiny",details:["Must be registered voter in any Indian constituency","Min age: 25 (LS/VS), 30 (RS/VP)","Deposit: ₹25K/₹12.5K SC-ST (LS); ₹10K/₹5K (VS)","Proposed by registered voter of constituency","Mandatory affidavit: criminal cases, assets, education","Max 4 nomination sets per candidate","Deposit forfeited if < 1/6th of valid votes"]},
campaign:{title:"Campaigning Rules",rules:["Campaign stops 48 hrs before polling","Loudspeakers: 6 AM - 10 PM only","No procession 24 hrs before polling","Prior permission for rallies","No liquor 48 hrs before & on poll day","No paid news — ads need certification","Social media under MCC","Campaign vehicles need permits","No property defacement without permission"]},
expenditure:{title:"Expenditure Limits",lokSabha:"₹95 Lakh (large) / ₹75 Lakh (small)",vidhanSabha:"₹40 Lakh (large) / ₹28 Lakh (small)",details:["Day-wise expenditure accounts mandatory","Submit to DEO within 30 days of result","Includes travel, accommodation, media","Party expenditure separate","Shadow observation by election observers"]},
evmVvpat:{title:"EVM & VVPAT",details:["Two units: Ballot Unit + Control Unit","Max 2000 votes, up to 384 candidates","VVPAT prints slip with name, symbol, serial number","7-second viewing window for voter","5 random VVPAT booths counted per constituency","Mock poll: min 50 votes before actual polling","EVMs fully standalone — no network","First Level Checking weeks before election","VVPAT count is final if discrepancy found"]},
observers:{title:"Election Observers",types:["General Observer — overall process","Expenditure Observer — tracks spending","Police Observer — security & law enforcement","Micro Observer — specific sensitive booths","All are IAS/IPS/IRS from outside state","Report directly to ECI"]},
paidNews:{title:"Paid News Guidelines",rules:["Treated as election expenditure","MCMC set up in each district","Must carry 'PAID ADVERTISEMENT' label","No political ads as editorial content","Social media ads: transparent funding","Violations lead to RPA disqualification"]},
pollingAgentRights:["One polling agent per candidate per booth","Can challenge voter identity","Can be present during mock poll","Can note EVM serial numbers","Can object to impersonation","Gets copy of Form 17C (voter account)","Cannot interfere with polling process"],
electionDayDos:["Carry valid voter ID","Check booth number beforehand","Reach booth before closing time","Verify VVPAT slip shows correct choice","Report issues to Presiding Officer"],
electionDayDonts:["Don't carry mobile phones inside booth","Don't wear party symbols/colors","Don't take selfies with EVM","Don't influence other voters","Don't carry weapons near booth"]
},

voterRegistration:{
form6:{title:"Form 6 — New Registration",details:["For citizens turning 18 by qualifying date","Online: voters.eci.gov.in / NVSP portal","Docs: age proof, address proof, passport photo","BLO verification after filing","Quarterly dates: Jan 1, Apr 1, Jul 1, Oct 1","Processing: 2-4 weeks after BLO visit"]},
form7:{title:"Form 7 — Deletion/Objection",details:["Request deletion or raise objection","For shifted, deceased, or duplicate entries","Any constituency voter can file","ERO gives 7 days notice before deletion","Keeps electoral rolls clean"]},
form8:{title:"Form 8 — Correction",details:["8A: Correct name, age, photo, address, gender","8B: Transposition within same constituency","Online via NVSP portal","BLO verification for address changes","No charges for corrections"]},
epic:{title:"EPIC — Voter ID Card",details:["Electors Photo Identity Card","Issued free by ECI","Contains: name, photo, DOB, address, EPIC number","e-EPIC downloadable from voters.eci.gov.in","12 alternative IDs accepted if no EPIC","Format: 3 letters + 7 digits (e.g. ABC1234567)"]},
helpline:{title:"Voter Helpline 1950",details:["Toll-free: 1950","Available in Hindi, English, regional languages","Services: status check, booth finder, complaints","Voter Helpline App (Android & iOS)","cVIGIL app for MCC violation reporting","NVSP portal: voters.eci.gov.in"]}
},

// Quick-access topics by category
quickTopics:{
elections:[
{icon:"📋",label:"Election Process Overview",labelHi:"चुनाव प्रक्रिया",query:"Explain the complete election process"},
{icon:"🏛️",label:"Lok Sabha vs Vidhan Sabha",labelHi:"लोकसभा बनाम विधानसभा",query:"Difference between Lok Sabha and Vidhan Sabha"},
{icon:"📅",label:"Election Phases & Dates",labelHi:"चुनाव चरण और तिथियां",query:"Election phases and schedule"},
{icon:"📄",label:"Nomination Process",labelHi:"नामांकन प्रक्रिया",query:"Explain the nomination process"}
],
states:[
{icon:"🏛️",label:"UP Election Details",labelHi:"उत्तर प्रदेश चुनाव",query:"UP election deep dive"},
{icon:"🌆",label:"Maharashtra",labelHi:"महाराष्ट्र",query:"state:Maharashtra"},
{icon:"🏯",label:"Bihar",labelHi:"बिहार",query:"state:Bihar"},
{icon:"🏜️",label:"Rajasthan",labelHi:"राजस्थान",query:"state:Rajasthan"},
{icon:"🛕",label:"Tamil Nadu",labelHi:"तमिल नाडु",query:"state:Tamil Nadu"},
{icon:"🌉",label:"West Bengal",labelHi:"पश्चिम बंगाल",query:"state:West Bengal"}
],
boothVoting:[
{icon:"🏢",label:"Booth Rules & Setup",labelHi:"बूथ नियम",query:"Polling booth rules and setup"},
{icon:"🖥️",label:"EVM & VVPAT",labelHi:"ईवीएम और वीवीपैट",query:"EVM and VVPAT working"},
{icon:"👥",label:"Polling Agent Rights",labelHi:"पोलिंग एजेंट अधिकार",query:"Polling agent rights"},
{icon:"✅",label:"Election Day Do's & Don'ts",labelHi:"मतदान दिवस क्या करें",query:"Election day dos and donts"},
{icon:"📍",label:"Find Your Booth",labelHi:"अपना बूथ खोजें",query:"How to find my polling booth"}
],
rulesReg:[
{icon:"⚖️",label:"Model Code of Conduct",labelHi:"आदर्श आचार संहिता",query:"Model Code of Conduct"},
{icon:"📝",label:"Voter Registration",labelHi:"मतदाता पंजीकरण",query:"How to register as a voter"},
{icon:"💰",label:"Expenditure Limits",labelHi:"खर्च सीमा",query:"Election expenditure limits"},
{icon:"🎓",label:"Candidate Eligibility",labelHi:"उम्मीदवार पात्रता",query:"Candidate eligibility criteria"}
]
},

// i18n
i18n:{
en:{tagline:"India Election Assistant • चुनाव सहायक",pill_all:"All Topics",pill_process:"Election Process",pill_timeline:"Timelines & Schedule",pill_voting:"Voting Rules",pill_booth:"Booth Details",pill_state:"State Details",pill_eci:"ECI Rules & Criteria",pill_voter:"Voter Registration",welcome_desc:"Your comprehensive India Election Assistant. Ask about elections, voting, states, booths, ECI rules, and registration.",input_placeholder:"Ask about Indian elections...",footer:"VoteBuddy provides information based on ECI guidelines. Verify with official sources.",stat_ls:"Lok Sabha Seats",stat_vs:"Vidhan Sabha Seats",stat_states:"States",stat_ut:"Union Territories",stat_voters:"Crore+ Voters",stat_booths:"Lakh+ Booths",stat_phases:"LS Phases",stat_duration:"Days Avg Duration",cat_elections:"Elections",cat_states:"States",cat_booth:"Booth & Voting",cat_rules:"Rules & Registration"},
hi:{tagline:"भारत चुनाव सहायक • Election Assistant",pill_all:"सभी विषय",pill_process:"चुनाव प्रक्रिया",pill_timeline:"समय-सारणी",pill_voting:"मतदान नियम",pill_booth:"बूथ विवरण",pill_state:"राज्य विवरण",pill_eci:"ECI नियम",pill_voter:"मतदाता पंजीकरण",welcome_desc:"भारतीय चुनाव सहायक — चुनाव, मतदान, राज्य, बूथ, ECI नियम और पंजीकरण के बारे में पूछें।",input_placeholder:"भारतीय चुनाव के बारे में पूछें...",footer:"VoteBuddy ECI दिशानिर्देशों पर आधारित जानकारी प्रदान करता है।",stat_ls:"लोकसभा सीटें",stat_vs:"विधानसभा सीटें",stat_states:"राज्य",stat_ut:"केंद्र शासित",stat_voters:"करोड़+ मतदाता",stat_booths:"लाख+ बूथ",stat_phases:"LS चरण",stat_duration:"दिन औसत अवधि",cat_elections:"चुनाव",cat_states:"राज्य",cat_booth:"बूथ और मतदान",cat_rules:"नियम और पंजीकरण"}
}
};
