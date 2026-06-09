const KEY="vds_study_hub_v1";
const defaultState=()=>({checklist:{},studied:{},flash:{},quiz:{best:0,last:0,taken:0},schedule:{},pretrip:{},theme:"light"});
let state=defaultState();
let memoryOnly=false;
function load(){
  try{
    const raw=localStorage.getItem(KEY);
    if(raw){state=Object.assign(defaultState(),JSON.parse(raw));}
  }catch(e){memoryOnly=true;}
}
function save(){
  if(memoryOnly)return;
  try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){memoryOnly=true;}
}
load();

/* =====================================================================
   PROGRESS COMPUTATIONS
   ===================================================================== */
function checklistStats(){
  let total=0,done=0;
  CHECKLIST.forEach((s,si)=>s.items.forEach((_,ii)=>{total++;if(state.checklist[si+"-"+ii])done++;}));
  return {total,done,pct:total?Math.round(done/total*100):0};
}
function studiedStats(){
  const total=STUDY_SECTIONS.length;
  const done=STUDY_SECTIONS.filter(s=>state.studied[s]).length;
  return {total,done,pct:total?Math.round(done/total*100):0};
}
function flashStats(){
  const total=DECKS.all.cards.length;
  const known=DECKS.all.cards.filter(c=>state.flash[c.id]==="known").length;
  return {total,known,pct:total?Math.round(known/total*100):0};
}
function quizStat(){return state.quiz.best||0;}
function overallReadiness(){
  const c=checklistStats().pct, s=studiedStats().pct, f=flashStats().pct, q=quizStat();
  // weighted: checklist 30, studied 25, flashcards 20, quiz best 25
  return Math.round(c*0.30 + s*0.25 + f*0.20 + q*0.25);
}
function daysToAssessment(){
  const now=new Date();
  const diff=ASSESSMENT_DATE-now;
  return Math.max(0,Math.ceil(diff/86400000));
}

/* =====================================================================
   NAV
   ===================================================================== */
const NAV=[
  {group:"Overview", items:[
    {id:"dashboard", label:"Dashboard", icon:'<path d="M3 13h8V3H3z"/><path d="M13 21h8V3h-8z"/><path d="M3 21h8v-5H3z"/>'},
    {id:"schedule", label:"Schedule & Countdown", icon:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'},
    {id:"checklist", label:"Self-Study Checklist", icon:'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>'},
  ]},
  {group:"Study material", items:[
    {id:"overview", label:"Program & MOC Overview", icon:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>', study:true},
    {id:"numbers", label:"Key Numbers", icon:'<path d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18"/>', study:true},
    {id:"hours", label:"Curriculum Hours", icon:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', study:true},
    {id:"modules", label:"The 10 Modules", icon:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>', study:true},
    {id:"assessments", label:"Six MV7604 Assessments", icon:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 15l2 2 4-4"/>', study:true},
    {id:"regulatory", label:"Regulatory Knowledge", icon:'<path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"/>', study:true},
    {id:"instructor", label:"Instructor Practical", icon:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>', study:true},
    {id:"errors", label:"Errors & Responses", icon:'<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.3 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.3a2 2 0 0 0-3.4 0z"/>', study:true},
  ]},
  {group:"Practice", items:[
    {id:"pretrip", label:"Pre-Trip Cheatsheet", icon:'<path d="M9 2h6a1 1 0 0 1 1 1v1h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2V3a1 1 0 0 1 1-1z"/><path d="M9 13l2 2 4-4"/>'},
    {id:"flashcards", label:"Flashcards", icon:'<rect x="2" y="6" width="20" height="13" rx="2"/><path d="M2 11h20"/>'},
    {id:"quiz", label:"Self-Test Quiz", icon:'<path d="M9.1 9a3 3 0 1 1 4 2.8c-.9.4-1.6 1.2-1.6 2.2v.5"/><path d="M12 18h.01"/><circle cx="12" cy="12" r="10"/>'},
    {id:"resources", label:"Resources", icon:'<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>'},
  ]},
];

/* =====================================================================
   ROUTER + RENDER
   ===================================================================== */
let current="dashboard";
const ICONS={
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  chevL:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
  chevR:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
  shuffle:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>',
};

function el(html){const t=document.createElement('template');t.innerHTML=html.trim();return t.content.firstChild;}

function renderNav(){
  const nav=document.getElementById('nav');
  nav.innerHTML='';
  NAV.forEach(g=>{
    nav.appendChild(el(`<div class="nav-group-label">${g.group}</div>`));
    g.items.forEach(it=>{
      const studied = it.study && state.studied[it.id];
      const node=el(`<div class="nav-item ${current===it.id?'active':''} ${studied?'studied':''}" data-id="${it.id}">
        <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${it.icon}</svg>
        <span>${it.label}</span><span class="done-dot"></span></div>`);
      node.addEventListener('click',()=>{go(it.id);closeSidebar();});
      nav.appendChild(node);
    });
  });
  // mini progress
  const r=overallReadiness();
  document.getElementById('mini-pct').textContent=r+"%";
  document.getElementById('mini-fill').style.width=r+"%";
}

function go(id){
  current=id;
  const label=NAV.flatMap(g=>g.items).find(i=>i.id===id)?.label||"Dashboard";
  document.getElementById('crumb').innerHTML='<b>'+label+'</b>';
  renderNav();
  const c=document.getElementById('content');
  c.scrollTop=0;window.scrollTo(0,0);
  c.innerHTML='';
  c.appendChild(VIEWS[id]());
}

/* ---------- Reusable bits ---------- */
function studiedBar(sectionId){
  const on=!!state.studied[sectionId];
  const bar=el(`<div class="studied-bar">
    <div class="txt"><b>${on?'Reviewed — nicely done.':'Finished reviewing this section?'}</b>
      <p>${on?'This counts toward your overall readiness. Toggle off to revisit.':'Mark it studied to track your progress on the dashboard.'}</p></div>
    <button class="btn ${on?'done':''}">${on?ICONS.check+' Studied':'Mark as studied'}</button></div>`);
  bar.querySelector('button').addEventListener('click',()=>{
    state.studied[sectionId]=!state.studied[sectionId];save();go(current);
  });
  return bar;
}

/* =====================================================================
   VIEWS
   ===================================================================== */
