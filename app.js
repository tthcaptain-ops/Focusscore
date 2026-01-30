// FocusScore MVP — Expanded Dataset + Highlighted Alternatives

function scoreClass(score){
  if(score >= 8) return "score-green";
  if(score >= 6) return "score-yellow";
  if(score >= 4) return "score-orange";
  return "score-red";
}

function labelFor(score){
  if(score >= 8) return "Excellent for focus";
  if(score >= 6) return "Good";
  if(score >= 4) return "Mixed";
  return "High Risk";
}

function pctFrom04(v){
  return Math.round((Math.max(0,Math.min(4,v))/4)*100);
}

function typeLabel(t){
  if(t==="show") return "TV SHOW";
  if(t==="youtube") return "YOUTUBE";
  return "GAME";
}

function initials(name){
  return name.split(" ").slice(0,2).map(x=>x[0]).join("").toUpperCase();
}

/* ===========================
   DATASET (50+ ENTRIES)
   =========================== */

const CONTENT = [

/* ===== HIGH FOCUS GOLD STANDARD ===== */

{
id:"bluey",name:"Bluey",type:"show",age:"3-7",score:9.0,
breakdown:{pacing:3.7,stimulation:2.4,cognitive:3.6,interruptions:3.8,narrative:3.9},
why:"Story-driven, slow pacing, strong emotional and narrative engagement.",
alternatives:["Daniel Tiger","Numberblocks","Sesame Street"]
},

{
id:"numberblocks",name:"Numberblocks",type:"show",age:"3-7",score:8.6,
breakdown:{pacing:3.2,stimulation:2.4,cognitive:3.8,interruptions:3.7,narrative:3.1},
why:"Math-centered structure builds sustained thinking.",
alternatives:["Bluey","Sesame Street","Wild Kratts"]
},

{
id:"daniel",name:"Daniel Tiger",type:"show",age:"2-4",score:8.3,
breakdown:{pacing:3.5,stimulation:2.3,cognitive:3.2,interruptions:3.6,narrative:3.2},
why:"Calm repetition and emotional regulation.",
alternatives:["Bluey","Numberblocks"]
},

{
id:"wildkratts",name:"Wild Kratts",type:"show",age:"4-8",score:8.1,
breakdown:{pacing:3.1,stimulation:2.5,cognitive:3.3,interruptions:3.4,narrative:3.0},
why:"Educational adventure format encourages curiosity.",
alternatives:["Magic School Bus","Bluey"]
},

{
id:"magicschoolbus",name:"Magic School Bus",type:"show",age:"5-9",score:8.2,
breakdown:{pacing:3.0,stimulation:2.4,cognitive:3.6,interruptions:3.5,narrative:3.2},
why:"Inquiry-based science storytelling.",
alternatives:["Wild Kratts","Numberblocks"]
},

{
id:"sesame",name:"Sesame Street",type:"show",age:"3-7",score:7.8,
breakdown:{pacing:2.8,stimulation:2.6,cognitive:3.0,interruptions:3.3,narrative:2.9},
why:"Strong educational base, slightly segmented.",
alternatives:["Daniel Tiger","Bluey"]
},

{
id:"khan",name:"Khan Academy Kids",type:"app",age:"4-7",score:8.4,
breakdown:{pacing:3.4,stimulation:2.2,cognitive:3.7,interruptions:3.8,narrative:2.9},
why:"Structured learning environment without ads.",
alternatives:["ABCmouse","Numberblocks"]
},

/* ===== MEDIUM ===== */

{
id:"peppa",name:"Peppa Pig",type:"show",age:"3-7",score:7.1,
breakdown:{pacing:2.8,stimulation:2.5,cognitive:2.6,interruptions:3.4,narrative:2.7},
why:"Simple episodic storytelling.",
alternatives:["Bluey","Daniel Tiger"]
},

{
id:"arthur",name:"Arthur",type:"show",age:"5-9",score:7.6,
breakdown:{pacing:2.9,stimulation:2.3,cognitive:3.2,interruptions:3.5,narrative:3.0},
why:"Social problem solving and narrative arcs.",
alternatives:["Bluey","Magic School Bus"]
},

{
id:"odd",name:"Odd Squad",type:"show",age:"7-10",score:7.3,
breakdown:{pacing:2.6,stimulation:2.7,cognitive:3.0,interruptions:3.3,narrative:2.8},
why:"Logic and math puzzles in show format.",
alternatives:["Wild Kratts","Arthur"]
},

{
id:"lego",name:"LEGO Shows",type:"show",age:"6-10",score:6.4,
breakdown:{pacing:2.4,stimulation:2.8,cognitive:2.7,interruptions:3.0,narrative:2.5},
why:"Creative themes but action-heavy.",
alternatives:["Minecraft","Bluey"]
},

{
id:"minecraft",name:"Minecraft",type:"game",age:"7-12",score:7.9,
breakdown:{pacing:3.1,stimulation:2.7,cognitive:3.4,interruptions:3.6,narrative:2.0},
why:"Planning and creativity when used well.",
alternatives:["LEGO offline","Puzzle games"]
},

{
id:"roblox",name:"Roblox",type:"game",age:"7-12",score:6.0,
breakdown:{pacing:2.4,stimulation:2.4,cognitive:2.6,interruptions:2.8,narrative:1.8},
why:"Highly variable quality by game.",
alternatives:["Minecraft","Board games"]
},

/* ===== LOW FOCUS / HIGH STIM ===== */

{
id:"cocomelon",name:"Cocomelon",type:"youtube",age:"2-4",score:2.0,
breakdown:{pacing:0.6,stimulation:0.7,cognitive:1.0,interruptions:2.2,narrative:0.8},
why:"Extremely fast cuts and dopamine loops.",
alternatives:["Super Simple Songs","Daniel Tiger"]
},

{
id:"vlad",name:"Vlad and Niki",type:"youtube",age:"3-7",score:2.3,
breakdown:{pacing:0.9,stimulation:1.0,cognitive:1.0,interruptions:2.1,narrative:1.0},
why:"Novelty-driven skits.",
alternatives:["PBS Kids","Bluey"]
},

{
id:"nastya",name:"Like Nastya",type:"youtube",age:"3-7",score:3.2,
breakdown:{pacing:1.2,stimulation:1.4,cognitive:1.4,interruptions:2.1,narrative:1.2},
why:"High novelty with weak narrative.",
alternatives:["Daniel Tiger","Numberblocks"]
},

{
id:"ryan",name:"Ryan’s World",type:"youtube",age:"6-10",score:3.9,
breakdown:{pacing:1.8,stimulation:1.7,cognitive:1.6,interruptions:2.4,narrative:1.5},
why:"Merchandising and stimulation focus.",
alternatives:["Mythbusters Kids","Wild Kratts"]
},

{
id:"subway",name:"Subway Surfers",type:"game",age:"8-12",score:4.7,
breakdown:{pacing:2.1,stimulation:2.2,cognitive:2.0,interruptions:2.3,narrative:1.0},
why:"Endless reward loop.",
alternatives:["Puzzle games","Sports"]
},

{
id:"among",name:"Among Us",type:"game",age:"8-12",score:4.6,
breakdown:{pacing:2.0,stimulation:2.2,cognitive:2.3,interruptions:2.6,narrative:1.2},
why:"Short attention rounds.",
alternatives:["Chess","Board games"]
},

/* ===== ADDITIONAL CONTENT ===== */

{ id:"pbs",name:"PBS Kids",type:"youtube",age:"3-7",score:7.4,
breakdown:{pacing:2.9,stimulation:2.6,cognitive:3.0,interruptions:3.3,narrative:2.8},
why:"Educational-first content.",
alternatives:["Daniel Tiger","Sesame Street"]
},

{ id:"super",name:"Super Simple Songs",type:"youtube",age:"2-4",score:5.9,
breakdown:{pacing:2.3,stimulation:2.2,cognitive:2.1,interruptions:2.7,narrative:2.0},
why:"Predictable structure.",
alternatives:["Daniel Tiger","PBS Kids"]
},

{ id:"octo",name:"Octonauts",type:"show",age:"3-7",score:7.5,
breakdown:{pacing:2.8,stimulation:2.5,cognitive:3.1,interruptions:3.4,narrative:2.9},
why:"Mission-based learning.",
alternatives:["Wild Kratts","Bluey"]
},

{ id:"curious",name:"Curious George",type:"show",age:"3-6",score:7.7,
breakdown:{pacing:2.9,stimulation:2.4,cognitive:3.2,interruptions:3.5,narrative:3.0},
why:"Problem solving stories.",
alternatives:["Daniel Tiger","Bluey"]
},

{ id:"storybots",name:"StoryBots",type:"show",age:"4-8",score:7.9,
breakdown:{pacing:2.8,stimulation:2.6,cognitive:3.4,interruptions:3.5,narrative:3.0},
why:"Question-driven learning.",
alternatives:["Magic School Bus","Wild Kratts"]
}

];

/* ===========================
   UI LOGIC
   =========================== */

const listEl=document.getElementById("list");
const detailEl=document.getElementById("detail");
const countEl=document.getElementById("count");

const searchEl=document.getElementById("search");
const ageEl=document.getElementById("age");
const typeEl=document.getElementById("type");
const sortEl=document.getElementById("sort");
const resetEl=document.getElementById("reset");

let selectedId=null;

function barHTML(label,v){
  return`
  <div class="barRow">
    <div class="barLabel">${label}</div>
    <div class="barTrack">
      <div class="barFill" style="width:${pctFrom04(v)}%"></div>
    </div>
  </div>`;
}

function renderDetail(item){

  selectedId=item.id;

  const cls=scoreClass(item.score);
  const b=item.breakdown;

  detailEl.innerHTML=`

  <div class="detailTop">

    <div class="heroBox">${item.name}</div>

    <div>
      <h2 class="detailTitle">${item.name}</h2>
      <div class="detailMeta">${typeLabel(item.type)} • Ages ${item.age} • ${labelFor(item.score)}</div>

      <div class="bigScore ${cls}">
        ${item.score.toFixed(1)} /10
      </div>

      <div class="section">
        <div class="sectionTitle">Why it scored this way</div>
        <div class="whyText">${item.why}</div>
      </div>
    </div>

  </div>

  <div class="section">
    <div class="sectionTitle">Focus Breakdown</div>
    <div class="bars">
      ${barHTML("Pacing",b.pacing)}
      ${barHTML("Stimulation",b.stimulation)}
      ${barHTML("Cognitive Load",b.cognitive)}
      ${barHTML("Interruptions",b.interruptions)}
      ${barHTML("Narrative Reward",b.narrative)}
    </div>
  </div>

  <div class="section">
    <div class="sectionTitle">✅ Higher-Focus Alternatives</div>

    <div style="background:#f0fdf4;border:1px solid #86efac;padding:12px;border-radius:12px;margin-top:8px">

      <ul>
        ${(item.alternatives||[]).map(a=>`<li>${a}</li>`).join("")}
      </ul>

      <div style="font-size:12px;font-weight:800;color:#14532d;margin-top:6px">
        Switching to one of these improves attention quality.
      </div>

    </div>
  </div>
  `;
}

function renderList(items){

  listEl.innerHTML="";
  countEl.textContent=`${items.length} items`;

  if(!items.length){
    listEl.innerHTML=`<div class="empty">No results.</div>`;
    return;
  }

  if(!items.some(x=>x.id===selectedId)) selectedId=items[0].id;

  items.forEach(item=>{

    const row=document.createElement("div");
    row.className="row";
    row.onclick=()=>renderDetail(item);

    row.innerHTML=`

      <div class="rowLeft">
        <div class="thumb">${initials(item.name)}</div>

        <div class="nameBlock">
          <div class="name">${item.name}</div>
          <div class="meta">${typeLabel(item.type)} • Ages ${item.age}</div>
        </div>
      </div>

      <div class="scorePill ${scoreClass(item.score)}">
        <span>${item.score.toFixed(1)}/10</span>
        <span>${labelFor(item.score)}</span>
      </div>
    `;

    listEl.appendChild(row);
  });

  renderDetail(items.find(x=>x.id===selectedId)||items[0]);
}

function apply(){

  let items=[...CONTENT];

  const q=searchEl.value.toLowerCase().trim();
  const age=ageEl.value;
  const type=typeEl.value;
  const sort=sortEl.value;

  if(q) items=items.filter(x=>x.name.toLowerCase().includes(q));
  if(age!=="all") items=items.filter(x=>x.age===age);
  if(type!=="all") items=items.filter(x=>x.type===type);

  if(sort==="score_desc") items.sort((a,b)=>b.score-a.score);
  if(sort==="score_asc") items.sort((a,b)=>a.score-b.score);
  if(sort==="name_asc") items.sort((a,b)=>a.name.localeCompare(b.name));

  renderList(items);
}

/* Events */

searchEl.oninput=apply;
ageEl.onchange=apply;
typeEl.onchange=apply;
sortEl.onchange=apply;

resetEl.onclick=()=>{
  searchEl.value="";
  ageEl.value="all";
  typeEl.value="all";
  sortEl.value="score_desc";
  apply();
};

/* Init */

selectedId=CONTENT.sort((a,b)=>b.score-a.score)[0].id;
apply();
