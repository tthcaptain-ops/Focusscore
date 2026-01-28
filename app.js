// FocusScore MVP — full polished build (filters + dropdowns + charts + rubric + color coding)

function scoreClass(score){
  if(score >= 8) return "score-green";
  if(score >= 6) return "score-yellow";
  if(score >= 4) return "score-orange";
  return "score-red";
}

function labelFor(score){
  if(score >= 8) return "Great for focus";
  if(score >= 6) return "Decent";
  if(score >= 4) return "Mixed";
  return "Risky";
}

function pctFrom04(v){
  const clamped = Math.max(0, Math.min(4, v));
  return Math.round((clamped / 4) * 100);
}

function typeLabel(t){
  if(t === "show") return "TV SHOW";
  if(t === "youtube") return "YOUTUBE";
  return "GAME";
}

function initials(name){
  const parts = name.replace(/[()]/g,"").split(" ").filter(Boolean);
  return parts.slice(0,2).map(w=>w[0]).join("").toUpperCase();
}

// 20 U.S.-oriented starter entries for your MVP (you can edit scores later)
const CONTENT = [
  // Shows (US)
  { id:"bluey", name:"Bluey", type:"show", age:"3-7", score:8.7,
    breakdown:{ pacing:3.5, stimulation:2.5, cognitive:3.5, interruptions:3.5, narrative:3.8 },
    why:"Story-based episodes with calmer pacing. Attention is rewarded with continuity and meaning.",
    alternatives:["Daniel Tiger’s Neighborhood","Sesame Street","Numberblocks"]
  },
  { id:"peppa", name:"Peppa Pig", type:"show", age:"3-7", score:7.2,
    breakdown:{ pacing:3.0, stimulation:2.6, cognitive:2.6, interruptions:3.6, narrative:3.0 },
    why:"Simple stories and steady pacing. Usually less chaotic than hyper-fast preschool edits.",
    alternatives:["Bluey","Daniel Tiger’s Neighborhood"]
  },
  { id:"daniel", name:"Daniel Tiger’s Neighborhood", type:"show", age:"2-4", score:6.8,
    breakdown:{ pacing:3.0, stimulation:3.0, cognitive:2.6, interruptions:3.5, narrative:2.8 },
    why:"Calm pacing with repetition that supports patience and listening.",
    alternatives:["Bluey","Sesame Street"]
  },
  { id:"sesame", name:"Sesame Street", type:"show", age:"3-7", score:6.5,
    breakdown:{ pacing:2.6, stimulation:2.7, cognitive:2.9, interruptions:3.4, narrative:2.4 },
    why:"Educational and engaging, though the segment format can feel jumpy.",
    alternatives:["Daniel Tiger’s Neighborhood","Numberblocks"]
  },
  { id:"paw", name:"Paw Patrol", type:"show", age:"3-7", score:5.4,
    breakdown:{ pacing:2.2, stimulation:2.0, cognitive:2.1, interruptions:3.4, narrative:2.4 },
    why:"Action-heavy and stimulation-forward; still has an episode arc.",
    alternatives:["Bluey","Wild Kratts"]
  },
  { id:"wildkratts", name:"Wild Kratts", type:"show", age:"3-7", score:6.9,
    breakdown:{ pacing:2.7, stimulation:2.5, cognitive:3.0, interruptions:3.5, narrative:2.7 },
    why:"Curiosity-driven educational format that supports longer attention arcs.",
    alternatives:["Bluey","Sesame Street"]
  },

  // YouTube
  { id:"cocomelon", name:"Cocomelon", type:"youtube", age:"2-4", score:2.1,
    breakdown:{ pacing:0.6, stimulation:0.7, cognitive:1.0, interruptions:2.2, narrative:1.0 },
    why:"Fast cuts and intense stimulation. Low sustained thinking demand; can train constant switching.",
    alternatives:["Super Simple Songs","PBS KIDS"]
  },
  { id:"vlad", name:"Vlad and Niki", type:"youtube", age:"3-7", score:2.4,
    breakdown:{ pacing:0.9, stimulation:1.0, cognitive:1.1, interruptions:2.0, narrative:1.0 },
    why:"High-energy novelty scenes that can reinforce quick dopamine loops.",
    alternatives:["PBS KIDS","Bluey"]
  },
  { id:"diana", name:"Kids Diana Show", type:"youtube", age:"3-7", score:2.6,
    breakdown:{ pacing:1.0, stimulation:1.1, cognitive:1.2, interruptions:2.0, narrative:1.1 },
    why:"Attention-grabbing edits with low sustained cognitive demand.",
    alternatives:["PBS KIDS","Numberblocks"]
  },
  { id:"nastya", name:"Like Nastya", type:"youtube", age:"3-7", score:3.5,
    breakdown:{ pacing:1.4, stimulation:1.4, cognitive:1.6, interruptions:2.2, narrative:1.4 },
    why:"More story structure than shorts, but still high novelty/stimulation.",
    alternatives:["Bluey","Daniel Tiger’s Neighborhood"]
  },
  { id:"pinkfong", name:"Baby Shark (Pinkfong)", type:"youtube", age:"2-4", score:3.0,
    breakdown:{ pacing:1.2, stimulation:1.2, cognitive:1.3, interruptions:2.6, narrative:1.2 },
    why:"Catchy and repetitive; still stimulating depending on the episode.",
    alternatives:["Super Simple Songs","PBS KIDS"]
  },
  { id:"chuchu", name:"ChuChu TV", type:"youtube", age:"2-4", score:3.2,
    breakdown:{ pacing:1.2, stimulation:1.4, cognitive:1.4, interruptions:2.3, narrative:1.3 },
    why:"Nursery structure but often bright/fast visuals.",
    alternatives:["Super Simple Songs","PBS KIDS"]
  },
  { id:"supersimple", name:"Super Simple Songs", type:"youtube", age:"2-4", score:5.6,
    breakdown:{ pacing:2.4, stimulation:2.3, cognitive:2.0, interruptions:2.8, narrative:2.0 },
    why:"Calmer pacing and predictable patterns compared to many kids channels.",
    alternatives:["Daniel Tiger’s Neighborhood","Numberblocks"]
  },
  { id:"ryan", name:"Ryan’s World", type:"youtube", age:"7-12", score:4.0,
    breakdown:{ pacing:1.8, stimulation:1.8, cognitive:1.7, interruptions:2.4, narrative:1.6 },
    why:"Novelty-heavy with frequent attention hooks and brand/merch energy.",
    alternatives:["MythBusters","How-it’s-made style shows"]
  },
  { id:"pbs", name:"PBS KIDS", type:"youtube", age:"3-7", score:7.0,
    breakdown:{ pacing:2.8, stimulation:2.8, cognitive:2.8, interruptions:3.4, narrative:2.6 },
    why:"Education-first content with calmer pacing than typical entertainment channels.",
    alternatives:["Daniel Tiger’s Neighborhood","Sesame Street"]
  },
  { id:"blippi", name:"Blippi", type:"youtube", age:"2-4", score:4.2,
    breakdown:{ pacing:2.0, stimulation:1.9, cognitive:1.8, interruptions:2.4, narrative:1.6 },
    why:"Often educational themes, but delivery can be high-energy with attention hooks.",
    alternatives:["PBS KIDS","Daniel Tiger’s Neighborhood"]
  },
  { id:"numberblocks", name:"Numberblocks", type:"show", age:"3-7", score:7.4,
    breakdown:{ pacing:2.8, stimulation:2.4, cognitive:3.2, interruptions:3.6, narrative:2.6 },
    why:"Math-focused structure supports cognitive engagement and sustained attention.",
    alternatives:["Sesame Street","PBS KIDS"]
  },

  // Games
  { id:"roblox", name:"Roblox", type:"game", age:"7-12", score:6.0,
    breakdown:{ pacing:2.4, stimulation:2.2, cognitive:2.6, interruptions:3.0, narrative:1.6 },
    why:"Focus impact varies by experience; some are chaotic and stimulation-heavy.",
    alternatives:["Minecraft","Offline sports/hobby time"]
  },
  { id:"minecraft", name:"Minecraft", type:"game", age:"7-12", score:7.8,
    breakdown:{ pacing:3.0, stimulation:2.8, cognitive:3.4, interruptions:3.8, narrative:2.0 },
    why:"Supports planning and creativity; best in creative/build modes.",
    alternatives:["LEGO building (offline)","Puzzle games (offline-first)"]
  },
  { id:"amongus", name:"Among Us", type:"game", age:"8-12", score:4.5,
    breakdown:{ pacing:2.0, stimulation:2.2, cognitive:2.4, interruptions:2.8, narrative:1.2 },
    why:"Fast rounds can encourage switching, but includes deduction elements.",
    alternatives:["Board games","Puzzle games"]
  },
  { id:"subway", name:"Subway Surfers", type:"game", age:"8-12", score:4.8,
    breakdown:{ pacing:2.2, stimulation:2.2, cognitive:2.0, interruptions:2.2, narrative:1.0 },
    why:"Endless runner loops reward quick reactions and repetition.",
    alternatives:["Sports practice","Creative building games"]
  }
];

// DOM
const listEl = document.getElementById("list");
const detailEl = document.getElementById("detail");
const countEl = document.getElementById("count");

const searchEl = document.getElementById("search");
const ageEl = document.getElementById("age");
const typeEl = document.getElementById("type");
const sortEl = document.getElementById("sort");
const resetEl = document.getElementById("reset");

let selectedId = null;

function barHTML(label, v04){
  const pct = pctFrom04(v04);
  return `
    <div class="barRow">
      <div class="barLabel">${label}</div>
      <div class="barTrack">
        <div class="barFill" style="width:${pct}%;"></div>
      </div>
    </div>
  `;
}

function renderDetail(item){
  selectedId = item.id;

  const cls = scoreClass(item.score);
  const b = item.breakdown;

  detailEl.innerHTML = `
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
      <div class="sectionTitle">Breakdown charts</div>
      <div class="bars">
        ${barHTML("Pacing (25%)", b.pacing)}
        ${barHTML("Stimulation (20%)", b.stimulation)}
        ${barHTML("Cognitive (25%)", b.cognitive)}
        ${barHTML("Interruptions (15%)", b.interruptions)}
        ${barHTML("Narrative (15%)", b.narrative)}
      </div>
    </div>

    <div class="section">
      <div class="sectionTitle">Higher-focus alternatives</div>
      <ul>
        ${(item.alternatives || []).map(a => `<li>${a}</li>`).join("")}
      </ul>
    </div>

    <div class="section">
      <div class="sectionTitle">Objective scoring rubric (0–4 each)</div>
      <div class="rubric">
        <div class="rubricHead">Use this to keep rankings consistent across reviewers</div>
        <table>
          <tr><th>Pacing</th><td>Count scene/cut changes in 60 seconds (more cuts = lower score).</td></tr>
          <tr><th>Stimulation</th><td>Frequency of loud/flash/chaos spikes (more spikes = lower score).</td></tr>
          <tr><th>Cognitive</th><td>Planning/problem-solving vs passive consumption (more thinking = higher score).</td></tr>
          <tr><th>Interruptions</th><td>Ads, autoplay loops, algorithm pulls (more interruptions = lower score).</td></tr>
          <tr><th>Narrative</th><td>Does attention get rewarded with continuity/story payoff?</td></tr>
        </table>
      </div>
    </div>
  `;
}

function renderList(items){
  listEl.innerHTML = "";
  countEl.textContent = `${items.length} items`;

  if(!items.length){
    listEl.innerHTML = `<div class="empty">No matches. Try clearing filters.</div>`;
    detailEl.innerHTML = `<div class="empty">No item selected.</div>`;
    return;
  }

  // If selected item disappears due to filters, select top item
  if(!items.some(x => x.id === selectedId)) selectedId = items[0].id;

  items.forEach(item => {
    const cls = scoreClass(item.score);

    const row = document.createElement("div");
    row.className = "row";
    row.addEventListener("click", ()=> renderDetail(item));

    row.innerHTML = `
      <div class="rowLeft">
        <div class="thumb">${initials(item.name)}</div>
        <div class="nameBlock">
          <div class="name">${item.name}</div>
          <div class="meta">${typeLabel(item.type)} • Ages ${item.age}</div>
        </div>
      </div>

      <div class="scorePill ${cls}">
        <span class="scoreNum">${item.score.toFixed(1)}/10</span>
        <span>${labelFor(item.score)}</span>
      </div>
    `;

    listEl.appendChild(row);
  });

  const selected = items.find(x => x.id === selectedId) || items[0];
  renderDetail(selected);
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

// init
selectedId = CONTENT.slice().sort((a,b)=>b.score-a.score)[0]?.id || null;
apply();
