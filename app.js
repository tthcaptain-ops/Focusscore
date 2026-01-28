// FocusScore MVP — “mockup-style” UI
// Replace image URLs with your own if you want real thumbnails.
// (Works fine without images; it’ll show initials.)

function labelFor(score){
  if(score >= 8) return "Great for focus";
  if(score >= 6) return "Decent";
  if(score >= 4) return "Mixed";
  return "Risky";
}

function pillClass(score){
  if(score >= 8) return "pill-green";
  if(score >= 6) return "pill-yellow";
  if(score >= 4) return "pill-orange";
  return "pill-red";
}

function pctFrom04(v){ return Math.round((v/4)*100); }

const CONTENT = [
  // Shows (US)
  {
    id:"bluey", name:"Bluey", type:"show", age:"3-7",
    score:8.7,
    breakdown:{ pacing:3.5, stimulation:2.5, cognitive:3.5, interruptions:3.5, narrative:3.8 },
    why:"Story-based episodes with calmer pacing. Attention is rewarded with continuity and meaning.",
    alternatives:["Daniel Tiger’s Neighborhood","Sesame Street","Nature documentaries"],
    img:"" // optional
  },
  {
    id:"peppa", name:"Peppa Pig", type:"show", age:"3-7",
    score:7.2,
    breakdown:{ pacing:3.0, stimulation:2.6, cognitive:2.6, interruptions:3.6, narrative:3.0 },
    why:"Simple stories and steady pacing. Usually less chaotic than fast-cut preschool content.",
    alternatives:["Bluey","Daniel Tiger’s Neighborhood"],
    img:""
  },
  {
    id:"daniel", name:"Daniel Tiger’s Neighborhood", type:"show", age:"2-4",
    score:6.8,
    breakdown:{ pacing:3.0, stimulation:3.0, cognitive:2.6, interruptions:3.5, narrative:2.8 },
    why:"Calm pacing with repetition that supports patience and listening. Low ‘dopamine spike’ intensity.",
    alternatives:["Bluey","Sesame Street"],
    img:""
  },
  {
    id:"sesame", name:"Sesame Street", type:"show", age:"3-7",
    score:6.5,
    breakdown:{ pacing:2.6, stimulation:2.7, cognitive:2.9, interruptions:3.4, narrative:2.4 },
    why:"Educational segments with cognitive engagement, though format can be jumpy because it’s segment-based.",
    alternatives:["Daniel Tiger’s Neighborhood","Numberblocks"],
    img:""
  },
  {
    id:"paw", name:"Paw Patrol", type:"show", age:"3-7",
    score:5.4,
    breakdown:{ pacing:2.2, stimulation:2.0, cognitive:2.1, interruptions:3.4, narrative:2.4 },
    why:"More action and stimulation; still has an episode arc but tends to reward excitement over sustained focus.",
    alternatives:["Bluey","Wild Kratts"],
    img:""
  },

  // YouTube (big kids channels)
  {
    id:"cocomelon", name:"Cocomelon", type:"youtube", age:"2-4",
    score:2.1,
    breakdown:{ pacing:0.6, stimulation:0.7, cognitive:1.0, interruptions:2.2, narrative:1.0 },
    why:"Very fast cuts and intense stimulation. Low sustained thinking demand; can train constant switching.",
    alternatives:["Super Simple Songs (selected)","Daniel Tiger’s Neighborhood"],
    img:""
  },
  {
    id:"vlad", name:"Vlad and Niki", type:"youtube", age:"3-7",
    score:2.4,
    breakdown:{ pacing:0.9, stimulation:1.0, cognitive:1.1, interruptions:2.0, narrative:1.0 },
    why:"High-energy edits and novelty-driven scenes that can reinforce quick dopamine loops.",
    alternatives:["Bluey","PBS KIDS"],
    img:""
  },
  {
    id:"diana", name:"Kids Diana Show", type:"youtube", age:"3-7",
    score:2.6,
    breakdown:{ pacing:1.0, stimulation:1.1, cognitive:1.2, interruptions:2.0, narrative:1.1 },
    why:"Often fast-paced, attention-grabbing scenes with lower cognitive demand.",
    alternatives:["PBS KIDS","Bluey"],
    img:""
  },
  {
    id:"nastya", name:"Like Nastya", type:"youtube", age:"3-7",
    score:3.5,
    breakdown:{ pacing:1.4, stimulation:1.4, cognitive:1.6, interruptions:2.2, narrative:1.4 },
    why:"More story structure than pure shorts, but still high novelty and stimulation.",
    alternatives:["Bluey","Daniel Tiger’s Neighborhood"],
    img:""
  },
  {
    id:"pinkfong", name:"Baby Shark (Pinkfong)", type:"youtube", age:"2-4",
    score:3.0,
    breakdown:{ pacing:1.2, stimulation:1.2, cognitive:1.3, interruptions:2.6, narrative:1.2 },
    why:"Catchy and repetitive. Can be stimulating but usually more structured than random shorts.",
    alternatives:["Super Simple Songs (selected)","Daniel Tiger’s Neighborhood"],
    img:""
  },
  {
    id:"chuchu", name:"ChuChu TV", type:"youtube", age:"2-4",
    score:3.2,
    breakdown:{ pacing:1.2, stimulation:1.4, cognitive:1.4, interruptions:2.3, narrative:1.3 },
    why:"Nursery-style structure but can still be bright and fast, depending on the episode.",
    alternatives:["Super Simple Songs","PBS KIDS"],
    img:""
  },
  {
    id:"supersimple", name:"Super Simple Songs", type:"youtube", age:"2-4",
    score:5.6,
    breakdown:{ pacing:2.4, stimulation:2.3, cognitive:2.0, interruptions:2.8, narrative:2.0 },
    why:"Generally calmer pacing and predictable patterns; easier on attention than hyper-fast edits.",
    alternatives:["Daniel Tiger’s Neighborhood","Numberblocks"],
    img:""
  },
  {
    id:"ryan", name:"Ryan’s World", type:"youtube", age:"7-12",
    score:4.0,
    breakdown:{ pacing:1.8, stimulation:1.8, cognitive:1.7, interruptions:2.4, narrative:1.6 },
    why:"Entertaining but novelty-heavy with frequent attention grabs and brand/merch energy.",
    alternatives:["MythBusters","How-it’s-made style shows"],
    img:""
  },
  {
    id:"pbs", name:"PBS KIDS", type:"youtube", age:"3-7",
    score:7.0,
    breakdown:{ pacing:2.8, stimulation:2.8, cognitive:2.8, interruptions:3.4, narrative:2.6 },
    why:"Educational focus with calmer pacing and clearer learning goals than typical kids entertainment channels.",
    alternatives:["Daniel Tiger’s Neighborhood","Sesame Street"],
    img:""
  },

  // Games (US)
  {
    id:"minecraft", name:"Minecraft", type:"game", age:"7-12",
    score:7.8,
    breakdown:{ pacing:3.0, stimulation:2.8, cognitive:3.4, interruptions:3.8, narrative:2.0 },
    why:"Supports planning and creativity. Focus impact depends on mode and how it’s played.",
    alternatives:["LEGO building (offline)","Puzzle games (offline-first)"],
    img:""
  },
  {
    id:"roblox", name:"Roblox", type:"game", age:"7-12",
    score:6.0,
    breakdown:{ pacing:2.4, stimulation:2.2, cognitive:2.6, interruptions:3.0, narrative:1.6 },
    why:"Varies wildly by game. Some experiences are chaotic and stimulation-heavy; others can be constructive.",
    alternatives:["Minecraft","Offline sports / hobby time"],
    img:""
  },
  {
    id:"amongus", name:"Among Us", type:"game", age:"8-12",
    score:4.5,
    breakdown:{ pacing:2.0, stimulation:2.2, cognitive:2.4, interruptions:2.8, narrative:1.2 },
    why:"Social and fast rounds can encourage quick switching. Still has deduction elements.",
    alternatives:["Board games","Puzzle games"],
    img:""
  },
  {
    id:"subway", name:"Subway Surfers", type:"game", age:"8-12",
    score:4.8,
    breakdown:{ pacing:2.2, stimulation:2.2, cognitive:2.0, interruptions:2.2, narrative:1.0 },
    why:"Endless runner gameplay rewards quick reactions and repetition; can become autopilot/looped play.",
    alternatives:["Sports practice","Creative building games"],
    img:""
  },
  {
    id:"pbsgames", name:"PBS Kids Games", type:"game", age:"3-7",
    score:7.0,
    breakdown:{ pacing:2.8, stimulation:2.7, cognitive:2.9, interruptions:3.5, narrative:2.2 },
    why:"Educational mini-games designed for kids with less aggressive monetization and calmer pacing.",
    alternatives:["Reading apps (offline)","Puzzles"],
    img:""
  },

  // Two more common US kids items to round toward “20”
  {
    id:"blippi", name:"Blippi", type:"youtube", age:"2-4",
    score:4.2,
    breakdown:{ pacing:2.0, stimulation:1.9, cognitive:1.8, interruptions:2.4, narrative:1.6 },
    why:"Often educational themes, but delivery can be high-energy with frequent attention hooks.",
    alternatives:["PBS KIDS","Daniel Tiger’s Neighborhood"],
    img:""
  },
  {
    id:"numberblocks", name:"Numberblocks", type:"show", age:"3-7",
    score:7.4,
    breakdown:{ pacing:2.8, stimulation:2.4, cognitive:3.2, interruptions:3.6, narrative:2.6 },
    why:"Math-focused structure creates cognitive engagement; generally calmer than fast-cut entertainment.",
    alternatives:["Sesame Street","PBS KIDS"],
    img:""
  }
];

// --- UI ---
const listEl = document.getElementById("list");
const detailEl = document.getElementById("detail");
const countEl = document.getElementById("count");

const searchEl = document.getElementById("search");
const ageEl = document.getElementById("age");
const typeEl = document.getElementById("type");
const sortEl = document.getElementById("sort");
const resetEl = document.getElementById("reset");

function renderList(items){
  listEl.innerHTML = "";
  countEl.textContent = `${items.length} items`;

  if(items.length === 0){
    const d = document.createElement("div");
    d.className = "empty";
    d.textContent = "No matches. Try clearing filters.";
    listEl.appendChild(d);
    return;
  }

  items.forEach(item => {
    const row = document.createElement("div");
    row.className = "row";
    row.addEventListener("click", ()=> renderDetail(item));

    const left = document.createElement("div");
    left.className = "rowLeft";

    const thumb = document.createElement("div");
    thumb.className = "thumb";
    if(item.img){
      const im = document.createElement("img");
      im.src = item.img;
      im.alt = item.name;
      thumb.appendChild(im);
    } else {
      // initials fallback
      const initials = item.name.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase();
      thumb.textContent = initials;
    }

    const nameBlock = document.createElement("div");
    nameBlock.className = "nameBlock";

    const nm = document.createElement("div");
    nm.className = "name";
    nm.textContent = item.name;

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = `${item.type === "show" ? "TV SHOW" : item.type.toUpperCase()} • Ages ${item.age}`;

    nameBlock.appendChild(nm);
    nameBlock.appendChild(meta);

    left.appendChild(thumb);
    left.appendChild(nameBlock);

    const pill = document.createElement("div");
    pill.className = `scorePill ${pillClass(item.score)}`;
    pill.innerHTML = `<span class="scoreNum">${item.score.toFixed(1)}/10</span><span class="tag">${labelFor(item.score)}</span>`;

    row.appendChild(left);
    row.appendChild(pill);

    listEl.appendChild(row);
  });
}

function renderDetail(item){
  const b = item.breakdown;

  detailEl.innerHTML = `
    <div class="detailTop">
      <div class="heroImg">
        ${item.img ? `<img src="${item.img}" alt="${item.name}">` : `<div style="height:100%;display:grid;place-items:center;font-weight:900;color:rgba(15,23,42,.55);font-size:22px;">${item.name}</div>`}
      </div>

      <div>
        <h2 class="detailTitle">${item.name}</h2>
        <div class="detailMeta">
          ${item.type === "show" ? "TV Show" : item.type.toUpperCase()} • Ages ${item.age} • ${labelFor(item.score)}
        </div>
        <div class="bigScore">${item.score.toFixed(1)} /10</div>

        <div class="section">
          <div class="sectionTitle">Why it scored this way</div>
          <div class="whyText">${item.why}</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="sectionTitle">Breakdown bars</div>
      <div class="bars">
        ${barHTML("Pacing (25%)", b.pacing)}
        ${barHTML("Stimulation (20%)", b.stimulation)}
        ${barHTML("Cognitive Engagement (25%)", b.cognitive)}
        ${barHTML("Interruptions (15%)", b.interruptions)}
        ${barHTML("Narrative Continuity (15%)", b.narrative)}
      </div>
    </div>

    <div class="section">
      <div class="sectionTitle">Higher-focus alternatives</div>
      <ul>
        ${(item.alternatives || []).map(a => `<li>${a}</li>`).join("")}
      </ul>

      <div class="consistency">
        <b>Scoring consistency:</b> Fixed 0–4 rubric. Scores average between reviewers.
      </div>
    </div>
  `;
}

function barHTML(label, val04){
  const pct = pctFrom04(val04);
  return `
    <div class="barRow">
      <div class="barLabel">${label}</div>
      <div class="barTrack">
        <div class="barFill" style="width:${pct}%;"></div>
      </div>
    </div>
  `;
}

function apply(){
  const q = searchEl.value.trim().toLowerCase();
  const age = ageEl.value;
  const type = typeEl.value;
  const sort = sortEl.value;

  let items = [...CONTENT];

  if(q) items = items.filter(x => x.name.toLowerCase().includes(q));
  if(age !== "all") items = items.filter(x => x.age === age);
  if(type !== "all") items = items.filter(x => x.type === type);

  if(sort === "score_desc") items.sort((a,b)=> b.score - a.score);
  if(sort === "score_asc") items.sort((a,b)=> a.score - b.score);
  if(sort === "name_asc") items.sort((a,b)=> a.name.localeCompare(b.name));

  renderList(items);

  // keep detail sensible: if current selected missing, show top item
  if(items.length) renderDetail(items[0]);
  else detailEl.innerHTML = `<div class="empty">No item selected.</div>`;
}

searchEl.addEventListener("input", apply);
ageEl.addEventListener("change", apply);
typeEl.addEventListener("change", apply);
sortEl.addEventListener("change", apply);
resetEl.addEventListener("click", ()=>{
  searchEl.value="";
  ageEl.value="all";
  typeEl.value="all";
  sortEl.value="score_desc";
  apply();
});

// initial render
apply();
