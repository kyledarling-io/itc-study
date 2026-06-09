const VIEWS={};

VIEWS.dashboard=function(){
  const v=el('<div class="view"></div>');
  const cs=checklistStats(), ss=studiedStats(), fs=flashStats(), q=quizStat(), r=overallReadiness();
  const d=daysToAssessment();
  const C=2*Math.PI*46, off=C-(r/100)*C;

  v.appendChild(el(`<div class="hero">
    <div class="hero-left">
      <div class="hero-eyebrow">Valley Driving School · MELT Instructor</div>
      <h1>Welcome back, Kyle</h1>
      <p>MELT Orientation Course + Truck Instructor Practical · June 9–18, 2026 · Fraser Valley, BC · Trainer: Cindy (Kash on Jun 16)</p>
    </div>
    <div class="countdown">
      <div class="cd-box"><div class="n">${d}</div><div class="l">${d===1?'day':'days'} to<br>assessment</div></div>
    </div>
  </div>`));

  const grid=el('<div class="grid g2" style="margin-top:16px"></div>');
  // readiness ring card
  grid.appendChild(el(`<div class="card">
    <div class="ring-wrap">
      <div class="ring">
        <svg width="104" height="104" viewBox="0 0 104 104">
          <circle cx="52" cy="52" r="46" fill="none" stroke="var(--ring-track)" stroke-width="10"/>
          <circle cx="52" cy="52" r="46" fill="none" stroke="var(--accent)" stroke-width="10" stroke-linecap="round"
            stroke-dasharray="${C}" stroke-dashoffset="${off}" style="transition:stroke-dashoffset .8s ease"/>
        </svg>
        <div class="pct"><b>${r}%</b><span>Ready</span></div>
      </div>
      <div style="flex:1">
        <div style="font-family:var(--serif);font-size:18px;font-weight:600;margin-bottom:3px">Overall readiness</div>
        <div style="font-size:13px;color:var(--text-3);margin-bottom:12px">Blended across checklist, study, recall & quiz.</div>
        <div class="stat"><div class="k">Best quiz score</div><div class="v">${q}%</div></div>
      </div>
    </div>
  </div>`));
  // progress breakdown card
  grid.appendChild(el(`<div class="card">
    <div style="font-family:var(--serif);font-size:18px;font-weight:600;margin-bottom:14px">Your progress</div>
    <div class="progress-line"><div class="row"><span>Self-study checklist</span><span>${cs.done}/${cs.total}</span></div>
      <div class="bar accent"><span style="width:${cs.pct}%"></span></div></div>
    <div class="progress-line" style="margin-top:13px"><div class="row"><span>Sections reviewed</span><span>${ss.done}/${ss.total}</span></div>
      <div class="bar amber"><span style="width:${ss.pct}%"></span></div></div>
    <div class="progress-line" style="margin-top:13px"><div class="row"><span>Flashcards mastered</span><span>${fs.known}/${fs.total}</span></div>
      <div class="bar rose"><span style="width:${fs.pct}%"></span></div></div>
  </div>`));
  v.appendChild(grid);

  // today / next focus
  const today=todayScheduleIndex();
  if(today>-1){
    const day=SCHEDULE[today];
    const card=el(`<div class="card" style="margin-top:16px;border-left:3px solid var(--amber)">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
        <span class="pill amber">Today · ${day.date}</span><span style="font-size:13px;color:var(--text-3)">${day.dow} · ${day.trainer}</span></div>
      <div style="font-size:15px;color:var(--text-2)">${day.focus}</div></div>`);
    v.appendChild(card);
  } else if(new Date()<COURSE_START){
    v.appendChild(el(`<div class="card" style="margin-top:16px;border-left:3px solid var(--accent)">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px"><span class="pill">Before kickoff</span></div>
      <div style="font-size:15px;color:var(--text-2)">Course starts <b>Jun 9</b>. Knock out the <b>Pre-Course Preparation</b> checklist and run a flashcard pass on the key numbers.</div></div>`));
  }

  // quick actions
  v.appendChild(el('<h2 class="sec">Jump back in</h2>'));
  const quicks=[
    {id:"pretrip",t:"Pre-Trip Cheatsheet",s:"Follow-along + air brakes",icon:'<path d="M9 2h6a1 1 0 0 1 1 1v1h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2V3a1 1 0 0 1 1-1z"/><path d="M9 13l2 2 4-4"/>'},
    {id:"checklist",t:"Checklist",s:cs.done+"/"+cs.total+" done",icon:'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>'},
    {id:"flashcards",t:"Flashcards",s:fs.known+" mastered",icon:'<rect x="2" y="6" width="20" height="13" rx="2"/><path d="M2 11h20"/>'},
    {id:"quiz",t:"Self-test",s:"Best "+q+"%",icon:'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 4 2.8c-.9.4-1.6 1.2-1.6 2.2v.5M12 18h.01"/>'},
    {id:"numbers",t:"Key numbers",s:"21 to know cold",icon:'<path d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18"/>'},
    {id:"assessments",t:"MV7604 forms",s:"6 assessments",icon:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>'},
    {id:"schedule",t:"Schedule",s:"8 training days",icon:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'},
  ];
  const qg=el('<div class="quick-grid"></div>');
  quicks.forEach(x=>{
    const n=el(`<button class="quick"><span class="qic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${x.icon}</svg></span><b>${x.t}</b><span>${x.s}</span></button>`);
    n.addEventListener('click',()=>go(x.id));qg.appendChild(n);
  });
  v.appendChild(qg);

  if(memoryOnly){
    v.appendChild(el(`<div class="callout amber" style="margin-top:22px"><b>Heads-up:</b> your browser is blocking local storage, so progress won't be saved between visits. Opening this file directly (double-click) usually fixes it.</div>`));
  }
  return v;
};

VIEWS.overview=function(){
  const v=el('<div class="view"></div>');
  v.appendChild(el('<h1 class="page-title">Program & MOC Overview</h1>'));
  v.appendChild(el('<p class="page-sub">Two streams run in parallel across 8 training days — the classroom MELT Orientation Course, and the on-road instructor practical.</p>'));

  const g=el('<div class="grid g2"></div>');
  g.appendChild(el(`<div class="card"><span class="pill">Stream 1</span>
    <h2 class="sec" style="margin-top:12px">MELT Orientation Course (MOC)</h2>
    <p class="lead">14 hours across 4 × 3.5-hour classroom sessions. Qualifies you to teach the in-cab and in-yard practical portions of BC's Class 1 MELT curriculum. On completion, ICBC adds a <b>MELT designation</b> to your Class 1 instructor licence.</p></div>`));
  g.appendChild(el(`<div class="card"><span class="pill amber">Stream 2</span>
    <h2 class="sec" style="margin-top:12px">Instructor Training Truck On-Road Practical</h2>
    <p class="lead">~40 hours of practical training focused on teaching technique from the passenger seat — coaching, observation, intervention, and assessment delivery. Culminates in a practical assessment on <b>June 18</b>.</p></div>`));
  v.appendChild(g);

  v.appendChild(el('<h2 class="sec">What the MOC covers</h2>'));
  v.appendChild(el('<p class="lead" style="margin-bottom:14px">The MOC prepares you to deliver the 140-hour BC Class 1 MELT course — not as a driver, but as the person responsible for delivering and assessing it. Eight topic areas:</p>'));
  const topics=[
    ["MELT standards & policies","The regulatory backbone. ICBC is the regulator; the Ministry of Transportation & Infrastructure led the legislative framework. Aligns with NSC Standard 16. Know the rules around delivery, documentation, and what happens when a student doesn't meet standards."],
    ["Practical training requirements","Hour allocations, class sizes, vehicle specs, transmission rules, and the distinction between in-cab, in-yard, and in-class. Where your school-owner knowledge meets ICBC's prescriptive framework."],
    ["Classroom training requirements","How theory must be delivered, the 50% lecture cap, LMS rules, virtual classroom limits, and the integration requirement (no front-loading theory)."],
    ["Student assessment & qualification","The six practical assessment forms (MV7604B–H), the three written assessments, the 80% pass threshold, the MV2970 Declaration of Completion, and 6-year record retention."],
    ["Ethical issues in driver training","Professional boundaries, power dynamics with students, fair and consistent evaluation, conflicts of interest, and duty of care."],
    ["Overview of air brakes training","The 11-hour air brake module within MELT (9 theory + 2 in-yard practical; 6.5 hrs total air-brake practical across the course), including the distinction between air-brake-instructor and Class 1 instructor requirements for the air brake module."],
    ["Fuel efficiency e-learning","A required supplementary module completed online."],
    ["Human trafficking e-learning","A required awareness module for all MELT instructors, recognizing the trucking industry's intersection with trafficking routes."],
  ];
  const tg=el('<div class="grid g2"></div>');
  topics.forEach(t=>tg.appendChild(el(`<div class="item-card"><h3>${t[0]}</h3><p>${t[1]}</p></div>`)));
  v.appendChild(tg);

  v.appendChild(el(`<div class="callout"><b>The mindset shift:</b> you already know how to drive. This program is about learning to deliver and assess someone else's driving — and to teach the curriculum exactly as ICBC frames it.</div>`));
  v.appendChild(studiedBar('overview'));
  return v;
};

VIEWS.numbers=function(){
  const v=el('<div class="view"></div>');
  v.appendChild(el('<h1 class="page-title">Key Numbers</h1>'));
  v.appendChild(el('<p class="page-sub">The MELT curriculum figures you need cold. Drill these in flashcards and the quiz until they’re automatic.</p>'));
  const tiles=el('<div class="numtiles"></div>');
  NUMBERS.forEach(n=>tiles.appendChild(el(`<div class="numtile"><div class="nt-v">${n.v}</div><div class="nt-k">${n.k}</div>${n.note?`<div class="nt-note">${n.note}</div>`:''}</div>`)));
  v.appendChild(tiles);
  const row=el('<div style="display:flex;gap:10px;margin-top:20px;flex-wrap:wrap"></div>');
  const b1=el(`<button class="btn">Drill these in flashcards</button>`);b1.addEventListener('click',()=>{flashDeck='numbers';go('flashcards');});
  const b2=el(`<button class="btn ghost">Test yourself</button>`);b2.addEventListener('click',()=>go('quiz'));
  row.appendChild(b1);row.appendChild(b2);v.appendChild(row);
  v.appendChild(studiedBar('numbers'));
  return v;
};

VIEWS.hours=function(){
  const v=el('<div class="view"></div>');
  v.appendChild(el('<h1 class="page-title">Curriculum Hours</h1>'));
  v.appendChild(el('<p class="page-sub">The official MV7612 hour allocations — how the 140 hours break down by module and learning environment. Knowing this structure cold is exactly the kind of thing the assessment probes.</p>'));

  // headline tiles
  const tiles=el('<div class="numtiles" style="margin-bottom:8px"></div>');
  [["140 hrs","Total course"],["47 hrs","Theory"],["19 hrs","In-yard"],["18 hrs","Off-road manoeuvres"],["50 hrs","On-road driving"],["6 hrs","Flexible (mandatory)"]]
    .forEach(t=>tiles.appendChild(el(`<div class="numtile"><div class="nt-v">${t[0]}</div><div class="nt-k">${t[1]}</div></div>`)));
  v.appendChild(tiles);
  v.appendChild(el('<p class="note-muted" style="margin-top:6px">134 instructional hours by environment (47 + 19 + 18 + 50) plus 6 hours mandatory flexible practical time = 140.</p>'));

  v.appendChild(el('<h2 class="sec">Hours of instruction by module</h2>'));
  const wrap=el('<div class="tbl-wrap"></div>');
  const t=el(`<table class="tbl"><thead><tr><th>Module</th><th>Theory</th><th>In-yard</th><th>Off-road</th><th>On-road</th><th>Total</th></tr></thead><tbody></tbody></table>`);
  const tb=t.querySelector('tbody');
  HOURS_BY_MODULE.forEach(r=>tb.appendChild(el(`<tr><td><b>${r.m}</b></td><td>${r.th}</td><td>${r.iy}</td><td>${r.off}</td><td>${r.on}</td><td><b>${r.tot}</b></td></tr>`)));
  tb.appendChild(el(`<tr style="background:var(--surface-2)"><td><b>Totals by environment</b></td><td><b>${HOURS_TOTALS.th}</b></td><td><b>${HOURS_TOTALS.iy}</b></td><td><b>${HOURS_TOTALS.off}</b></td><td><b>${HOURS_TOTALS.on}</b></td><td><b>${HOURS_TOTALS.tot}</b></td></tr>`));
  wrap.appendChild(t);v.appendChild(wrap);
  v.appendChild(el(`<div class="callout amber" style="margin-top:14px"><b>Watch the trap:</b> air brakes is <b>11 hours</b> (Module 10), not 47. The <b>47</b> is the course's <b>total theory</b> hours across all modules. Module 5 (Off-Road Tasks) totals 25 hrs split across backing (14), coupling/slide (8) and chain-up (3).</div>`));

  v.appendChild(el('<h2 class="sec">On-road hours breakdown</h2>'));
  v.appendChild(el('<p class="lead" style="margin-bottom:12px">On-road driving must include loaded and unloaded trailers plus bobtailing, and may never total less than 50 hours:</p>'));
  const card=el('<div class="card"><div class="kv"></div></div>');
  const kv=card.querySelector('.kv');
  ONROAD_HOURS.forEach(r=>kv.appendChild(el(`<div class="row"><span class="k">${r.k}${r.note?` <span style="color:var(--text-3);font-style:italic">— ${r.note}</span>`:''}</span><span class="v">${r.v}</span></div>`)));
  v.appendChild(card);

  v.appendChild(el('<p class="note-muted">Verified against ICBC MV7612 — “Hours of instruction by module” (p.11) and “On-road driving requirements” (p.8).</p>'));
  v.appendChild(studiedBar('hours'));
  return v;
};

VIEWS.modules=function(){
  const v=el('<div class="view"></div>');
  v.appendChild(el('<h1 class="page-title">The 10 MELT Curriculum Modules</h1>'));
  v.appendChild(el('<p class="page-sub">As an instructor you must be able to teach all ten. Each card shows the official MV7612 hours and key learning outcomes — exactly what you need to be able to recite for June 18 — plus how your own experience maps in.</p>'));
  const g=el('<div class="grid g2"></div>');
  MODULES.forEach(m=>{
    const outs=m.outcomes.map(o=>`<li>${o}</li>`).join('');
    g.appendChild(el(`<div class="item-card"><h3><span class="num-badge">${m.n}</span> ${m.t} <span class="pill ghost" title="${m.hbreak}">${m.hrs}</span></h3>
      <p>${m.d}</p>
      <div class="outcomes"><div class="oc-h">Key learning outcomes (MV7612)</div><ul>${outs}</ul></div>
      <div class="angle"><b>Your angle:</b> ${m.angle}</div></div>`));
  });
  v.appendChild(g);
  v.appendChild(el('<p class="note-muted">Hours and learning outcomes verified against ICBC MV7612 — B.C. Class 1 MELT Course Standards & Curriculum Framework.</p>'));
  v.appendChild(studiedBar('modules'));
  return v;
};

VIEWS.assessments=function(){
  const v=el('<div class="view"></div>');
  v.appendChild(el('<h1 class="page-title">The Six MELT Practical Assessments</h1>'));
  v.appendChild(el('<p class="page-sub">As a MELT instructor you are the assessor. Know each form, its criteria, and that each must be passed twice.</p>'));
  const g=el('<div class="grid g2"></div>');
  ASSESSMENTS.forEach(a=>{
    g.appendChild(el(`<div class="item-card"><h3><span class="form-badge">${a.f}</span> ${a.t} ${a.flag?`<span class="pill rose">${a.flag}</span>`:''}</h3>
      <p>${a.d}</p></div>`));
  });
  v.appendChild(g);
  v.appendChild(el(`<div class="callout amber" style="margin-top:18px"><b>Remember:</b> every practical assessment must be passed on <b>two separate occasions</b>. All completed forms — including failed attempts — must be retained; passed assessments are recorded on <b>MV7604A</b>.</div>`));
  v.appendChild(studiedBar('assessments'));
  return v;
};

VIEWS.regulatory=function(){
  const v=el('<div class="view"></div>');
  v.appendChild(el('<h1 class="page-title">BC Regulatory Knowledge</h1>'));
  v.appendChild(el('<p class="page-sub">ICBC’s role, licensing requirements, vehicle standards, and the record-keeping that protects the school’s MELT authorization.</p>'));

  v.appendChild(el('<h2 class="sec">Key regulatory details to know cold</h2>'));
  const reg=el('<div class="grid g2"></div>');
  [
    ["Declaration of Completion (MV2970)","The school issues it. Student copy to the student; ICBC copy mailed to Victoria within <b>10 business days</b>; school copy retained <b>6 years</b>. A student cannot attempt the ICBC road test until ICBC has the DoC on file."],
    ["Student attendance tracking","Use form <b>MV7604</b> (or ICBC-approved equivalent). Record minimum mandatory hours per module. Retained by the school."],
    ["Assessment documentation","All completed assessment forms — including failed attempts — must be retained. Passed assessments recorded on <b>MV7604A</b>."],
    ["Instructor designations","Practical MELT instruction: Class 1 instructor licence with practical + MELT designations. Theory: Class 1 instructor licence with <b>MELT + GLT</b> designations."],
    ["Integration rule","Theory cannot be front-loaded. The course must interleave theory and practical throughout."],
    ["Flexible time (6 hours)","Not optional — must be used for practical training. The instructor uses professional judgment based on student needs."],
  ].forEach(x=>reg.appendChild(el(`<div class="item-card"><h3>${x[0]}</h3><p>${x[1]}</p></div>`)));
  v.appendChild(reg);

  v.appendChild(el('<h2 class="sec">Course delivery rules (MV7612)</h2>'));
  v.appendChild(el('<p class="lead" style="margin-bottom:14px">Straight from the framework — the delivery mechanics you’re responsible for as the instructor:</p>'));
  const del=el('<div class="grid g2"></div>');
  [
    ["Three learning environments","<b>In-class</b> (classroom, digital or blended, incl. self-directed LMS), <b>in-yard</b> (around a stationary vehicle — inspection, chain-up), and <b>in-cab</b> (off-road backing/coupling + on-road driving). Simulators may supplement in-class only — they can't replace in-cab or in-yard hours."],
    ["Instructional time","Hours are counted in 60-minute blocks; breaks don't count. Provide a 15-min break after 2 hrs (or 10 min after 90 min). Observation time (one student watching another) and time spent on the ICBC road test or pre-trip assessment do <b>not</b> count toward minimum hours."],
    ["Digital delivery & lecture caps","Up to <b>50%</b> of theory may be self-paced LMS; the remaining 50% in person or live virtual classroom. Of face-to-face/virtual time, a maximum of 50% may be lecture — the rest interactive, experiential and application-focused. The <b>final written assessments must be in person</b>."],
    ["Written assessments","<b>Three</b> written assessments, <b>80%</b> overall minimum, on ICBC-provided materials, invigilated by the school with a Class 1 instructor (or approved agent) present."],
    ["Advanced standing","<b>None.</b> Students must complete the full 140 hours. Course work from another jurisdiction is non-transferable, and holding a Class 2/3/4 licence grants no credit."],
    ["Student prerequisite","A student must hold a valid <b>BC Class 1 learner's licence (LDL)</b> to enrol; any training before obtaining it doesn't count toward mandatory hours."],
  ].forEach(x=>del.appendChild(el(`<div class="item-card"><h3>${x[0]}</h3><p>${x[1]}</p></div>`)));
  v.appendChild(del);

  v.appendChild(el('<h2 class="sec">ICBC’s role</h2>'));
  v.appendChild(el(`<div class="card prose"><p>ICBC is the <span class="term">regulator</span> of BC's driver-training industry: licensing driver-training schools, licensing instructors, managing oversight and delivery of the MELT program, and setting course standards. ICBC provides assessment materials, the curriculum framework, and the Declaration of Completion forms.</p></div>`));

  v.appendChild(el('<h2 class="sec">Instructor licensing pathway</h2>'));
  v.appendChild(el(`<div class="card prose">
    <p>To qualify for truck instructor training you must have held a valid <b>Class 1 licence for at least 3 years</b> with a clean driving record. ICBC requires a medical exam, criminal record check, and no outstanding debts (tickets, tolls). Before the course, ICBC administers an entrance quiz and on-road driving evaluation.</p>
    <div class="callout" style="margin:8px 0 0"><b>Pathway:</b> Class 5/7 instructor training → Class 1 instructor training (40 hrs practical) → MOC for the MELT designation.</div>
  </div>`));

  v.appendChild(el('<h2 class="sec">Training vehicle standards</h2>'));
  const tv=el('<div class="card"><div class="kv"></div></div>');
  const kv=tv.querySelector('.kv');
  [
    ["Combination","Tractor-semitrailer or B-train"],["Minimum weight (loaded)","32,000 kg GVW"],
    ["Axles","Tandem-axle tractor + tandem-axle trailer"],["Brakes","Full air brake system on both units"],
    ["Fifth wheel","Sliding"],["Trailer length","Minimum 48 ft"],
    ["Kingpin-to-rear-axle","Minimum 41 ft"],["Manual transmission","Minimum 13-speed"],
    ["Inspection","Valid certificates on both tractor and trailer"],
  ].forEach(r=>kv.appendChild(el(`<div class="row"><span class="k">${r[0]}</span><span class="v">${r[1]}</span></div>`)));
  v.appendChild(tv);

  v.appendChild(el(`<div class="callout rose" style="margin-top:18px"><b>Why records matter:</b> the school retains records for 6 years and ICBC can audit at any time. Getting this wrong puts the school's MELT authorization at risk — directly relevant to CSTT's own MELT ambitions.</div>`));
  v.appendChild(studiedBar('regulatory'));
  return v;
};

VIEWS.instructor=function(){
  const v=el('<div class="view"></div>');
  v.appendChild(el('<h1 class="page-title">Instructor Practical — Driver to Instructor</h1>'));
  v.appendChild(el('<p class="page-sub">The core challenge: learning to sit in the passenger seat and develop someone else’s driving. Here’s what’s being evaluated and what you’ll demonstrate.</p>'));

  v.appendChild(el('<h2 class="sec">Competencies being evaluated</h2>'));
  const cg=el('<div class="grid g2"></div>');
  COMPETENCIES.forEach(c=>cg.appendChild(el(`<div class="item-card"><h3>${c.t}</h3><p>${c.d}</p></div>`)));
  v.appendChild(cg);

  v.appendChild(el('<h2 class="sec">Teaching manoeuvres — what to demonstrate</h2>'));
  v.appendChild(el('<p class="lead" style="margin-bottom:14px">Show you can effectively <b>teach</b> (not just perform) these skills:</p>'));
  const mg=el('<div class="grid g2"></div>');
  TEACH_MANOEUVRES.forEach(m=>mg.appendChild(el(`<div class="item-card"><h3>${m.t}</h3><p>${m.d}</p></div>`)));
  v.appendChild(mg);

  v.appendChild(el('<h2 class="sec">The instructor assessment (June 18)</h2>'));
  v.appendChild(el(`<div class="card prose"><p>Your final day includes two back-to-back assessment blocks (<b>11:00 AM – 1:00 PM</b>), demonstrating instructor competency to Cindy. Expect to be evaluated on:</p></div>`));
  const ag=el('<div class="grid g2"></div>');
  [
    ["Teaching a lesson segment","Teach a specific skill to a student or role-play scenario — instructional technique, communication, and safety awareness."],
    ["On-road coaching demonstration","Ride in the instructor seat while a student (or Cindy role-playing) drives. Your commentary, timing, intervention decisions, and overall approach are assessed."],
    ["Knowledge verification","Questions on MELT curriculum, assessment procedures, instructor responsibilities, and ethical scenarios."],
    ["Assessment administration","Conduct a mock practical assessment (e.g., a backing assessment using MV7604G), objectively evaluating performance."],
  ].forEach(x=>ag.appendChild(el(`<div class="item-card"><h3>${x[0]}</h3><p>${x[1]}</p></div>`)));
  v.appendChild(ag);

  v.appendChild(el('<h2 class="sec">Common assessment pitfalls</h2>'));
  v.appendChild(el('<p class="lead" style="margin-bottom:14px">The things that trip up experienced drivers transitioning to instruction:</p>'));
  const pg=el('<div class="grid g2"></div>');
  PITFALLS.forEach(p=>pg.appendChild(el(`<div class="item-card" style="border-left:3px solid var(--rose)"><h3>${p.t}</h3><p>${p.d}</p></div>`)));
  v.appendChild(pg);
  v.appendChild(studiedBar('instructor'));
  return v;
};

VIEWS.errors=function(){
  const v=el('<div class="view"></div>');
  v.appendChild(el('<h1 class="page-title">Common Student Errors & Instructor Responses</h1>'));
  v.appendChild(el('<p class="page-sub">Quick reference for the coaching language to reach for. Learn the response phrasing — it’s exactly the kind of thing you’ll demonstrate on June 18.</p>'));
  const wrap=el('<div class="tbl-wrap"></div>');
  const t=el('<table class="tbl"><thead><tr><th style="width:20%">Student error</th><th style="width:22%">Root cause</th><th>Instructor response</th></tr></thead><tbody></tbody></table>');
  const tb=t.querySelector('tbody');
  ERRORS.forEach(e=>tb.appendChild(el(`<tr><td><b>${e.e}</b></td><td>${e.c}</td><td class="resp">${e.r}</td></tr>`)));
  wrap.appendChild(t);v.appendChild(wrap);
  const b=el('<button class="btn" style="margin-top:18px">Drill these as flashcards</button>');
  b.addEventListener('click',()=>{flashDeck='errors';go('flashcards');});
  v.appendChild(b);
  v.appendChild(studiedBar('errors'));
  return v;
};

/* ---------- Pre-Trip Cheatsheet ---------- */
const PT_ICONS={
  prep:'<path d="M3 7h13l5 5v5h-2"/><path d="M3 7v10h2"/><circle cx="7.5" cy="17" r="2"/><circle cx="17.5" cy="17" r="2"/>',
  hood:'<path d="M3 13c3-6 15-6 18 0"/><path d="M3 13v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"/><path d="M8 18v2M16 18v2"/>',
  cab:'<rect x="3" y="6" width="14" height="11" rx="1"/><path d="M17 9h2.5L22 12v5h-5"/><path d="M6 9h6v4H6z"/>',
  brake:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.4"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>',
  light:'<path d="M9 18h6M10 21h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1h6c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"/>',
  circle:'<path d="M3 12a9 9 0 1 1 4.5 7.8"/><path d="M3 20v-5h5"/>',
  test:'<path d="M9 3h6M10 3v5l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M7 15h10"/>',
};
VIEWS.pretrip=function(){
  const v=el('<div class="view pt-view"></div>');
  v.appendChild(el('<h1 class="page-title">Pre-Trip Inspection Cheatsheet</h1>'));
  v.appendChild(el('<p class="page-sub">Class 1 tractor-trailer + air brakes, in ICBC order. Work top to bottom and tap each item as you go — it saves automatically. Hit <b>Reset</b> to start a fresh run.</p>'));

  let total=0; PRETRIP.forEach(p=>total+=p.items.length);
  const countDone=()=>{let d=0;PRETRIP.forEach(p=>p.items.forEach((_,i)=>{if(state.pretrip[p.id+'-'+i])d++;}));return d;};

  // toolbar
  const tools=el('<div class="pt-tools"></div>');
  const left=el('<div class="pt-prog"></div>');
  const lbl=el(`<div class="pt-prog-lbl"><b id="pt-done">${countDone()}</b> / ${total} checked</div>`);
  const barWrap=el('<div class="bar accent pt-bar"><span></span></div>');
  const barFill=barWrap.querySelector('span');
  left.appendChild(lbl);left.appendChild(barWrap);
  const right=el('<div class="pt-actions"></div>');
  const resetBtn=el(`<button class="btn">${ICONS.shuffle? '' : ''}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg> Reset</button>`);
  const expandBtn=el('<button class="btn ghost" data-open="1">Collapse all</button>');
  const printBtn=el('<button class="btn ghost"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg> Print</button>');
  right.appendChild(expandBtn);right.appendChild(printBtn);right.appendChild(resetBtn);
  tools.appendChild(left);tools.appendChild(right);
  v.appendChild(tools);

  function syncGlobal(){const d=countDone();const pct=total?Math.round(d/total*100):0;barFill.style.width=pct+'%';v.querySelector('#pt-done').textContent=d;}
  syncGlobal();

  // air brake numbers reference
  const ref=el('<div class="pt-numbers"></div>');
  ref.appendChild(el('<div class="pt-num-head"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l2.5 2"/></svg> Air brake numbers — keep these in view</div>'));
  const segTest=el('<div class="pt-num-seg"><div class="pt-seg-lbl">Test sequence</div><div class="pt-num-grid"></div></div>');
  ABN_TEST.forEach(n=>segTest.querySelector('.pt-num-grid').appendChild(el(`<div class="pt-num seq"><div class="ptn-v">${n.v}</div><div class="ptn-k">${n.k}</div><div class="ptn-d">${n.d}</div></div>`)));
  const segLim=el('<div class="pt-num-seg"><div class="pt-seg-lbl">Limits &amp; thresholds</div><div class="pt-num-grid"></div></div>');
  ABN_LIMITS.forEach(n=>segLim.querySelector('.pt-num-grid').appendChild(el(`<div class="pt-num"><div class="ptn-v">${n.v}</div><div class="ptn-k">${n.k}</div><div class="ptn-d">${n.d}</div></div>`)));
  ref.appendChild(segTest);ref.appendChild(segLim);
  v.appendChild(ref);

  // phases
  const phaseNodes=[];
  PRETRIP.forEach(phase=>{
    const done0=phase.items.filter((_,i)=>state.pretrip[phase.id+'-'+i]).length;
    const node=el(`<div class="pt-phase open ${done0===phase.items.length?'phase-complete':''}">
      <div class="pt-phase-head">
        <span class="pt-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${PT_ICONS[phase.icon]||''}</svg></span>
        <div class="pt-ph-title"><b>${phase.t}</b>${phase.note?`<span>${phase.note}</span>`:''}</div>
        <span class="pt-ph-count">${done0}/${phase.items.length}</span>
        <svg class="pt-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
      </div>
      <div class="pt-phase-body"></div></div>`);
    const head=node.querySelector('.pt-phase-head');
    const body=node.querySelector('.pt-phase-body');
    const countEl=node.querySelector('.pt-ph-count');
    head.addEventListener('click',()=>node.classList.toggle('open'));
    const syncPhase=()=>{const pd=phase.items.filter((_,i)=>state.pretrip[phase.id+'-'+i]).length;countEl.textContent=pd+'/'+phase.items.length;node.classList.toggle('phase-complete',pd===phase.items.length);};
    phase.items.forEach((it,i)=>{
      const id=phase.id+'-'+i, on=!!state.pretrip[id];
      const isAb = it.ab || phase.allAb;
      const row=el(`<div class="pt-check ${on?'on':''}">
        <div class="box">${ICONS.check}</div>
        <div class="pt-lab"><div class="pt-lab-t">${it.t}${isAb?'<span class="ab-tag">AIR</span>':''}</div><div class="pt-lab-d">${it.d}</div></div></div>`);
      row.addEventListener('click',()=>{state.pretrip[id]=!state.pretrip[id];save();row.classList.toggle('on',!!state.pretrip[id]);syncPhase();syncGlobal();});
      body.appendChild(row);
    });
    phaseNodes.push(node);
    v.appendChild(node);
  });

  // toolbar handlers
  resetBtn.addEventListener('click',()=>{
    if(confirm('Reset the pre-trip checklist for a fresh run? (Your study progress is not affected.)')){
      state.pretrip={};save();go('pretrip');
    }
  });
  expandBtn.addEventListener('click',()=>{
    const anyOpen=phaseNodes.some(n=>n.classList.contains('open'));
    phaseNodes.forEach(n=>n.classList.toggle('open',!anyOpen));
    expandBtn.textContent=anyOpen?'Expand all':'Collapse all';
  });
  printBtn.addEventListener('click',()=>{phaseNodes.forEach(n=>n.classList.add('open'));window.print();});

  v.appendChild(el('<p class="note-muted">Sequence and limits from ICBC <i>Driving Commercial Vehicles</i>, Ch 8–10 (BC law current to Aug 27, 2024). This is a study aid — always follow your examiner’s current instructions and the vehicle’s specific requirements.</p>'));
  return v;
};

/* ---------- Checklist ---------- */
VIEWS.checklist=function(){
  const v=el('<div class="view"></div>');
  v.appendChild(el('<h1 class="page-title">Self-Study Checklist</h1>'));
  v.appendChild(el('<p class="page-sub">Your preparation tracker, before and during the program. Tap to check off — everything saves automatically and feeds your dashboard readiness.</p>'));
  const cs=checklistStats();
  v.appendChild(el(`<div class="card" style="margin-bottom:20px"><div class="progress-line"><div class="row"><span style="font-weight:600">Overall checklist progress</span><span>${cs.done} of ${cs.total} complete · ${cs.pct}%</span></div><div class="bar accent"><span style="width:${cs.pct}%"></span></div></div></div>`));
  CHECKLIST.forEach((s,si)=>{
    let done=0;s.items.forEach((_,ii)=>{if(state.checklist[si+"-"+ii])done++;});
    const sec=el(`<div class="check-section"><div class="csh"><h3>${s.sec}</h3><span class="cnt">${done}/${s.items.length}</span></div></div>`);
    s.items.forEach((item,ii)=>{
      const id=si+"-"+ii, on=!!state.checklist[id];
      const row=el(`<div class="check ${on?'on':''}"><div class="box">${ICONS.check}</div><div class="lab">${item}</div></div>`);
      row.addEventListener('click',()=>{state.checklist[id]=!state.checklist[id];save();go('checklist');});
      sec.appendChild(row);
    });
    v.appendChild(sec);
  });
  return v;
};

/* ---------- Flashcards ---------- */
let flashDeck='all', flashIdx=0, flashFlipped=false, flashOrder=null;
function currentDeckCards(){
  const cards=DECKS[flashDeck].cards.slice();
  if(flashOrder==='shuffle'){
    for(let i=cards.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[cards[i],cards[j]]=[cards[j],cards[i]];}
  }
  return cards;
}
let _deckCache=null;
VIEWS.flashcards=function(){
  const v=el('<div class="view"></div>');
  v.appendChild(el('<h1 class="page-title">Flashcards</h1>'));
  v.appendChild(el('<p class="page-sub">Tap a card to flip. Mark each <b>Got it</b> or <b>Review</b> — mastered cards feed your readiness score.</p>'));
  // deck tabs
  const tabs=el('<div class="fc-deck-tabs" style="margin-bottom:18px"></div>');
  Object.keys(DECKS).forEach(k=>{
    const known=DECKS[k].cards.filter(c=>state.flash[c.id]==='known').length;
    const chip=el(`<div class="chip ${flashDeck===k?'active':''}">${DECKS[k].label} <span style="opacity:.7">${known}/${DECKS[k].cards.length}</span></div>`);
    chip.addEventListener('click',()=>{flashDeck=k;flashIdx=0;flashFlipped=false;_deckCache=null;go('flashcards');});
    tabs.appendChild(chip);
  });
  v.appendChild(tabs);

  if(!_deckCache)_deckCache=currentDeckCards();
  const cards=_deckCache;
  if(flashIdx>=cards.length)flashIdx=0;
  const card=cards[flashIdx];
  const status=state.flash[card.id];

  const stage=el('<div class="fc-stage"></div>');
  const fc=el(`<div class="flashcard ${flashFlipped?'flipped':''}">
    <div class="fc-inner">
      <div class="fc-face fc-front"><div class="tag">${DECKS[flashDeck].label}</div><div class="q">${card.q}</div><div class="hint">Tap to reveal</div></div>
      <div class="fc-face fc-back"><div class="tag">Answer</div><div class="a">${card.a}${card.sub?`<small>${card.sub}</small>`:''}</div><div class="hint">Tap to flip back</div></div>
    </div></div>`);
  fc.addEventListener('click',()=>{flashFlipped=!flashFlipped;fc.classList.toggle('flipped');});
  stage.appendChild(fc);

  // judge buttons
  const judge=el('<div class="judge"></div>');
  const review=el(`<button class="btn review">Review again</button>`);
  const know=el(`<button class="btn know">${ICONS.check} Got it</button>`);
  review.addEventListener('click',()=>{state.flash[card.id]='review';save();next();});
  know.addEventListener('click',()=>{state.flash[card.id]='known';save();next();});
  judge.appendChild(review);judge.appendChild(know);

  // controls
  const ctr=el('<div class="fc-controls"></div>');
  const prev=el(`<button class="round-btn">${ICONS.chevL}</button>`);
  const nextb=el(`<button class="round-btn">${ICONS.chevR}</button>`);
  const shuf=el(`<button class="round-btn" title="Shuffle deck">${ICONS.shuffle}</button>`);
  const prog=el(`<div class="fc-progress">${flashIdx+1} / ${cards.length}${status?` · <span style="color:${status==='known'?'var(--accent-deep)':'var(--amber)'}">${status==='known'?'mastered':'review'}</span>`:''}</div>`);
  function next(){flashIdx=(flashIdx+1)%cards.length;flashFlipped=false;go('flashcards');}
  function back(){flashIdx=(flashIdx-1+cards.length)%cards.length;flashFlipped=false;go('flashcards');}
  prev.addEventListener('click',back);
  nextb.addEventListener('click',next);
  shuf.addEventListener('click',()=>{flashOrder='shuffle';_deckCache=currentDeckCards();flashIdx=0;flashFlipped=false;go('flashcards');});
  ctr.appendChild(prev);ctr.appendChild(prog);ctr.appendChild(nextb);ctr.appendChild(shuf);

  stage.appendChild(judge);
  stage.appendChild(ctr);
  v.appendChild(stage);
  return v;
};

/* ---------- Quiz ---------- */
let quizState=null; // {questions, idx, answered, score}
function startQuiz(n){
  const pool=QUIZ_POOL.slice();
  for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
  const questions=pool.slice(0,n).map(q=>{
    const opts=q.opts.slice();
    for(let i=opts.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[opts[i],opts[j]]=[opts[j],opts[i]];}
    return {...q,opts};
  });
  quizState={questions,idx:0,answered:false,score:0,picked:null};
}
VIEWS.quiz=function(){
  const v=el('<div class="view"></div>');
  v.appendChild(el('<h1 class="page-title">Self-Test Quiz</h1>'));
  if(!quizState){
    v.appendChild(el('<p class="page-sub">A randomized multiple-choice round drawn from the MELT numbers, forms, modules, and regulations. Immediate feedback on every question; your best score feeds your readiness.</p>'));
    const card=el(`<div class="card" style="text-align:center;padding:36px">
      <div style="font-family:var(--serif);font-size:22px;font-weight:600;margin-bottom:6px">Ready to test yourself?</div>
      <div style="color:var(--text-2);margin-bottom:8px">Best so far: <b>${state.quiz.best||0}%</b>${state.quiz.taken?` · ${state.quiz.taken} round${state.quiz.taken>1?'s':''} taken`:''}</div>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:16px">
        <button class="btn" data-n="12">Quick round · 12 Q</button>
        <button class="btn ghost" data-n="20">Longer round · 20 Q</button>
        <button class="btn ghost" data-n="${QUIZ_POOL.length}">Everything · ${QUIZ_POOL.length} Q</button>
      </div></div>`);
    card.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{startQuiz(parseInt(b.dataset.n));go('quiz');}));
    v.appendChild(card);
    return v;
  }
  const qs=quizState;
  if(qs.idx>=qs.questions.length){
    const pct=Math.round(qs.score/qs.questions.length*100);
    const isNew=pct>(state.quiz.best||0);
    state.quiz.last=pct;state.quiz.taken=(state.quiz.taken||0)+1;
    if(isNew)state.quiz.best=pct;save();
    let msg= pct>=90?"Excellent — you've got this cold.":pct>=80?"Solid pass. A couple more passes and it's automatic.":pct>=60?"Getting there — review the misses and run another round.":"Early days. Drill the flashcards, then come back.";
    const res=el(`<div class="card result-card">
      <div class="score-big">${pct}%</div>
      <div class="msg">${qs.score} of ${qs.questions.length} correct.${isNew?' <b style="color:var(--accent-deep)">New best!</b>':''}<br>${msg}</div>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        <button class="btn" id="again">Another round</button>
        <button class="btn ghost" id="cards">Review flashcards</button></div></div>`);
    res.querySelector('#again').addEventListener('click',()=>{quizState=null;go('quiz');});
    res.querySelector('#cards').addEventListener('click',()=>{quizState=null;go('flashcards');});
    v.appendChild(res);
    return v;
  }
  const q=qs.questions[qs.idx];
  const pct=Math.round(qs.idx/qs.questions.length*100);
  const wrap=el('<div class="quiz-wrap"></div>');
  wrap.appendChild(el(`<div class="q-progress-top"><div class="bar accent"><span style="width:${pct}%"></span></div><div class="q-num">Q ${qs.idx+1} / ${qs.questions.length} · Score ${qs.score}</div></div>`));
  const card=el(`<div class="q-card"><div class="q-text">${q.q}</div></div>`);
  const letters=["A","B","C","D","E"];
  q.opts.forEach((opt,i)=>{
    const o=el(`<div class="q-opt ${qs.answered?'disabled':''}"><div class="mk">${letters[i]}</div><div>${opt}</div></div>`);
    if(qs.answered){
      if(opt===q.a)o.classList.add('correct');
      else if(opt===qs.picked)o.classList.add('wrong');
    }
    o.addEventListener('click',()=>{
      if(qs.answered)return;
      qs.answered=true;qs.picked=opt;
      if(opt===q.a)qs.score++;
      go('quiz');
    });
    card.appendChild(o);
  });
  if(qs.answered){
    const correct=qs.picked===q.a;
    card.appendChild(el(`<div class="q-explain"><b>${correct?'Correct.':'Not quite — answer: '+q.a+'.'}</b> ${q.ex}</div>`));
    const foot=el('<div class="q-foot"><span style="font-size:13px;color:var(--text-3)"></span></div>');
    const btn=el(`<button class="btn">${qs.idx+1>=qs.questions.length?'See results':'Next question'} ${ICONS.chevR}</button>`);
    btn.addEventListener('click',()=>{qs.idx++;qs.answered=false;qs.picked=null;go('quiz');});
    foot.appendChild(btn);card.appendChild(foot);
  }
  wrap.appendChild(card);
  v.appendChild(wrap);
  return v;
};

/* ---------- Schedule ---------- */
function todayScheduleIndex(){
  const now=new Date();const y=now.getFullYear(),m=now.getMonth(),d=now.getDate();
  if(y!==2026||m!==5)return -1;
  const map={9:0,10:1,11:2,12:3,15:4,16:5,17:6,18:7};
  return (d in map)?map[d]:-1;
}
VIEWS.schedule=function(){
  const v=el('<div class="view"></div>');
  v.appendChild(el('<h1 class="page-title">Schedule & Countdown</h1>'));
  const d=daysToAssessment();
  v.appendChild(el(`<p class="page-sub">Eight training days, June 9–18, 2026. Mark days done and jot notes as you go — it all saves. Daily focus is an outline to adjust as Cindy sets the real agenda.</p>`));

  v.appendChild(el(`<div class="hero" style="margin-bottom:22px">
    <div class="hero-left"><div class="hero-eyebrow">Final assessment</div>
      <h1>Thursday, June 18 · 11:00 AM – 1:00 PM</h1>
      <p>Teach a lesson segment · on-road coaching demo · knowledge verification · mock assessment administration.</p></div>
    <div class="countdown"><div class="cd-box"><div class="n">${d}</div><div class="l">${d===1?'day':'days'}<br>to go</div></div></div></div>`));

  const today=todayScheduleIndex();
  const tl=el('<div class="timeline"></div>');
  SCHEDULE.forEach((day,i)=>{
    const done=!!state.schedule['done-'+i];
    const isToday=i===today;
    const node=el(`<div class="day ${done?'done':''} ${isToday?'today':''}">
      <div class="spine"><div class="node">${done?ICONS.check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/></svg>'}</div><div class="line"></div></div>
      <div class="body">
        <div class="dh"><span class="date">${day.date}</span><span class="dow">${day.dow} · ${day.trainer}</span>${isToday?'<span class="pill amber">Today</span>':''}${day.assessment?'<span class="pill rose">Assessment</span>':''}</div>
        <div class="tags">${day.tags.map(t=>`<span class="pill ghost">${t}</span>`).join('')}</div>
        <div class="focus">${day.focus}</div>
        <textarea class="note" placeholder="Notes, wins, things to ask about tomorrow…">${(state.schedule['note-'+i]||'').replace(/</g,'&lt;')}</textarea>
        <div class="day-foot"><span style="font-size:12px;color:var(--text-3)">Notes save automatically</span>
          <button class="btn ${done?'done':'ghost'}">${done?ICONS.check+' Day complete':'Mark day complete'}</button></div>
      </div></div>`);
    node.querySelector('textarea').addEventListener('input',(e)=>{state.schedule['note-'+i]=e.target.value;save();});
    node.querySelector('button').addEventListener('click',()=>{state.schedule['done-'+i]=!state.schedule['done-'+i];save();go('schedule');});
    tl.appendChild(node);
  });
  v.appendChild(tl);
  return v;
};

/* ---------- Resources ---------- */
VIEWS.resources=function(){
  const v=el('<div class="view"></div>');
  v.appendChild(el('<h1 class="page-title">Key Resources</h1>'));
  v.appendChild(el('<p class="page-sub">Primary ICBC and program references. Verify all regulatory details against current ICBC publications — requirements may be updated.</p>'));
  const list=el('<div></div>');
  RESOURCES.forEach(r=>{
    list.appendChild(el(`<div class="res">
      <div class="ric"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg></div>
      <div class="rb"><b>${r.t}</b><span>${r.u}</span></div>
      <a class="btn ghost" href="${r.u}" target="_blank" rel="noopener">Open</a></div>`));
  });
  v.appendChild(list);
  v.appendChild(el(`<div class="callout" style="margin-top:18px">Also referenced in the guide: <b>NSC Standard 16</b> (Entry-Level Training) and <b>NSC Standard 10</b> (Cargo Securement), both available via CCMTA.</div>`));
  v.appendChild(el('<p class="note-muted">Study guide content sourced from the ICBC curriculum framework, Valley Driving School program descriptions, and BC MELT regulatory materials (guide generated May 29, 2026).</p>'));
  return v;
};

/* =====================================================================
   THEME + CONTROLS
   ===================================================================== */
function applyTheme(){
  document.documentElement.setAttribute('data-theme',state.theme==='dark'?'dark':'light');
  const ic=document.getElementById('themeIcon');
  if(state.theme==='dark'){
    ic.innerHTML='<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>';
  }else{
    ic.innerHTML='<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
  }
}
document.getElementById('themeBtn').addEventListener('click',()=>{state.theme=state.theme==='dark'?'light':'dark';save();applyTheme();});
document.getElementById('resetBtn').addEventListener('click',()=>{
  if(confirm('Reset all saved progress — checklist, studied sections, flashcards, quiz scores and schedule notes? This cannot be undone.')){
    const theme=state.theme;state=defaultState();state.theme=theme;save();
    quizState=null;_deckCache=null;go('dashboard');
  }
});
// sidebar mobile
function openSidebar(){document.getElementById('sidebar').classList.add('open');document.getElementById('scrim').classList.add('show');}
function closeSidebar(){document.getElementById('sidebar').classList.remove('open');document.getElementById('scrim').classList.remove('show');}
document.getElementById('hamburger').addEventListener('click',openSidebar);
document.getElementById('scrim').addEventListener('click',closeSidebar);
// keyboard for flashcards/quiz
document.addEventListener('keydown',(e)=>{
  if(current==='flashcards'){
    if(e.key===' '){e.preventDefault();const fc=document.querySelector('.flashcard');if(fc){flashFlipped=!flashFlipped;fc.classList.toggle('flipped');}}
    if(e.key==='ArrowRight'){const b=document.querySelectorAll('.fc-controls .round-btn')[2];}
  }
});

/* =====================================================================
   INIT
   ===================================================================== */
applyTheme();
renderNav();
go('dashboard');
