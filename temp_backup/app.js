(function(){
'use strict';
const D=ELECTION_DATA, $=id=>document.getElementById(id);
let topic='general',lang='en',history=JSON.parse(localStorage.getItem('vb_h')||'[]'),theme=localStorage.getItem('vb_t')||'dark';
const els={chat:$('chat-container'),msgs:$('messages-container'),welcome:$('welcome-card'),input:$('user-input'),send:$('btn-send'),clear:$('btn-clear-chat'),theme:$('btn-theme-toggle'),lang:$('btn-lang-toggle'),ctxTag:$('input-context-tag'),ctxText:$('context-tag-text'),ctxRm:$('context-tag-remove'),pills:$('pill-nav'),topics:$('quick-topics')};

function init(){
  setTheme(theme);animateStats();buildTopics();bindEvents();
  if(history.length){els.welcome.style.display='none';history.forEach(m=>render(m.r,m.c,false));scroll();}
}
function setTheme(t){document.documentElement.setAttribute('data-theme',t);theme=t;localStorage.setItem('vb_t',t);}
function setLang(l){
  lang=l;
  const s=D.i18n[l];
  document.querySelectorAll('[data-i18n]').forEach(e=>{const k=e.dataset.i18n;if(s[k])e.textContent=s[k];});
  document.querySelectorAll('[data-i18n-placeholder]').forEach(e=>{const k=e.dataset.i18nPlaceholder;if(s[k])e.placeholder=s[k];});
  els.lang.querySelector('.lang-label').textContent=l==='en'?'EN':'हि';
  els.lang.classList.toggle('active-hi',l==='hi');
  buildTopics();
}
function animateStats(){
  document.querySelectorAll('.stat-number').forEach(e=>{
    const t=+e.dataset.count;let c=0;const s=Math.max(1,Math.floor(t/35));
    const i=setInterval(()=>{c+=s;if(c>=t){c=t;clearInterval(i);}e.textContent=c.toLocaleString();},30);
  });
}
function buildTopics(){
  const cats=[['elections','cat_elections','📊'],['states','cat_states','🗺️'],['boothVoting','cat_booth','🏢'],['rulesReg','cat_rules','⚖️']];
  const s=D.i18n[lang];let h='';
  const filterMap={general:null,'election-process':'elections',timelines:'elections','voting-rules':'boothVoting','booth-details':'boothVoting','state-details':'states','eci-rules':'rulesReg','voter-registration':'rulesReg'};
  const activeFilter=filterMap[topic];
  cats.forEach(([key,labelKey,icon])=>{
    if(activeFilter&&activeFilter!==key)return;
    const items=D.quickTopics[key];if(!items)return;
    h+=`<div class="topic-section"><div class="topic-section-title">${icon} ${s[labelKey]||labelKey}</div><div class="topic-grid">`;
    items.forEach(t=>{h+=`<button class="topic-btn" data-query="${t.query}"><span class="ti">${t.icon}</span><span>${lang==='hi'?t.labelHi:t.label}</span></button>`;});
    h+=`</div></div>`;
  });
  els.topics.innerHTML=h;
  els.topics.querySelectorAll('.topic-btn').forEach(b=>b.addEventListener('click',()=>{els.input.value=b.dataset.query;send();}));
}
function bindEvents(){
  els.send.addEventListener('click',send);
  els.input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}});
  els.input.addEventListener('input',()=>{els.input.style.height='auto';els.input.style.height=Math.min(els.input.scrollHeight,120)+'px';});
  els.clear.addEventListener('click',()=>{if(!confirm('Clear conversation?'))return;history=[];localStorage.removeItem('vb_h');els.msgs.innerHTML='';els.welcome.style.display='block';});
  els.theme.addEventListener('click',()=>setTheme(theme==='dark'?'light':'dark'));
  els.lang.addEventListener('click',()=>setLang(lang==='en'?'hi':'en'));
  els.ctxRm.addEventListener('click',()=>{topic='general';els.ctxTag.style.display='none';document.querySelectorAll('.pill').forEach(p=>p.classList.remove('active'));document.querySelector('[data-topic="general"]').classList.add('active');buildTopics();});
  els.pills.addEventListener('click',e=>{
    const p=e.target.closest('.pill');if(!p)return;
    document.querySelectorAll('.pill').forEach(x=>x.classList.remove('active'));p.classList.add('active');
    topic=p.dataset.topic;
    if(topic!=='general'){els.ctxTag.style.display='inline-flex';els.ctxText.textContent=p.querySelector('span').textContent;}else{els.ctxTag.style.display='none';}
    buildTopics();
    if(topic!=='general'){els.welcome.style.display='none';showSkeleton();setTimeout(()=>{rmSkeleton();const r=topicOverview(topic);render('bot',r);history.push({r:'bot',c:r});save();scroll();},700);}
  });
}
function send(){
  const t=els.input.value.trim();if(!t)return;
  els.welcome.style.display='none';render('user',t);history.push({r:'user',c:t});save();
  els.input.value='';els.input.style.height='auto';
  showSkeleton();
  setTimeout(()=>{rmSkeleton();const r=respond(t);render('bot',r);history.push({r:'bot',c:r});save();scroll();},500+Math.random()*600);
}
function render(role,content,anim=true){
  const d=document.createElement('div');d.className=`message ${role}-message`;if(!anim)d.style.animation='none';
  const av=role==='user'?'👤':'🗳️';
  let extra='';
  if(role==='bot'){
    extra=`<div class="msg-actions"><button class="msg-action-btn btn-copy" onclick="copyMsg(this)">📋 Copy</button></div>`;
    const fu=getFollowups(content);
    if(fu.length)extra+=`<div class="followup-chips">${fu.map(f=>`<button class="followup-chip" onclick="document.getElementById('user-input').value='${f.replace(/'/g,"\\'")}';document.getElementById('btn-send').click();">${f}</button>`).join('')}</div>`;
    extra+=`<div class="msg-sources">📚 Source: Election Commission of India (ECI) Official Guidelines</div>`;
  }
  d.innerHTML=`<div class="message-avatar">${av}</div><div class="message-content">${content}${extra}</div>`;
  els.msgs.appendChild(d);if(anim)scroll();
}
function showSkeleton(){
  const d=document.createElement('div');d.className='message bot-message';d.id='skel';
  d.innerHTML=`<div class="message-avatar">🗳️</div><div class="message-content skeleton"><div class="skeleton-line"></div><div class="skeleton-line"></div><div class="skeleton-line short"></div></div>`;
  els.msgs.appendChild(d);scroll();
}
function rmSkeleton(){const s=$('skel');if(s)s.remove();}
function save(){localStorage.setItem('vb_h',JSON.stringify(history.slice(-50)));}
function scroll(){els.chat.scrollTop=els.chat.scrollHeight;}
function getFollowups(c){
  const all=[["What is NOTA?","How does EVM work?","Tell me about VVPAT"],["Show all state details","UP election deep dive","How to register as voter?"],["What are polling booth rules?","Explain Model Code of Conduct","Election expenditure limits"],["Candidate eligibility criteria","Polling agent rights","Election day do's and don'ts"],["How to find my polling booth?","What is Form 6?","Difference Lok Sabha vs Vidhan Sabha"]];
  return all[Math.floor(Math.random()*all.length)];
}

// --- Response Engine ---
function respond(q){
  const lo=q.toLowerCase();
  // State card shortcut
  if(lo.startsWith('state:')){const name=q.substring(6);return stateCard(name);}
  if(/up election deep dive|up deep dive/i.test(lo))return upDeep();
  if(/find.*booth|booth.*find|locate.*booth|अपना बूथ/i.test(lo))return boothLocator();
  if(/polling agent/i.test(lo))return pollingAgents();
  if(/do.*don.*t|dos and don/i.test(lo))return electionDayDD();
  if(/lok sabha.*vidhan|vidhan.*lok sabha|difference.*lok|difference.*ls/i.test(lo))return lsVsVs();
  // Topic routing
  let t=topic;
  if(t==='general'){
    if(/process|step|procedure|प्रक्रिया/i.test(lo))t='election-process';
    else if(/timeline|schedule|phase|date|कार्यक्रम/i.test(lo))t='timelines';
    else if(/voting rule|who can vote|eligible|पात्र/i.test(lo))t='voting-rules';
    else if(/booth|blo|sector|presiding|बूथ/i.test(lo))t='booth-details';
    else if(/state|ut|union|seat|district|राज्य/i.test(lo))t='state-details';
    else if(/eci|commission|mcc|code|evm|vvpat|observer|expenditure|campaign|paid news|nomination|आयोग|नामांकन/i.test(lo))t='eci-rules';
    else if(/regist|form 6|form 7|form 8|epic|voter id|helpline|1950|पंजीकरण/i.test(lo))t='voter-registration';
  }
  // Check specific state
  const st=D.states.find(s=>lo.includes(s.name.toLowerCase()));
  if(st)return stateCard(st.name);
  return topicOverview(t,lo);
}

function topicOverview(t,q=''){
  const hi=lang==='hi';
  switch(t){
  case 'election-process':return electionProcess();
  case 'timelines':return timelines();
  case 'voting-rules':return votingRules();
  case 'booth-details':
    if(q&&/blo/i.test(q))return officialDetail('blo');
    if(q&&/sector/i.test(q))return officialDetail('sectorOfficer');
    if(q&&/presiding/i.test(q))return officialDetail('presidingOfficer');
    return boothDetails();
  case 'state-details':return allStates();
  case 'eci-rules':
    if(q&&/mcc|model code|आचार/i.test(q))return eciSection('mcc');
    if(q&&/nomination|scrutiny|नामांकन/i.test(q))return eciSection('nomination');
    if(q&&/campaign|प्रचार/i.test(q))return eciSection('campaign');
    if(q&&/expenditure|खर्च/i.test(q))return eciSection('expenditure');
    if(q&&/evm|vvpat|ईवीएम/i.test(q))return eciSection('evmVvpat');
    if(q&&/observer/i.test(q))return eciSection('observers');
    if(q&&/paid news/i.test(q))return eciSection('paidNews');
    return eciOverview();
  case 'voter-registration':
    if(q&&/form.?6|new.*regist/i.test(q))return regSection('form6');
    if(q&&/form.?7|delet/i.test(q))return regSection('form7');
    if(q&&/form.?8|correct/i.test(q))return regSection('form8');
    if(q&&/epic|voter.*id/i.test(q))return regSection('epic');
    if(q&&/helpline|1950/i.test(q))return regSection('helpline');
    return regOverview();
  default:return generalHelp();
  }
}

function h3(t){return `<h3>${t}</h3>`;}
function hi(t){return lang==='hi'?`<p class="hindi-text">${t}</p>`:''; }
function ic(t){return `<div class="info-card">${t}</div>`;}
function ul(arr,prefix=''){return '<ul>'+arr.map(a=>`<li>${prefix}${a}</li>`).join('')+'</ul>';}
function tbl(headers,rows){
  let h='<table><tr>'+headers.map(x=>`<th>${x}</th>`).join('')+'</tr>';
  rows.forEach(r=>{h+='<tr>'+r.map(c=>`<td>${c}</td>`).join('')+'</tr>';});
  return h+'</table>';
}

function stateCard(name){
  const s=D.states.find(x=>x.name.toLowerCase()===name.toLowerCase());
  if(!s)return h3('State Not Found')+'<p>Please check the state name.</p>';
  return `<div class="state-card"><div class="state-card-header"><h3>${s.name}</h3><span class="badge">${s.type}</span></div><div class="state-card-grid">
  <div class="state-card-item"><div class="label">Capital</div><div class="value">${s.capital}</div></div>
  <div class="state-card-item"><div class="label">Lok Sabha Seats</div><div class="value">${s.loksabha}</div></div>
  <div class="state-card-item"><div class="label">Vidhan Sabha Seats</div><div class="value">${s.vidhansabha||'N/A'}</div></div>
  <div class="state-card-item"><div class="label">Districts</div><div class="value">${s.districts}</div></div>
  <div class="state-card-item"><div class="label">Registered Voters</div><div class="value">${s.approxVoters}</div></div>
  <div class="state-card-item"><div class="label">Election Phases</div><div class="value">${s.phases}</div></div>
  <div class="state-card-item"><div class="label">Last Election Winner</div><div class="value">${s.lastWinner}</div></div>
  <div class="state-card-item"><div class="label">Chief Minister / Head</div><div class="value">${s.cm}</div></div>
  </div></div>`+hi(`${s.name} में ${s.loksabha} लोकसभा और ${s.vidhansabha||0} विधानसभा सीटें हैं।`);
}

function upDeep(){
  const u=D.upDeepDive;let h=`<h3>🏛️ Uttar Pradesh — Deep Dive</h3>`;
  h+=`<div class="state-card"><div class="state-card-header"><h3>Uttar Pradesh</h3><span class="badge">Largest State by LS Seats</span></div><div class="state-card-grid">
  <div class="state-card-item"><div class="label">Lok Sabha Seats</div><div class="value">${u.totalLS}</div></div>
  <div class="state-card-item"><div class="label">Vidhan Sabha Seats</div><div class="value">${u.totalVS}</div></div>
  <div class="state-card-item"><div class="label">Total Booths</div><div class="value">${u.totalBooths}</div></div>
  <div class="state-card-item"><div class="label">Total Voters</div><div class="value">${u.totalVoters}</div></div>
  </div></div>`;
  h+=`<h4>📌 80 Lok Sabha Constituencies by Division</h4>`;
  Object.entries(u.divisions).forEach(([div,seats])=>{h+=`<strong>${div}:</strong> ${seats.join(', ')}<br>`;});
  h+=`<h4>📅 7-Phase Breakdown</h4>`;
  h+=tbl(['Phase','Districts','Seats'],u.phaseBreakdown.map(p=>[p.phase,p.districts,p.seats]));
  h+=hi('उत्तर प्रदेश में 80 लोकसभा और 403 विधानसभा सीटें हैं। 7 चरणों में ~15.2 करोड़ मतदाता मतदान करते हैं।');
  return h;
}

function boothLocator(){
  let h=h3('📍 How to Find Your Polling Booth');
  D.boothRules.boothLocator.methods.forEach(m=>{
    h+=`<h4>${m.icon} ${m.title}</h4><ol>`;
    m.steps.forEach(s=>{h+=`<li>${s}</li>`;});h+=`</ol>`;
  });
  h+=ic('📞 <strong>Helpline 1950</strong> is toll-free and available 24/7 during election season.');
  h+=hi('अपना मतदान केंद्र खोजने के लिए voterportal.eci.gov.in पर जाएं या 1950 पर कॉल करें।');
  return h;
}

function pollingAgents(){
  let h=h3('👥 Polling Agent Rights');
  h+=ul(D.eciRules.pollingAgentRights);
  h+=ic('Polling agents are appointed by candidates and play a crucial role in ensuring fair elections.');
  h+=hi('पोलिंग एजेंट उम्मीदवारों द्वारा नियुक्त किए जाते हैं और निष्पक्ष चुनाव सुनिश्चित करने में महत्वपूर्ण भूमिका निभाते हैं।');
  return h;
}

function electionDayDD(){
  let h=h3("✅ Election Day Do's & Don'ts");
  h+=`<h4>✅ Do's</h4>`+ul(D.eciRules.electionDayDos,'✅ ');
  h+=`<h4>❌ Don'ts</h4>`+ul(D.eciRules.electionDayDonts,'❌ ');
  h+=hi('मतदान दिवस पर वैध पहचान पत्र लेकर जाएं। मोबाइल फोन बूथ के अंदर न ले जाएं।');
  return h;
}

function lsVsVs(){
  let h=h3('🏛️ Lok Sabha vs Vidhan Sabha');
  h+=tbl(['Feature','Lok Sabha','Vidhan Sabha'],[
    ['Level','National (Central)','State'],
    ['Total Seats','543','Varies by state'],
    ['Term','5 years','5 years'],
    ['Head','Prime Minister','Chief Minister'],
    ['Min Age','25 years','25 years'],
    ['Deposit','₹25,000 / ₹12,500 SC-ST','₹10,000 / ₹5,000 SC-ST'],
    ['Elected by','Voters of parliamentary constituency','Voters of assembly constituency'],
    ['Presided by','Speaker','Speaker']
  ]);
  h+=hi('लोकसभा केंद्रीय संसद है (543 सीटें), जबकि विधानसभा राज्य विधायिका है।');
  return h;
}

function electionProcess(){
  let h=h3('📋 Indian Election Process — 10 Steps');
  h+='<ol>';D.electionProcess.forEach(s=>{h+=`<li><strong>${lang==='hi'?s.titleHi:s.title}</strong> — ${s.desc}</li>`;});h+='</ol>';
  h+=ic('💡 India uses <strong>First Past The Post (FPTP)</strong> — candidate with most votes wins.');
  h+=hi('भारत में FPTP प्रणाली — सबसे अधिक मत पाने वाला उम्मीदवार विजयी।');
  return h;
}

function timelines(){
  let h=h3('📅 Election Timelines');
  h+=tbl(['Event','Timeline'],[
    ['ECI Announcement','45-60 days before first poll'],['MCC Enforcement','Immediately upon announcement'],
    ['Nominations','~7 days window'],['Scrutiny','1 day after nomination deadline'],
    ['Withdrawal','2 days after scrutiny'],['Campaign Period','~2-3 weeks (ends 48 hrs before poll)'],
    ['Silence Period','48 hours before polling'],['Polling','7 AM to 6 PM'],['Counting','3-4 days after last phase']
  ]);
  h+=ic('📌 Large states like UP (7 phases), WB, Bihar have staggered polling for security.');
  h+=hi('बड़े राज्यों में चरणबद्ध मतदान होता है ताकि सुरक्षा बलों की तैनाती हो सके।');
  return h;
}

function votingRules(){
  let h=h3('⚖️ Voting Rules & Eligibility');
  h+=`<h4>Who Can Vote?</h4>`+ul(['Indian citizen, 18+ years on qualifying date','Registered in electoral roll','Not disqualified under any law','Must carry valid ID (EPIC or 12 alternatives)']);
  h+=`<h4>At the Booth</h4>`+ul(['Identity verified → ink on left index finger','Sign Form 17A','Presiding Officer enables ballot','Press button for chosen candidate','VVPAT shows slip for 7 seconds','Beep confirms vote']);
  h+=`<h4>Special Provisions</h4>`+ul(['<strong>Postal Ballot:</strong> service voters, 80+, PwD','<strong>NOTA:</strong> "None of the Above" available','<strong>Tender Vote:</strong> if someone voted in your name','<strong>Companion:</strong> blind/infirm voters can bring help']);
  h+=hi('18+ आयु का प्रत्येक पंजीकृत भारतीय नागरिक मतदान कर सकता है। NOTA उपलब्ध है।');
  return h;
}

function boothDetails(){
  const B=D.boothRules;let h=h3('🏢 Polling Booth Details');
  h+=ic('👥 <strong>Voter Limit:</strong> '+B.voterLimit);
  h+=`<h4>Mandatory Facilities</h4>`+ul(B.mandatoryFacilities,'✅ ');
  h+=`<h4>Location Criteria</h4>`+ul(B.locationCriteria,'📍 ');
  h+=`<h4>Key Officials</h4>`+ul([`<strong>${B.officials.blo.title}</strong> — ~1000-1500 voters`,`<strong>${B.officials.sectorOfficer.title}</strong> — 10-15 booths`,`<strong>${B.officials.presidingOfficer.title}</strong> — in-charge of booth`]);
  h+=hi('प्रत्येक बूथ पर अधिकतम 1500 मतदाता, रैंप, पानी, छाया, VVPAT अनिवार्य।');
  return h;
}

function officialDetail(key){
  const o=D.boothRules.officials[key];
  return h3('👤 '+o.title)+ul(o.duties);
}

function allStates(){
  let h=h3('🗺️ All States & UTs');
  h+='<p>'+D.states.length+' entities:</p>';
  h+=tbl(['Name','Type','LS','VS','Dist.','Voters','CM'],D.states.map(s=>[s.name,s.type,s.loksabha,s.vidhansabha||'-',s.districts,s.approxVoters,s.cm]));
  h+=ic('📊 Total: 543 LS seats. UP (80) > Maharashtra (48) > WB (42).');
  h+=hi('भारत में 543 लोकसभा सीटें। UP में सबसे अधिक 80।');
  return h;
}

function eciSection(key){
  const s=D.eciRules[key];
  let h=h3('🛡️ '+s.title);
  const arr=s.points||s.details||s.rules||s.types;
  h+=ul(arr);
  if(key==='expenditure'){h+=ic(`💰 <strong>LS:</strong> ${s.lokSabha}<br>💰 <strong>VS:</strong> ${s.vidhanSabha}`);}
  h+=hi('भारत निर्वाचन आयोग स्वतंत्र और निष्पक्ष चुनाव सुनिश्चित करता है।');
  return h;
}

function eciOverview(){
  const E=D.eciRules;let h=h3('🛡️ ECI Rules Overview');
  h+=ul([
    `<strong>Model Code of Conduct</strong> — ${E.mcc.points.length} guidelines`,
    '<strong>Nomination Process</strong> — eligibility, deposits, affidavits',
    '<strong>Campaign Rules</strong> — 48-hr silence, permissions',
    `<strong>Expenditure</strong> — LS: ${E.expenditure.lokSabha}`,
    '<strong>EVM & VVPAT</strong> — standalone, paper audit',
    '<strong>Observers</strong> — General, Expenditure, Police, Micro',
    '<strong>Paid News</strong> — MCMC monitoring'
  ]);
  h+=ic('💡 Click a specific topic above for detailed information!');
  h+=hi('ECI स्वतंत्र और निष्पक्ष चुनाव के लिए व्यापक नियम लागू करता है।');
  return h;
}

function regSection(key){
  const s=D.voterRegistration[key];
  return h3('📝 '+s.title)+ul(s.details)+hi('NVSP पोर्टल: voters.eci.gov.in | हेल्पलाइन: 1950');
}

function regOverview(){
  const V=D.voterRegistration;let h=h3('📝 Voter Registration Guide');
  ['form6','form7','form8','epic','helpline'].forEach(k=>{h+=`<h4>${V[k].title}</h4><p>${V[k].details[0]}</p>`;});
  h+=ic('📞 <strong>Helpline 1950</strong> | 🌐 voters.eci.gov.in | 📱 Voter Helpline App');
  h+=hi('मतदाता पंजीकरण के लिए NVSP पोर्टल पर जाएं या 1950 पर कॉल करें।');
  return h;
}

function generalHelp(){
  let h=h3('🇮🇳 India Election Assistant');
  h+='<p>I can help with:</p>'+ul([
    '<strong>Election Process</strong> — 10-step journey','<strong>Timelines</strong> — dates, phases, durations',
    '<strong>Voting Rules</strong> — eligibility, procedures','<strong>Booth Details</strong> — 1500 limit, facilities, officials',
    '<strong>State Details</strong> — all 28 states + 8 UTs','<strong>ECI Rules</strong> — MCC, EVM, observers',
    '<strong>Voter Registration</strong> — Forms, EPIC, Helpline'
  ]);
  h+=ic('💡 Click topic pills above or type your question in English or Hindi!');
  h+=hi('ऊपर विषय बटन पर क्लिक करें या हिंदी/अंग्रेजी में प्रश्न पूछें!');
  return h;
}

// Global copy function
window.copyMsg=function(btn){
  const txt=btn.closest('.message-content').innerText;
  navigator.clipboard.writeText(txt).then(()=>{btn.textContent='✅ Copied!';setTimeout(()=>{btn.textContent='📋 Copy';},1500);});
};

document.addEventListener('DOMContentLoaded',init);
})();
