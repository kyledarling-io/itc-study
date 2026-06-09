/* =====================================================================
   DATA — all content sourced from the VDS Instructor Training Study Guide
   ===================================================================== */
const ASSESSMENT_DATE = new Date(2026,5,18,11,0,0); // Jun 18 2026, 11:00
const COURSE_START = new Date(2026,5,9,0,0,0);       // Jun 9 2026

const NUMBERS = [
  {k:"Total minimum course hours", v:"140 hrs"},
  {k:"In-cab max / day", v:"4 hrs", note:"up to 10 hrs for 20 hrs total highway/mountain"},
  {k:"In-class max / day", v:"7 hrs"},
  {k:"Virtual classroom max / day", v:"4 hrs"},
  {k:"In-yard max / day", v:"6 hrs"},
  {k:"Combined instruction max / day", v:"8 hrs"},
  {k:"Max classroom size (in-person)", v:"15"},
  {k:"Max virtual class size", v:"10"},
  {k:"Max in-yard students / instructor", v:"4"},
  {k:"Max in-cab students / instructor", v:"2"},
  {k:"Course completion window", v:"365 days", note:"from start date"},
  {k:"Minimum course duration", v:"30 days"},
  {k:"Flexible practical time", v:"6 hrs", note:"mandatory to use"},
  {k:"Written assessment pass rate", v:"80%", note:"overall minimum"},
  {k:"Practical assessments", v:"Passed ×2", note:"each passed twice"},
  {k:"DoC retention period", v:"6 years"},
  {k:"Manual transmission minimum", v:"13-speed"},
  {k:"Max automatic training hours", v:"10 hrs"},
  {k:"Loaded vehicle minimum weight", v:"32,000 kg", note:"GVW"},
  {k:"Trailer minimum length", v:"48 ft", note:"14.63 m"},
  {k:"Kingpin-to-rear-axle minimum", v:"41 ft", note:"12.5 m"},
  {k:"Written assessments", v:"3", note:"80% overall; final one in person"},
  {k:"Minimum on-road hours", v:"50 hrs", note:"never less than 50; up to 56 w/ flexible"},
  {k:"Total theory hours", v:"47 hrs", note:"of 134 instructional hours (+6 flexible = 140)"},
  {k:"Air brakes (Module 10)", v:"11 hrs", note:"9 theory + 2 in-yard; 6.5 hrs total practical"},
  {k:"Classroom lecture cap", v:"50%", note:"rest interactive/experiential"},
];

const MODULES = [
  {n:1,t:"Overview of the Trucking Industry",hrs:"3 hrs",hbreak:"3 theory",d:"Trucking sector overview, carrier types, driver responsibilities, industry regulations, the National Safety Code.",angle:"10+ years as a Class 1 driver plus owning Jencam and CSTT — you can speak to this from lived experience. Focus on the specific ICBC-framed learning outcomes so your teaching stays on-curriculum.",
    outcomes:["1.1 Describe the requirements for employers and workers to comply with government regulations and standards.","1.2 Effectively interact and speak with coworkers, supervisors, customers, suppliers, enforcement officials and the public.","1.3 Explain the importance of being “fit for work”, a healthy lifestyle, and work-life balance.","1.4 Explain the purpose, structure and content of regulations that apply to commercial vehicle operations.","1.5 Recognize when human trafficking may be occurring and know how to report it."]},
  {n:2,t:"Vehicle Components and Systems",hrs:"5.5 hrs",hbreak:"3.5 theory · 2 in-yard",d:"Drivetrain, steering, suspension, electrical, fuel, cooling, exhaust, frame.",angle:"Eaton Fuller transmissions are your wheelhouse — make sure you can also articulate automated/automatic transmission systems for the 10-hour auto allowance.",
    outcomes:["2.1 Operate commercial vehicle systems and controls."]},
  {n:3,t:"Driving Techniques",hrs:"46 hrs",hbreak:"6 theory · 40 on-road",d:"Speed management, space management, lane changes, turns, intersections, highway driving, mountain driving, adverse conditions, night driving, emergency maneuvers.",angle:"The core of what you'll teach on-road — and the biggest module by hours. BC-specific emphasis on mountainous geography and diverse weather.",
    outcomes:["3.1 Prepare and start to drive a commercial vehicle.","3.2 Comply with operational regulations that apply to commercial vehicles.","3.3 Operate a commercial vehicle safely and perform basic driving manoeuvres.","3.4 Use fuel-efficient driving habits."]},
  {n:4,t:"Professional Driving Habits",hrs:"14 hrs",hbreak:"4 theory · 10 on-road",d:"Fatigue management, distraction, impairment, road rage, sharing the road, vulnerable road users, attitude and professionalism.",angle:"As an instructor you model these — this module is as much about what you demonstrate as what you say.",
    outcomes:["4.1 Apply defensive and cooperative driving techniques.","4.2 Handle emergency incidents in a professional manner."]},
  {n:5,t:"Off-Road Tasks and Manoeuvres",hrs:"25 hrs",hbreak:"Backing 14 · Coupling/slide 8 · Chain-up 3",d:"Straight-line backing, offset backing, alley-dock backing, coupling/uncoupling, fifth-wheel slide, trailer axle slide.",angle:"Assessed via MV7604E, MV7604F, and MV7604G — each must be passed twice.",
    outcomes:["5.1 Perform backing and parking manoeuvres with a tractor-trailer.","5.2 Safely perform tractor-trailer coupling and uncoupling tasks.","5.3 Apply chains to a tire on a tractor-trailer."]},
  {n:6,t:"Documents, Regulations and Planning",hrs:"5 hrs",hbreak:"5 theory",d:"Trip planning, weight/dimension regulations, permits, border crossing, bills of lading, driver abstracts, CVSE requirements.",angle:"Your Jencam dispatch background gives you strong context here.",
    outcomes:["6.1 Administer workplace documents and communicate effectively (written and electronic).","6.2 Complete basic mathematical calculations required for commercial vehicle operation.","6.3 Plan ahead and anticipate problems."]},
  {n:7,t:"Vehicle Inspection Activities",hrs:"13.5 hrs",hbreak:"3.5 theory · 10 in-yard",d:"Pre-trip, en-route, and post-trip inspections. Inspect each component/system per NSC Standard 13 for minor and major defects. Defect reporting.",angle:"Assessed via MV7604C — includes air brake pre-trip. One of the most fail-prone assessment areas on the road test.",
    outcomes:["7.1 Inspect and maintain commercial vehicles.","7.2 Inspect each component or system listed in NSC Standard 13 for minor and major defects."]},
  {n:8,t:"Hours of Service Compliance",hrs:"5 hrs",hbreak:"5 theory",d:"Federal and BC HOS rules, ELD requirements, daily log completion, cycle selection, exceptions.",angle:"Your operational experience with Jencam drivers means you know how HOS works in practice — focus on teaching students who've never seen a log book.",
    outcomes:["8.1 Comply with the requirements of the hours of service regulations."]},
  {n:9,t:"Cargo Securement and Loss Prevention",hrs:"6 hrs",hbreak:"4 theory · 2 in-yard",d:"NSC Standard 10 (cargo securement), types of securement devices, direct vs indirect tiedowns, load distribution, specialized loads.",angle:"Teach the “what happens when this fails” perspective — your road experience gives you stories.",
    outcomes:["9.1 Comply with basic cargo securement requirements.","9.2 Prevent cargo loss claims and follow procedures to maintain secure facilities, prevent loss and avoid damage."]},
  {n:10,t:"Air Brakes",hrs:"11 hrs",hbreak:"9 theory · 2 in-yard practical",d:"Air brake system principles, supply/service/spring sub-systems, foundation brakes, pre-trip and en-route air brake inspections, pushrod travel check and adjustment, brake fade/lag/overheating. (Total air-brake practical across the course is 6.5 hrs, incl. 4.5 hrs during pre-trip lessons.)",angle:"To teach the air-brake theory module you'd need a Class 1 instructor licence with MELT + GLT and an air-brake instructor licence. For the practical portions, your Class 1 instructor licence with practical + MELT designations covers it.",
    outcomes:["10.1 Operate air-brake-equipped vehicles safely and in compliance with regulations.","10.2 Conduct pre-trip and en-route air brake inspections; identify minor or major defects.","10.3 Check and adjust air brake pushrod travel."]},
];

/* Curriculum hours — official MV7612 “Hours of instruction by module” table */
const HOURS_BY_MODULE = [
  {m:"1. Overview of the Trucking Industry", th:"3", iy:"–", off:"–", on:"–", tot:"3"},
  {m:"2. Vehicle Components and Systems", th:"3.5", iy:"2", off:"–", on:"–", tot:"5.5"},
  {m:"3. Driving Techniques", th:"6", iy:"–", off:"–", on:"40", tot:"46"},
  {m:"4. Professional Driving Habits", th:"4", iy:"–", off:"–", on:"10", tot:"14"},
  {m:"5. Off-Road Tasks & Manoeuvres", th:"4", iy:"3", off:"18", on:"–", tot:"25"},
  {m:"6. Documents, Regulations and Planning", th:"5", iy:"–", off:"–", on:"–", tot:"5"},
  {m:"7. Vehicle Inspection Activities", th:"3.5", iy:"10", off:"–", on:"–", tot:"13.5"},
  {m:"8. Hours of Service Compliance", th:"5", iy:"–", off:"–", on:"–", tot:"5"},
  {m:"9. Cargo Securement and Loss Prevention", th:"4", iy:"2", off:"–", on:"–", tot:"6"},
  {m:"10. Air Brakes", th:"9", iy:"2", off:"–", on:"–", tot:"11"},
];
const HOURS_TOTALS = {th:"47", iy:"19", off:"18", on:"50", tot:"134"};
const ONROAD_HOURS = [
  {k:"Loaded trailer", v:"38 hrs"},
  {k:"Bobtail (tractor only)", v:"4 hrs"},
  {k:"Unloaded trailer", v:"4 hrs"},
  {k:"Student / instructor choice", v:"4 hrs", note:"up to 4 hrs may use a pintle-hitch truck & trailer"},
  {k:"Minimum on-road total", v:"50 hrs", note:"never less than 50; up to 56 with flexible time"},
];

const ASSESSMENTS = [
  {f:"MV7604B",t:"Highway and Mountain Driving",d:"Manage speed on grades, use engine brakes, select appropriate gears for descents, maintain safe following distance at highway speed, demonstrate awareness of runaway lanes. Passed on two separate occasions."},
  {f:"MV7604C",t:"Vehicle Pre-Trip Inspection (incl. air brake pre-trip)",d:"Full walk-around inspection plus air brake system check. Systematic approach, correct identification of defects, proper documentation. One of the highest-stakes assessments — mirrors the ICBC road test pre-trip.",flag:"High stakes"},
  {f:"MV7604E",t:"Coupling / Uncoupling",d:"Complete coupling and uncoupling sequence. Proper fifth-wheel engagement check (tug test), air line connection, landing gear operation, and safety procedures throughout."},
  {f:"MV7604F",t:"Chain-up, Fifth Wheel Slide, Trailer Axle Slide",d:"Tire chain installation, adjusting fifth wheel position for weight distribution, sliding trailer axles. Students must understand the why behind each adjustment, not just the how."},
  {f:"MV7604G",t:"Backing (straight-line, alley-dock, offset)",d:"Three backing manoeuvres assessed on two occasions each. Proper use of mirrors, GOAL (Get Out And Look), reference points, and steering corrections."},
  {f:"MV7604H",t:"Basic and Urban Driving",d:"City driving: intersections, lane changes, turns, signal management, pedestrian awareness, school zones, construction zones. Manage the vehicle safely in congested traffic."},
];

const ERRORS = [
  {e:"Grinding gears on upshift",c:"Timing / clutch coordination",r:"“Let the RPMs climb to [X], then smoothly disengage the clutch, move through the gate, and re-engage. Listen for the engine speed — that's your cue.”"},
  {e:"Drifting in lane on highway",c:"Not scanning far enough ahead",r:"“Pick a point 15-20 seconds ahead and steer toward it. Your hands follow your eyes.”"},
  {e:"Wide right turns",c:"Starting turn too early / wrong reference point",r:"“Delay your turn until the trailer tandems are past the curb line. Use your right mirror to track the trailer's path.”"},
  {e:"Failing to GOAL during backing",c:"Overconfidence or forgetting",r:"“Before you start any backing manoeuvre, what's your first step? Get out and look. Every time. No exceptions.”"},
  {e:"Incomplete pre-trip inspection",c:"Rushing / no system",r:"“Start at the same point every time and work around the vehicle in the same direction. Build a routine you can't skip steps in.”"},
  {e:"Incorrect following distance",c:"Misjudging speed/distance",r:"“At highway speed, you need 7 seconds of following distance minimum. Pick a fixed point and count when the vehicle ahead passes it.”"},
  {e:"Forgetting tug test after coupling",c:"Complacency",r:"“After you think you're coupled, put it in low gear and gently pull forward against the trailer brakes. If the fifth wheel didn't lock, you'll know before you leave the yard — not on the highway.”"},
  {e:"Over-braking on descent",c:"Fear / unfamiliar with engine brake",r:"“Select your gear before the grade begins. The engine brake does the work. Your service brakes are for fine adjustment, not primary speed control.”"},
];

const COMPETENCIES = [
  {t:"Observation skills",d:"Scanning the student's inputs (steering, braking, shifting, mirror checks) while simultaneously monitoring the road environment. See what the student is doing wrong before it becomes dangerous."},
  {t:"Verbal instruction & coaching",d:"Clear, concise, timely direction. Not “watch out!” but specific, actionable language: “Check your left mirror before initiating the lane change.” Timing matters — too early is noise, too late is useless."},
  {t:"Progressive skill building",d:"Understand where a student is on the learning curve and match your instruction to their level. A day-1 student backing for the first time needs different coaching than a day-20 student refining their offset."},
  {t:"Intervention techniques",d:"When and how to physically intervene (verbal first, then direct action). Know the threshold between “let them learn from the mistake” and “I need to take control now.” The truck has dual controls for a reason."},
  {t:"Communication techniques",d:"Active listening, questioning technique, feedback that builds confidence without masking deficiency, managing student frustration and anxiety."},
  {t:"Troubleshooting",d:"Diagnose why a student is struggling with a specific skill. Knowledge gap? Motor skill issue? Anxiety? Misunderstood reference points? Each root cause demands a different approach."},
];

const TEACH_MANOEUVRES = [
  {t:"Pre-trip inspection instruction",d:"Walk a student through a systematic inspection, teach them to identify defects, build their confidence to do it independently. Explain what you're looking for, why it matters, and what a fail looks like."},
  {t:"Coupling & uncoupling",d:"Teach the full sequence safely. Emphasis on tug-test verification, air line connection order, landing gear operation. Common errors: not confirming fifth-wheel lock, incorrect air line connection, forgetting to raise landing gear fully."},
  {t:"Backing manoeuvres",d:"Teach straight-line, offset, and alley-dock using reference points, mirror technique, and GOAL. Articulate your own reference points clearly enough to replicate. Common errors: over-steering corrections, fixating on one mirror, not using GOAL."},
  {t:"Urban driving",d:"Teach intersection management, lane positioning, turning radius for a tractor-trailer, blind spots in congestion. Common errors: wide right turns cutting off adjacent lanes, late mirror checks, incorrect gear selection approaching intersections."},
  {t:"Highway driving",d:"Teach merge technique, following distance, lane discipline, speed management on grades. Emphasis on BC's mountainous terrain: gear selection for descents, engine brake use, runaway lane awareness."},
  {t:"Mountain driving",d:"Teach grade assessment, proper descent gear selection (the “gear you go up in is the gear you go down in” principle — a simplification), brake temperature management, chain-up procedures."},
  {t:"Shifting instruction (manual)",d:"Teach progressive shifting, skip-shifting, double-clutching, rev-matching on a 13-speed (or 18-speed) Eaton Fuller. Translate your muscle memory into verbal instruction. Common errors: grinding gears, lugging, over-revving, missing the gate on a split shift."},
];

const PITFALLS = [
  {t:"Over-instructing",d:"Giving too many corrections at once. A student processes one at a time. Prioritize safety-critical items, then layer in refinement."},
  {t:"Assuming student knowledge",d:"You've driven 10+ years. A MELT student may have never touched a truck. Don't skip steps because they're obvious to you."},
  {t:"Late intervention",d:"Waiting too long because you “want to see if they figure it out.” If a safety hazard is developing, intervene verbally immediately."},
  {t:"Grabbing the wheel",d:"Physical intervention is a last resort. Verbal direction first. Grabbing the wheel regularly means your verbal instruction isn't clear enough or you're reading the situation too late."},
  {t:"Inconsistent assessment",d:"The same standard applies to every student. Document what you see, not what you feel about the student."},
  {t:"Not checking in",d:"Ask how they're feeling, what they're struggling with, what they want to work on. Instruction is a two-way conversation, not a broadcast."},
];

/* ============ PRE-TRIP CHEATSHEET (ICBC DCV Ch 8–10, BC law to Aug 27 2024) ============ */
// Air-brake test-sequence numbers (recited / demonstrated on the road test)
const ABN_TEST = [
  {v:"105–135 psi", k:"Governor CUT-OUT", d:"compressor stops pumping (724–931 kPa)"},
  {v:"before 80 psi", k:"Governor CUT-IN", d:"compressor must restart before this (552 kPa)"},
  {v:"at / above 60 psi", k:"Low-air warning", d:"must activate (414 kPa)"},
  {v:"20–45 psi", k:"Trailer air supply valve closes", d:"tractor protection (138–310 kPa)"},
  {v:"50 → 90 psi in 3 min", k:"Pressure build-up", d:"at fast idle 1,000–1,200 rpm (345–620 kPa)"},
  {v:"90–100 psi", k:"Leak-test application", d:"hold 1 min, engine off (620–690 kPa)"},
  {v:"≤ 4 psi / min", k:"Air-loss limit — single trailer", d:"≤ 6 psi/min with two trailers"},
  {v:"≥ 100 psi", k:"Before brake-response tests", d:"reservoir pressure (690 kPa)"},
];
// Limits & thresholds worth knowing cold
const ABN_LIMITS = [
  {v:"~150 psi", k:"Safety (pop-off) valve", d:"vents excess (1,034 kPa)"},
  {v:"1¾ in / 45 mm", k:"Applied-stroke limit — manual slack (Type 30)", d:"adjust if exceeded"},
  {v:"2 in / 50 mm", k:"Applied-stroke limit — automatic slack (Type 30)", d:"repair if exceeded"},
  {v:"½–¾ in / 12–20 mm", k:"Free (pry) stroke — good range", d:"applied good range 1–1½ in / 25–38 mm"},
  {v:"< ¼ in / 6.4 mm", k:"Drum lining — out of service", d:"air disc pad < ⅛ in / 3.2 mm"},
  {v:"as low as 20 psi", k:"Tractor protection closes", d:"preserves tractor air (138 kPa)"},
];

// Full ICBC Class 1 tractor-trailer pre-trip, in order. Items flagged ab:true are the air-brake portion.
const PRETRIP = [
  {id:"prep", t:"Before you begin", icon:"prep", note:"Set up so the vehicle can't move while spring brakes are released.", items:[
    {t:"Park & secure", d:"Level ground, off the roadway. Set parking brakes, shut off engine."},
    {t:"Block / chock the wheels", d:"In front of and behind a tire on the same axle — vehicle must not move when spring brakes release."},
    {t:"Gather equipment", d:"Flashlight, tire pressure gauge, chalk/marker, ruler, pry bar, wrench, timing device. Sturdy clothing, hard hat, eye protection."},
    {t:"Plan your circle", d:"Walk counter-clockwise so you face oncoming traffic. Remove the keys before going underneath."},
  ]},
  {id:"hood", t:"1 · Under hood", icon:"hood", note:"As you approach, look underneath for leaks. Drain reservoirs (road test: supply reservoir only).", items:[
    {t:"Licence plate", d:"Present and secure."},
    {t:"Fluids", d:"Engine oil, coolant, power steering, windshield washer — levels and condition (colour, smell)."},
    {t:"Belts", d:"Good tension; no cracks, fraying or missing teeth."},
    {t:"Hoses", d:"Connections secure; no kinks, leaks, cuts, abrasions or cracks."},
    {t:"Air compressor", d:"Lines secure (no kinks/leaks/cuts); compressor securely mounted.", ab:true},
    {t:"Steering components", d:"Shaft, box, tie-rods, idler arm, connections — secure, no bends or cracks."},
    {t:"Suspension (all wheels)", d:"Springs / torsion bars / walking beams; U-bolts; airbags; mounts secure."},
    {t:"Frame", d:"No cracks, broken welds, holes or damage — incl. cross members."},
    {t:"Tires / wheels / mud flaps", d:"Inflation, no bulges/cuts, tread depth, even wear, duals not touching; rims & lugs (rust streaks = loose); hub oil; mud flaps secure."},
    {t:"Foundation brakes", d:"Chambers & clamps secure, no cracks/leaks; pushrod travel within tolerance; slack adjuster, s-cam, bushings; air lines; drums not cracked; linings not contaminated, thickness OK. ROAD TEST: you must demonstrate setting up a manual slack adjuster.", ab:true},
    {t:"Close up", d:"Close and secure hood. Close the supply reservoir drain."},
  ]},
  {id:"cab", t:"2 · In cab", icon:"cab", note:"Ignition ON, then start the engine and check while air builds.", items:[
    {t:"Oil pressure warning", d:"Ignition on — light/gauge works. Then depress clutch, neutral, start engine."},
    {t:"Air pressure gauges", d:"Confirm only the supply reservoir was drained (others losing pressure = check-valve fault).", ab:true},
    {t:"Instrument panel", d:"Charge rate, oil pressure, coolant temp, fuel gauge, instrument lights — all respond."},
    {t:"Wipers / washers", d:"Work."},
    {t:"Heater / defroster", d:"Fan, heater and defroster positions work."},
    {t:"Interior lights", d:"Work."},
    {t:"Horns", d:"Air and electric horns work."},
    {t:"Emergency equipment", d:"Warning devices/flares & first aid kit present; fire extinguisher date valid."},
    {t:"Four-way flashers", d:"Both dash indicators work."},
    {t:"Seats & seatbelts", d:"Adjusted; fastening devices work and are accessible."},
    {t:"Mirrors", d:"Adjusted, clean, no cracks."},
    {t:"Windows / windshield", d:"Clean, no cracks; open and close."},
    {t:"Documentation", d:"Licence, registration, insurance (incl. trailers), logbook (if required), CVIP report & windshield decal (if required)."},
    {t:"Engine noises", d:"Listen for any unusual sounds."},
    {t:"Governor cut-out", d:"Confirm compressor stops pumping between 105 and 135 psi (724–931 kPa).", ab:true},
    {t:"Charge trailer", d:"Release all parking brakes and charge the trailer air system."},
  ]},
  {id:"abtest", t:"3 · Air brake system test", icon:"brake", note:"The numbers test. Start lowering pressure by pumping the brake pedal.", allAb:true, items:[
    {t:"① Governor cut-in", d:"Pump to ~80% of max (e.g. 100 psi if max 125). Pause — pressure must begin to build. Governor must cut in before pressure falls below 80 psi (552 kPa).", ab:true},
    {t:"② Low-air warning", d:"Pump down farther — warning device(s) activate at or above 60 psi (414 kPa).", ab:true},
    {t:"③ Trailer supply valve closes", d:"Pump down farther — trailer air supply valve closes when highest gauge reads 20–45 psi (138–310 kPa).", ab:true},
    {t:"④ Shut off engine", d:"Then go to the trailer.", ab:true},
    {t:"⑤ Trailer brakes applied", d:"At the trailer, confirm the trailer brakes have applied.", ab:true},
    {t:"⑥ Glad-hand check", d:"At rear of tractor, disconnect supply & control glad hands — no air escapes from tractor or trailer.", ab:true},
    {t:"⑦ Foot-valve check", d:"In cab, make a foot brake application — no air escapes through supply or control line.", ab:true},
    {t:"⑧ Reconnect & inspect lines", d:"Reconnect glad hands; check electrical; lines undamaged, not chafing, enough slack for turns.", ab:true},
    {t:"⑨ Build-up rate", d:"Start engine — pressure builds 50→90 psi (345–620 kPa) within 3 min at fast idle (1,000–1,200 rpm).", ab:true},
  ]},
  {id:"lights", t:"4 · Circle check for lights", icon:"light", note:"Turn on left signal, low beams & clearance lights, then walk counter-clockwise.", items:[
    {t:"Front / left lights", d:"Left turn signals, low-beam headlights, tail lights, licence-plate lights, clearance lights — work, clean, correct colour."},
    {t:"High beams & right signal", d:"Back in cab: switch to high beams + right signal; confirm both work."},
    {t:"Brake lights", d:"Confirm brake lights work. Then turn off lights, release parking brakes, turn off engine."},
  ]},
  {id:"mech", t:"5 · Mechanical circle check", icon:"circle", note:"Left tractor → fifth wheel → left trailer → rear → right trailer → underside → right tractor.", items:[
    {t:"Left side of tractor", d:"Mirrors, steps & handrails, fuel tanks/caps/lines, exhaust, batteries (secure, no corrosion/leaks), storage compartments, body; frame; tractor rear suspension; drive wheels (tires/wheels/mud flaps); cab protector & cargo lift if equipped; licence plate."},
    {t:"Fifth wheel connection", d:"Plate flush to trailer apron — NO daylight; slider locked & secure with room to turn; locking jaws closed around the kingpin. (Pintle/ball hitch: not worn, locked & secure; safety chains/cables sound & attached.) Use a flashlight from both sides and underneath.", ab:false},
    {t:"Left side of trailer", d:"Load security devices tight; landing gear fully raised & handle secured; frame; suspension (incl. sliding axle); tires/wheels/mud flaps; trailer body."},
    {t:"Rear of trailer", d:"Load security & plate. Open doors — cargo secured; doors/lift/tailgate mounted, closed/latched."},
    {t:"Right side of trailer", d:"Load security; frame; suspension; tires/wheels; body + CVIP decal."},
    {t:"Underside", d:"Foundation brakes (check brake adjustment); axle assembly; frame; air reservoirs secure; suspension; drive line / u-joints.", ab:true},
    {t:"Right side of tractor", d:"Mirrors, steps & handrails, fuel tanks, exhaust, batteries, storage, body + CVIP decal, frame, fifth wheel (or pintle/ball hitch), suspension, drive wheels (tires/wheels/mud flaps)."},
  ]},
  {id:"final", t:"6 · Leakage, tug & response tests", icon:"test", note:"Back in cab — air ≥ 100 psi (690 kPa), parking brakes released.", items:[
    {t:"Applied leakage test", d:"Full application 90–100 psi (620–690 kPa), hold 1 min: after the initial drop, air loss ≤ 4 psi/min (single) / 6 psi/min (two trailers); no audible leaks. Then set parking brakes, remove wheel blocks.", ab:true},
    {t:"Trailer tug test", d:"Engine on, air in range. Release tractor brakes, apply trailer brakes; in low gear gently tug — must not move.", ab:true},
    {t:"Tractor tug test", d:"Apply tractor parking brakes; charge & release trailer brakes; in low gear gently tug — must not move.", ab:true},
    {t:"Brake response", d:"Release all brakes; move ahead slowly and gently apply the foot brake — confirm response.", ab:true},
    {t:"Trailer brake response", d:"Move ahead slowly and gently apply the hand valve — confirm trailer brake response.", ab:true},
    {t:"Steering slack", d:"Move the steering wheel to check for excessive slack or lash."},
  ]},
];

const CHECKLIST = [
  {sec:"Pre-Course Preparation", items:[
    "Review the ICBC MELT Curriculum Framework document (MV7612)",
    "Complete required online e-learning modules (fuel efficiency, human trafficking awareness)",
    "Review the six practical assessment forms (MV7604B, C, E, F, G, H)",
    "Review the MV7604 student attendance tracking form",
    "Review the MV2970 Declaration of Completion process",
    "Brush up on federal Hours of Service regulations and ELD requirements",
    "Review NSC Standard 10 (cargo securement) key requirements",
    "Review CVSE weight and dimension regulations for BC",
  ]},
  {sec:"During the Course", items:[
    "Take detailed notes during each MOC classroom session",
    "Practice articulating your driving knowledge in instructional language",
    "Practice giving corrections using specific, actionable phrasing",
    "Practice conducting a full pre-trip inspection while narrating each step",
    "Practice coupling/uncoupling while narrating each step",
    "Practice teaching backing manoeuvres to a peer",
    "Work through mock assessment scenarios with Cindy's feedback",
    "Identify your 3 weakest areas and request extra practice time",
  ]},
  {sec:"Assessment Preparation (June 18)", items:[
    "Review all MOC classroom notes",
    "Be able to list the 10 MELT modules and their key learning outcomes",
    "Be able to explain the assessment process and documentation requirements",
    "Be ready to demonstrate a teaching segment on any practical skill",
    "Be ready to conduct a mock practical assessment using ICBC forms",
    "Prepare clear, concise coaching language for common student errors",
  ]},
];

const SCHEDULE = [
  {date:"Jun 9", dow:"Tuesday", trainer:"Cindy", tags:["MOC Session 1","On-road"], focus:"Program kickoff. MELT standards & policies; begin instructor-seat observation work."},
  {date:"Jun 10", dow:"Wednesday", trainer:"Cindy", tags:["MOC Session 2","On-road"], focus:"Practical & classroom training requirements; coaching language and timing of corrections."},
  {date:"Jun 11", dow:"Thursday", trainer:"Cindy", tags:["On-road"], focus:"Teaching backing & coupling from the passenger seat; reference points and GOAL."},
  {date:"Jun 12", dow:"Friday", trainer:"Cindy", tags:["MOC Session 3","On-road"], focus:"Student assessment & qualification; the six MV7604 forms; mock assessments."},
  {date:"Jun 15", dow:"Monday", trainer:"Cindy", tags:["On-road"], focus:"Urban & highway teaching; intervention technique; progressive skill building."},
  {date:"Jun 16", dow:"Tuesday", trainer:"Kash", tags:["On-road"], focus:"Mountain driving instruction; gear selection for descents; engine brake & chain-up."},
  {date:"Jun 17", dow:"Wednesday", trainer:"Cindy", tags:["MOC Session 4","On-road"], focus:"Ethics, air brakes overview, e-learning wrap-up; full mock assessment & feedback."},
  {date:"Jun 18", dow:"Thursday", trainer:"Cindy", tags:["Assessment 11:00–1:00"], focus:"Final instructor assessment: teach a lesson segment, on-road coaching demo, knowledge verification, mock assessment administration.", assessment:true},
];

const RESOURCES = [
  {t:"ICBC MELT Curriculum Framework (MV7612)", u:"https://partners.icbc.com/assets/2LKxMkSx9vVb2r77NEZo1V/melt-curriculum-framework.pdf"},
  {t:"ICBC MELT FAQ", u:"https://www.icbc.com/assets/pa/7iiwc0XuKFVu86iODrPsJb/melt-faqs.pdf"},
  {t:"ICBC Teach MELT (partner portal)", u:"https://partners.icbc.com/driver-training/driving-schools/teach-melt"},
  {t:"Valley Driving School — MOC page", u:"https://www.valleydrivingschool.com/instructor-training-moc"},
  {t:"Valley Driving School — Truck Instructor Training", u:"https://www.valleydrivingschool.com/truck-instructor-training-program"},
  {t:"NSC Standard 16 — Entry-Level Training (via CCMTA)", u:"https://ccmta.ca/en/publications/standards"},
  {t:"NSC Standard 10 — Cargo Securement (via CCMTA)", u:"https://ccmta.ca/en/publications/standards"},
];

/* Quiz pool */
const QUIZ_POOL = [
  {q:"What is the total minimum number of hours for the BC Class 1 MELT course?",a:"140 hours",opts:["120 hours","140 hours","160 hours","180 hours"],ex:"The MELT course is a minimum of 140 hours total."},
  {q:"What is the standard maximum in-cab instruction per day?",a:"4 hours",opts:["2 hours","4 hours","6 hours","8 hours"],ex:"In-cab max is 4 hrs/day — exception up to 10 hrs when doing 20 hrs of total highway/mountain driving."},
  {q:"Maximum in-class instruction per day?",a:"7 hours",opts:["6 hours","7 hours","8 hours","4 hours"],ex:"In-class max is 7 hrs/day."},
  {q:"Maximum virtual-classroom instruction per day?",a:"4 hours",opts:["3 hours","4 hours","6 hours","7 hours"],ex:"Virtual classroom is capped at 4 hrs/day."},
  {q:"Maximum in-yard instruction per day?",a:"6 hours",opts:["4 hours","5 hours","6 hours","8 hours"],ex:"In-yard max is 6 hrs/day."},
  {q:"Maximum combined instruction per day?",a:"8 hours",opts:["6 hours","7 hours","8 hours","10 hours"],ex:"Combined instruction is capped at 8 hrs/day."},
  {q:"Maximum in-person classroom size?",a:"15 students",opts:["10 students","12 students","15 students","20 students"],ex:"In-person classrooms max out at 15 students."},
  {q:"Maximum virtual class size?",a:"10 students",opts:["8 students","10 students","12 students","15 students"],ex:"Virtual classes max out at 10 students."},
  {q:"Maximum in-yard students per instructor?",a:"4",opts:["2","3","4","6"],ex:"Max 4 students per instructor in the yard."},
  {q:"Maximum in-cab students per instructor?",a:"2",opts:["1","2","3","4"],ex:"Max 2 students per instructor in the cab."},
  {q:"Course completion window from the start date?",a:"365 days",opts:["180 days","270 days","365 days","730 days"],ex:"A student has 365 days from start to complete the course."},
  {q:"Minimum course duration?",a:"30 days",opts:["14 days","21 days","30 days","60 days"],ex:"The course must run a minimum of 30 days."},
  {q:"How much flexible practical time must be used?",a:"6 hours",opts:["4 hours","6 hours","8 hours","10 hours"],ex:"6 hours of flexible practical time — mandatory, used per the instructor's professional judgment."},
  {q:"Written assessment pass threshold?",a:"80%",opts:["70%","75%","80%","85%"],ex:"Students need 80% overall minimum on written assessments."},
  {q:"How many times must each practical assessment be passed?",a:"Twice",opts:["Once","Twice","Three times","Four times"],ex:"Each practical assessment must be passed on two separate occasions."},
  {q:"How long must the Declaration of Completion be retained?",a:"6 years",opts:["3 years","5 years","6 years","10 years"],ex:"Records (incl. the DoC) are retained by the school for 6 years."},
  {q:"Minimum manual transmission for MELT training?",a:"13-speed",opts:["9-speed","10-speed","13-speed","18-speed"],ex:"Manual training requires a minimum 13-speed transmission."},
  {q:"Maximum automatic-transmission training hours?",a:"10 hours",opts:["5 hours","10 hours","15 hours","20 hours"],ex:"Up to 10 hours may be done in an automatic."},
  {q:"Minimum loaded vehicle weight for the training vehicle?",a:"32,000 kg GVW",opts:["24,000 kg GVW","28,000 kg GVW","32,000 kg GVW","36,000 kg GVW"],ex:"The training vehicle must be at least 32,000 kg GVW loaded."},
  {q:"Minimum trailer length for the training vehicle?",a:"48 ft",opts:["40 ft","45 ft","48 ft","53 ft"],ex:"Trailer minimum is 48 ft (14.63 m)."},
  {q:"Minimum kingpin-to-rear-axle distance?",a:"41 ft",opts:["36 ft","38 ft","41 ft","45 ft"],ex:"Kingpin-to-rear-axle minimum is 41 ft (12.5 m)."},
  {q:"Which form assesses Highway and Mountain Driving?",a:"MV7604B",opts:["MV7604B","MV7604C","MV7604G","MV7604H"],ex:"MV7604B — Highway and Mountain Driving."},
  {q:"Which form covers the Pre-Trip Inspection (incl. air brake pre-trip)?",a:"MV7604C",opts:["MV7604B","MV7604C","MV7604E","MV7604F"],ex:"MV7604C — Vehicle Pre-Trip Inspection including the air brake pre-trip."},
  {q:"Which form covers Coupling/Uncoupling?",a:"MV7604E",opts:["MV7604C","MV7604E","MV7604F","MV7604G"],ex:"MV7604E — Coupling/Uncoupling."},
  {q:"Which form covers Chain-up, fifth-wheel slide, and trailer axle slide?",a:"MV7604F",opts:["MV7604E","MV7604F","MV7604G","MV7604H"],ex:"MV7604F — Chain-up, fifth-wheel slide, trailer axle slide."},
  {q:"Which form covers the three Backing manoeuvres?",a:"MV7604G",opts:["MV7604E","MV7604F","MV7604G","MV7604H"],ex:"MV7604G — Backing (straight-line, alley-dock, offset)."},
  {q:"Which form covers Basic and Urban Driving?",a:"MV7604H",opts:["MV7604B","MV7604F","MV7604G","MV7604H"],ex:"MV7604H — Basic and Urban Driving."},
  {q:"What is the form number for the Declaration of Completion?",a:"MV2970",opts:["MV2970","MV7604A","MV7612","MV7604"],ex:"MV2970 is the Declaration of Completion."},
  {q:"Within how many business days must the DoC reach ICBC in Victoria?",a:"10 business days",opts:["5 business days","10 business days","15 business days","30 business days"],ex:"The ICBC copy of the MV2970 must be mailed to Victoria within 10 business days."},
  {q:"How many total hours is Module 10 (Air Brakes)?",a:"11 hours",opts:["6.5 hours","11 hours","32 hours","47 hours"],ex:"Module 10 is 11 hrs (9 theory + 2 in-yard). Total air-brake practical across the course is 6.5 hrs. Note: 47 is the course's total THEORY hours — a common mix-up."},
  {q:"The 47 figure in the MELT framework refers to what?",a:"Total theory hours across all modules",opts:["Air brake hours","Total theory hours across all modules","On-road hours","Total course hours"],ex:"Of 134 instructional hours: 47 theory + 19 in-yard + 18 off-road + 50 on-road; plus 6 flexible = 140."},
  {q:"What is the minimum on-road driving time?",a:"50 hours",opts:["40 hours","46 hours","50 hours","56 hours"],ex:"On-road must never be less than 50 hrs (loaded 38 + bobtail 4 + unloaded 4 + choice 4). With flexible time it can reach 56."},
  {q:"Which is the largest MELT module by hours?",a:"Module 3 — Driving Techniques (46 hrs)",opts:["Module 5 — Off-Road Tasks (25 hrs)","Module 3 — Driving Techniques (46 hrs)","Module 7 — Vehicle Inspection (13.5 hrs)","Module 10 — Air Brakes (11 hrs)"],ex:"Module 3 is 46 hrs (6 theory + 40 on-road) — the biggest single module."},
  {q:"How many hours of on-road driving must be with a loaded trailer?",a:"38 hours",opts:["30 hours","38 hours","40 hours","50 hours"],ex:"Of the 50 on-road hours: 38 loaded, 4 bobtail, 4 unloaded, 4 student/instructor choice."},
  {q:"How many written assessments does MELT require?",a:"Three",opts:["One","Two","Three","Six"],ex:"Three written assessments, 80% overall minimum, invigilated by the school; the final written assessment must be in person."},
  {q:"What share of theory hours may be self-paced LMS?",a:"Up to 50%",opts:["Up to 25%","Up to 50%","Up to 75%","100%"],ex:"Up to 50% of theory may be self-paced LMS; the rest is in-person or live virtual classroom."},
  {q:"What must a student hold before enrolling in MELT?",a:"A valid BC Class 1 learner's licence (LDL)",opts:["A Class 5 licence","A valid BC Class 1 learner's licence (LDL)","A clean abstract only","A Class 3 licence"],ex:"Students need a valid Class 1 LDL. There's no advanced standing — the full 140 hours are required."},
  {q:"Which NSC standard governs the component inspection in Module 7?",a:"NSC Standard 13",opts:["NSC Standard 10","NSC Standard 13","NSC Standard 16","NSC Standard 11"],ex:"Module 7.2 requires inspecting each component/system listed in NSC Standard 13 for minor and major defects."},
  {q:"The three MELT learning environments are:",a:"In-class, in-yard, in-cab",opts:["Theory, practical, exam","In-class, in-yard, in-cab","Classroom, simulator, road","Lecture, lab, highway"],ex:"In-class, in-yard, and in-cab (in-cab = off-road manoeuvres + on-road driving)."},
  {q:"Who is the regulator of BC's driver-training industry?",a:"ICBC",opts:["ICBC","CVSE","Ministry of Transportation","CCMTA"],ex:"ICBC licenses schools and instructors and oversees MELT delivery."},
  {q:"Which National Safety Code standard governs Class 1 entry-level training?",a:"NSC Standard 16",opts:["NSC Standard 10","NSC Standard 14","NSC Standard 16","NSC Standard 9"],ex:"NSC Standard 16 covers entry-level training."},
  {q:"Which National Safety Code standard governs cargo securement?",a:"NSC Standard 10",opts:["NSC Standard 10","NSC Standard 16","NSC Standard 7","NSC Standard 13"],ex:"NSC Standard 10 covers cargo securement."},
  {q:"How many years must you have held a valid Class 1 licence to qualify for instructor training?",a:"3 years",opts:["1 year","2 years","3 years","5 years"],ex:"A valid Class 1 licence for at least 3 years with a clean record is required."},
  {q:"The classroom lecture cap is what share of delivery?",a:"50%",opts:["30%","40%","50%","60%"],ex:"No more than 50% of classroom delivery may be lecture."},
  {q:"Which form records all passed assessments?",a:"MV7604A",opts:["MV7604A","MV2970","MV7612","MV7604C"],ex:"All passed assessments are recorded on MV7604A."},
];

/* Flashcard decks */
function buildDecks(){
  const numbers = NUMBERS.map((x,i)=>({id:"num"+i, q:x.k, a:x.v, sub:x.note||""}));
  const forms = ASSESSMENTS.map((x,i)=>({id:"frm"+i, q:x.f, a:x.t, sub:x.d}));
  const formsRev = ASSESSMENTS.map((x,i)=>({id:"frmr"+i, q:x.t, a:x.f, sub:""}));
  const modules = MODULES.map((x,i)=>({id:"mod"+i, q:"Module "+x.n, a:x.t, sub:x.d}));
  const reg = [
    {id:"r1",q:"Declaration of Completion form?",a:"MV2970",sub:"School issues it; ICBC copy to Victoria within 10 business days; school copy kept 6 years."},
    {id:"r2",q:"Curriculum Framework document?",a:"MV7612",sub:"The ICBC MELT Curriculum Framework."},
    {id:"r3",q:"Student attendance tracking form?",a:"MV7604",sub:"Records minimum mandatory hours per module."},
    {id:"r4",q:"Form recording all passed assessments?",a:"MV7604A",sub:"All passed assessments are recorded here."},
    {id:"r5",q:"Air Brakes (Module 10) total hours?",a:"11 hours",sub:"9 theory + 2 in-yard practical. (Total air-brake practical across the course is 6.5 hrs.)"},
    {id:"r6",q:"NSC standard — entry-level training?",a:"Standard 16",sub:"Class 1 entry-level training."},
    {id:"r7",q:"NSC standard — cargo securement?",a:"Standard 10",sub:"Cargo securement."},
    {id:"r8",q:"Theory designations required to teach MELT theory?",a:"MELT + GLT",sub:"Class 1 instructor licence with MELT and GLT designations (air-brake theory also needs an air-brake instructor licence)."},
    {id:"r9",q:"Integration rule?",a:"No front-loading theory",sub:"Theory and practical must interleave throughout the course."},
    {id:"r10",q:"Years of Class 1 licence to qualify as instructor?",a:"3 years",sub:"Valid Class 1 for 3+ years with a clean record."},
    {id:"r11",q:"Total THEORY hours across all 10 modules?",a:"47 hours",sub:"Of 134 instructional hours: 47 theory + 19 in-yard + 18 off-road + 50 on-road, plus 6 flexible = 140."},
    {id:"r12",q:"Minimum on-road driving hours?",a:"50 hours",sub:"Loaded 38 + bobtail 4 + unloaded 4 + choice 4. Never less than 50; up to 56 with flexible time."},
    {id:"r13",q:"Largest module by hours?",a:"Module 3 — Driving Techniques",sub:"46 hours (6 theory + 40 on-road)."},
    {id:"r14",q:"Three learning environments?",a:"In-class · In-yard · In-cab",sub:"In-cab covers off-road manoeuvres + on-road driving. Simulators supplement in-class only — can't replace in-cab/in-yard hours."},
    {id:"r15",q:"How many written assessments, and pass rate?",a:"3 written · 80%",sub:"Invigilated by the school; the final written assessment must be in person."},
    {id:"r16",q:"Max share of theory deliverable by self-paced LMS?",a:"50%",sub:"The other 50% must be in-person or live virtual classroom. Final written assessments in person."},
    {id:"r17",q:"Student prerequisite to enrol in MELT?",a:"Valid BC Class 1 LDL",sub:"A Class 1 learner's licence. No advanced standing — the full 140 hrs are required; out-of-jurisdiction training is non-transferable."},
    {id:"r18",q:"Break rule during in-class/in-yard?",a:"15 min after 2 hrs",sub:"Or a 10-minute break after 90 minutes. Instructional hours are 60 min; breaks aren't counted."},
  ];
  const errors = ERRORS.map((x,i)=>({id:"err"+i, q:x.e, a:x.c, sub:x.r}));
  const airbrakes = [...ABN_TEST,...ABN_LIMITS].map((x,i)=>({id:"ab"+i, q:x.k+"?", a:x.v, sub:x.d}));
  return {
    all:{label:"All", cards:[...numbers,...forms,...modules,...reg,...errors,...airbrakes]},
    numbers:{label:"Key Numbers", cards:numbers},
    airbrakes:{label:"Air Brake Numbers", cards:airbrakes},
    forms:{label:"MV7604 Forms", cards:[...forms,...formsRev]},
    modules:{label:"10 Modules", cards:modules},
    reg:{label:"Regulatory", cards:reg},
    errors:{label:"Student Errors", cards:errors},
  };
}
const DECKS = buildDecks();

/* Study sections eligible for "studied" progress */
const STUDY_SECTIONS = ["overview","numbers","hours","modules","assessments","regulatory","instructor","errors"];

/* =====================================================================
   STORE — localStorage-backed progress
   ===================================================================== */
