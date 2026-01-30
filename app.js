// FocusScore MVP — 50 Popular Items + Alternatives FIRST (most important section)

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

// IMPORTANT: Ages must match your dropdown options exactly:
// 2-4, 3-7, 7-12, 8-12
// Types must match: show, youtube, game

// ========== 50 POPULAR ITEMS TOTAL ==========
const CONTENT = [
  // ====== SHOWS (25) ======
  { id:"bluey", name:"Bluey", type:"show", age:"3-7", score:9.0,
    breakdown:{ pacing:3.7, stimulation:2.3, cognitive:3.6, interruptions:3.8, narrative:3.9 },
    why:"Calm pacing + story continuity rewards sustained attention instead of constant novelty.",
    alternatives:["Daniel Tiger’s Neighborhood","Numberblocks","Wild Kratts"]
  },
  { id:"spongebob", name:"SpongeBob SquarePants", type:"show", age:"7-12", score:5.4,
    breakdown:{ pacing:2.0, stimulation:2.1, cognitive:2.0, interruptions:3.0, narrative:1.8 },
    why:"Fast gags and high stimulation; attention is rewarded less through narrative continuity.",
    alternatives:["Phineas and Ferb","Arthur","Wild Kratts"]
  },
  { id:"pawpatrol", name:"Paw Patrol", type:"show", age:"3-7", score:5.6,
    breakdown:{ pacing:2.2, stimulation:2.2, cognitive:2.1, interruptions:3.1, narrative:2.2 },
    why:"Action-forward pacing increases stimulation; still has a clear episode arc.",
    alternatives:["Bluey","Octonauts","Wild Kratts"]
  },
  { id:"peppa", name:"Peppa Pig", type:"show", age:"3-7", score:7.1,
    breakdown:{ pacing:2.8, stimulation:2.6, cognitive:2.5, interruptions:3.4, narrative:2.7 },
    why:"Simple narrative and steady pacing; lower novelty than many preschool shows.",
    alternatives:["Bluey","Daniel Tiger’s Neighborhood","Curious George"]
  },
  { id:"daniel", name:"Daniel Tiger’s Neighborhood", type:"show", age:"2-4", score:8.3,
    breakdown:{ pacing:3.4, stimulation:2.4, cognitive:3.0, interruptions:3.6, narrative:3.2 },
    why:"Calm repetition supports patience and emotional regulation without constant stimulation spikes.",
    alternatives:["Bluey","Sesame Street","Mr. Rogers’ Neighborhood"]
  },
  { id:"sesame", name:"Sesame Street", type:"show", age:"3-7", score:7.7,
    breakdown:{ pacing:2.7, stimulation:2.7, cognitive:3.0, interruptions:3.3, narrative:2.7 },
    why:"Educational value is high; segment format can be a little “jumpy.”",
    alternatives:["Daniel Tiger’s Neighborhood","Numberblocks","Bluey"]
  },
  { id:"numberblocks", name:"Numberblocks", type:"show", age:"3-7", score:8.6,
    breakdown:{ pacing:3.0, stimulation:2.4, cognitive:3.8, interruptions:3.6, narrative:2.8 },
    why:"High thinking demand (patterns, numbers) rewards sustained attention.",
    alternatives:["Sesame Street","StoryBots","Bluey"]
  },
  { id:"storybots", name:"StoryBots", type:"show", age:"3-7", score:7.9,
    breakdown:{ pacing:2.8, stimulation:2.7, cognitive:3.3, interruptions:3.5, narrative:2.9 },
    why:"Question-driven structure keeps attention on a single objective rather than random clips.",
    alternatives:["Magic School Bus","Wild Kratts","Numberblocks"]
  },
  { id:"octonauts", name:"Octonauts", type:"show", age:"3-7", score:7.5,
    breakdown:{ pacing:2.8, stimulation:2.6, cognitive:3.0, interruptions:3.4, narrative:2.9 },
    why:"Mission-based format supports sustained attention with educational payoffs.",
    alternatives:["Wild Kratts","Bluey","Magic School Bus"]
  },
  { id:"wildkratts", name:"Wild Kratts", type:"show", age:"3-7", score:8.1,
    breakdown:{ pacing:3.0, stimulation:2.5, cognitive:3.3, interruptions:3.4, narrative:3.0 },
    why:"Curiosity + learning loops reward focus with meaning, not novelty switching.",
    alternatives:["Magic School Bus","Octonauts","Arthur"]
  },
  { id:"magicschoolbus", name:"Magic School Bus", type:"show", age:"7-12", score:8.0,
    breakdown:{ pacing:2.8, stimulation:2.5, cognitive:3.6, interruptions:3.4, narrative:3.0 },
    why:"Inquiry-based episodes require attention to follow cause/effect and explanations.",
    alternatives:["Wild Kratts","Odd Squad","Arthur"]
  },
  { id:"curiousgeorge", name:"Curious George", type:"show", age:"3-7", score:7.6,
    breakdown:{ pacing:2.9, stimulation:2.4, cognitive:3.1, interruptions:3.5, narrative:3.0 },
    why:"Problem-solving arcs encourage kids to track steps and outcomes.",
    alternatives:["Daniel Tiger’s Neighborhood","Bluey","Arthur"]
  },
  { id:"arthur", name:"Arthur", type:"show", age:"7-12", score:7.6,
    breakdown:{ pacing:2.8, stimulation:2.4, cognitive:3.2, interruptions:3.5, narrative:3.1 },
    why:"Longer story arcs and social problem-solving reward sustained attention.",
    alternatives:["Odd Squad","Wild Kratts","Magic School Bus"]
  },
  { id:"oddsquad", name:"Odd Squad", type:"show", age:"7-12", score:7.3,
    breakdown:{ pacing:2.6, stimulation:2.7, cognitive:3.1, interruptions:3.3, narrative:2.7 },
    why:"Puzzle/logic framing supports focus, though pacing can be quick.",
    alternatives:["Arthur","Magic School Bus","Wild Kratts"]
  },
  { id:"mickey", name:"Mickey Mouse Clubhouse", type:"show", age:"2-4", score:6.4,
    breakdown:{ pacing:2.5, stimulation:2.6, cognitive:2.6, interruptions:3.2, narrative:2.4 },
    why:"Interactive prompts help attention, but stimulation can be moderate.",
    alternatives:["Daniel Tiger’s Neighborhood","Bluey","Sesame Street"]
  },
  { id:"barney", name:"Barney & Friends", type:"show", age:"2-4", score:7.2,
    breakdown:{ pacing:3.0, stimulation:2.5, cognitive:2.6, interruptions:3.6, narrative:2.7 },
    why:"Slow pacing and predictable structure reduce novelty switching.",
    alternatives:["Mr. Rogers’ Neighborhood","Daniel Tiger’s Neighborhood","Sesame Street"]
  },
  { id:"mrrogers", name:"Mr. Rogers’ Neighborhood", type:"show", age:"2-4", score:9.2,
    breakdown:{ pacing:3.9, stimulation:3.4, cognitive:3.0, interruptions:3.9, narrative:3.7 },
    why:"Extremely calm pacing and deep narrative reward sustained attention and reflection.",
    alternatives:["Daniel Tiger’s Neighborhood","Sesame Street","Bluey"]
  },
  { id:"dora", name:"Dora the Explorer", type:"show", age:"3-7", score:6.9,
    breakdown:{ pacing:2.7, stimulation:2.7, cognitive:2.8, interruptions:3.3, narrative:2.6 },
    why:"Interactive structure supports attention; pacing still moves quickly at times.",
    alternatives:["Daniel Tiger’s Neighborhood","Bluey","Curious George"]
  },
  { id:"bubbleguppies", name:"Bubble Guppies", type:"show", age:"3-7", score:5.8,
    breakdown:{ pacing:2.2, stimulation:2.3, cognitive:2.2, interruptions:3.2, narrative:2.1 },
    why:"High energy and frequent musical shifts can increase switching.",
    alternatives:["Bluey","Octonauts","Wild Kratts"]
  },
  { id:"teenagemutant", name:"Teenage Mutant Ninja Turtles", type:"show", age:"7-12", score:5.5,
    breakdown:{ pacing:2.1, stimulation:2.2, cognitive:2.2, interruptions:3.0, narrative:2.1 },
    why:"Action-heavy episodes increase stimulation; narrative continuity varies.",
    alternatives:["Avatar: The Last Airbender","Arthur","Phineas and Ferb"]
  },
  { id:"avatar", name:"Avatar: The Last Airbender", type:"show", age:"8-12", score:8.2,
    breakdown:{ pacing:2.9, stimulation:2.7, cognitive:3.4, interruptions:3.5, narrative:3.6 },
    why:"Strong story arcs reward sustained attention across episodes and seasons.",
    alternatives:["Gravity Falls","Arthur","Magic School Bus"]
  },
  { id:"gravityfalls", name:"Gravity Falls", type:"show", age:"8-12", score:7.8,
    breakdown:{ pacing:2.7, stimulation:2.7, cognitive:3.2, interruptions:3.4, narrative:3.4 },
    why:"Mystery + continuity encourages attention to details and payoff over time.",
    alternatives:["Avatar: The Last Airbender","Phineas and Ferb","Arthur"]
  },
  { id:"phineas", name:"Phineas and Ferb", type:"show", age:"7-12", score:6.6,
    breakdown:{ pacing:2.4, stimulation:2.6, cognitive:2.7, interruptions:3.2, narrative:2.6 },
    why:"Fast comedic pacing but consistent episode structure can support attention.",
    alternatives:["Gravity Falls","Arthur","Avatar: The Last Airbender"]
  },
  { id:"pokemon", name:"Pokémon", type:"show", age:"7-12", score:6.3,
    breakdown:{ pacing:2.4, stimulation:2.6, cognitive:2.5, interruptions:3.2, narrative:2.6 },
    why:"Action + episodic format can be engaging but not always “deep focus.”",
    alternatives:["Avatar: The Last Airbender","Arthur","Gravity Falls"]
  },
  { id:"ben10", name:"Ben 10", type:"show", age:"7-12", score:5.9,
    breakdown:{ pacing:2.2, stimulation:2.4, cognitive:2.4, interruptions:3.2, narrative:2.2 },
    why:"Action-driven attention with moderate novelty switching.",
    alternatives:["Avatar: The Last Airbender","Gravity Falls","Arthur"]
  },

  // ====== YOUTUBE (15) ======
  { id:"cocomelon", name:"Cocomelon", type:"youtube", age:"2-4", score:2.1,
    breakdown:{ pacing:0.6, stimulation:0.7, cognitive:1.0, interruptions:2.2, narrative:0.9 },
    why:"Very fast cuts and constant novelty; trains attention switching.",
    alternatives:["Super Simple Songs","PBS KIDS","Daniel Tiger’s Neighborhood"]
  },
  { id:"vladniki", name:"Vlad and Niki", type:"youtube", age:"3-7", score:2.4,
    breakdown:{ pacing:0.9, stimulation:1.0, cognitive:1.1, interruptions:2.1, narrative:1.0 },
    why:"Novelty-driven skits with frequent attention hooks.",
    alternatives:["PBS KIDS","Bluey","Wild Kratts"]
  },
  { id:"likenastya", name:"Like Nastya", type:"youtube", age:"3-7", score:3.4,
    breakdown:{ pacing:1.2, stimulation:1.4, cognitive:1.5, interruptions:2.2, narrative:1.3 },
    why:"High novelty and stimulation; limited long-form cognitive tracking.",
    alternatives:["Bluey","Numberblocks","PBS KIDS"]
  },
  { id:"kidzdianashow", name:"Kids Diana Show", type:"youtube", age:"3-7", score:2.8,
    breakdown:{ pacing:1.0, stimulation:1.1, cognitive:1.2, interruptions:2.0, narrative:1.1 },
    why:"Attention hooks + rapid novelty shifts reduce sustained focus.",
    alternatives:["PBS KIDS","Bluey","Sesame Street"]
  },
  { id:"ryansworld", name:"Ryan’s World", type:"youtube", age:"7-12", score:4.0,
    breakdown:{ pacing:1.8, stimulation:1.8, cognitive:1.7, interruptions:2.4, narrative:1.6 },
    why:"Novelty-heavy content can encourage quick dopamine loops.",
    alternatives:["National Geographic Kids","PBS KIDS","Wild Kratts"]
  },
  { id:"superSimple", name:"Super Simple Songs", type:"youtube", age:"2-4", score:5.9,
    breakdown:{ pacing:2.3, stimulation:2.3, cognitive:2.0, interruptions:2.8, narrative:2.0 },
    why:"More predictable pacing and repetition than many kids channels.",
    alternatives:["Daniel Tiger’s Neighborhood","Sesame Street","Mr. Rogers’ Neighborhood"]
  },
  { id:"pbskidsyt", name:"PBS KIDS", type:"youtube", age:"3-7", score:7.2,
    breakdown:{ pacing:2.8, stimulation:2.8, cognitive:2.9, interruptions:3.4, narrative:2.6 },
    why:"Education-first content with calmer pacing than most entertainment channels.",
    alternatives:["Daniel Tiger’s Neighborhood","Wild Kratts","Sesame Street"]
  },
  { id:"blippi", name:"Blippi", type:"youtube", age:"2-4", score:4.3,
    breakdown:{ pacing:2.0, stimulation:1.9, cognitive:1.8, interruptions:2.4, narrative:1.6 },
    why:"Often educational themes, but delivery is high-energy with attention hooks.",
    alternatives:["PBS KIDS","Daniel Tiger’s Neighborhood","Sesame Street"]
  },
  { id:"pinkfong", name:"Pinkfong (Baby Shark)", type:"youtube", age:"2-4", score:3.1,
    breakdown:{ pacing:1.2, stimulation:1.2, cognitive:1.3, interruptions:2.6, narrative:1.2 },
    why:"Catchy and repetitive; still can be overstimulating depending on edits.",
    alternatives:["Super Simple Songs","PBS KIDS","Daniel Tiger’s Neighborhood"]
  },
  { id:"chuchutv", name:"ChuChu TV", type:"youtube", age:"2-4", score:3.3,
    breakdown:{ pacing:1.2, stimulation:1.4, cognitive:1.4, interruptions:2.3, narrative:1.3 },
    why:"Nursery format but often bright/fast visuals increase stimulation.",
    alternatives:["Super Simple Songs","PBS KIDS","Mr. Rogers’ Neighborhood"]
  },
  { id:"mothergoose", name:"Mother Goose Club", type:"youtube", age:"2-4", score:5.2,
    breakdown:{ pacing:2.1, stimulation:2.2, cognitive:1.9, interruptions:2.7, narrative:1.9 },
    why:"More structured than many channels; still music-driven and quick transitions.",
    alternatives:["Super Simple Songs","Daniel Tiger’s Neighborhood","PBS KIDS"]
  },
  { id:"natgeokids", name:"National Geographic Kids", type:"youtube", age:"7-12", score:7.6,
    breakdown:{ pacing:2.7, stimulation:2.7, cognitive:3.3, interruptions:3.3, narrative:2.9 },
    why:"Curiosity/learning framing supports sustained attention better than pure entertainment.",
    alternatives:["Wild Kratts","Magic School Bus","PBS KIDS"]
  },
  { id:"teded", name:"TED-Ed", type:"youtube", age:"8-12", score:7.4,
    breakdown:{ pacing:2.6, stimulation:2.8, cognitive:3.5, interruptions:3.3, narrative:2.7 },
    why:"Idea-driven content requires tracking explanations and cause/effect.",
    alternatives:["National Geographic Kids","Magic School Bus","Odd Squad"]
  },
  { id:"markrober", name:"Mark Rober", type:"youtube", age:"8-12", score:6.9,
    breakdown:{ pacing:2.4, stimulation:2.7, cognitive:3.2, interruptions:3.1, narrative:2.3 },
    why:"High engagement + curiosity; pacing can be quick but thinking demand is real.",
    alternatives:["TED-Ed","National Geographic Kids","Magic School Bus"]
  },
  { id:"dudeperfect", name:"Dude Perfect", type:"youtube", age:"7-12", score:4.6,
    breakdown:{ pacing:1.9, stimulation:2.0, cognitive:1.8, interruptions:2.6, narrative:1.6 },
    why:"Trick-shot novelty encourages quick hits and rapid attention resets.",
    alternatives:["Mark Rober","National Geographic Kids","Wild Kratts"]
  },

  // ====== GAMES (10) ======
  { id:"minecraft", name:"Minecraft", type:"game", age:"7-12", score:7.9,
    breakdown:{ pacing:3.1, stimulation:2.7, cognitive:3.4, interruptions:3.6, narrative:2.0 },
    why:"Planning and creativity can support focus—especially in build/creative modes.",
    alternatives:["LEGO building (offline)","Puzzle games","Sports practice"]
  },
  { id:"roblox", name:"Roblox", type:"game", age:"7-12", score:6.0,
    breakdown:{ pacing:2.4, stimulation:2.4, cognitive:2.6, interruptions:2.8, narrative:1.8 },
    why:"Quality varies heavily by experience; some modes are chaotic and loop-driven.",
    alternatives:["Minecraft","Board games","Creative offline hobbies"]
  },
  { id:"fortnite", name:"Fortnite", type:"game", age:"8-12", score:4.2,
    breakdown:{ pacing:1.8, stimulation:1.8, cognitive:2.3, interruptions:2.6, narrative:1.2 },
    why:"High stimulation + fast feedback loops can train constant scanning and switching.",
    alternatives:["Minecraft (creative)","Sports","Board games"]
  },
  { id:"amongus", name:"Among Us", type:"game", age:"8-12", score:4.6,
    breakdown:{ pacing:2.0, stimulation:2.2, cognitive:2.3, interruptions:2.6, narrative:1.2 },
    why:"Short rounds can encourage switching; some deduction helps cognitive engagement.",
    alternatives:["Chess","Board games","Puzzle games"]
  },
  { id:"subwaysurfers", name:"Subway Surfers", type:"game", age:"8-12", score:4.7,
    breakdown:{ pacing:2.1, stimulation:2.2, cognitive:2.0, interruptions:2.3, narrative:1.0 },
    why:"Endless runner loops reward quick hits more than sustained thinking.",
    alternatives:["Puzzle games","Sports","Creative building"]
  },
  { id:"mario", name:"Super Mario (Platformers)", type:"game", age:"7-12", score:6.8,
    breakdown:{ pacing:2.7, stimulation:2.8, cognitive:2.9, interruptions:3.4, narrative:1.8 },
    why:"Skill-building and progression can support focus without endless scrolling.",
    alternatives:["Puzzle games","Minecraft","Board games"]
  },
  { id:"pokemonGo", name:"Pokémon GO", type:"game", age:"7-12", score:5.8,
    breakdown:{ pacing:2.3, stimulation:2.5, cognitive:2.5, interruptions:2.9, narrative:1.6 },
    why:"Session-based play; can still become loop-driven but includes movement/outdoors.",
    alternatives:["Sports/outdoor play","Board games","Puzzle games"]
  },
  { id:"rocketleague", name:"Rocket League", type:"game", age:"7-12", score:5.9,
    breakdown:{ pacing:2.3, stimulation:2.4, cognitive:2.7, interruptions:3.0, narrative:1.2 },
    why:"Fast matches; some skill progression but high stimulation.",
    alternatives:["Sports practice","Chess","Puzzle games"]
  },
  { id:"animalcrossing", name:"Animal Crossing", type:"game", age:"7-12", score:8.1,
    breakdown:{ pacing:3.6, stimulation:3.2, cognitive:2.9, interruptions:3.6, narrative:2.6 },
    why:"Very calm pacing; supports planning and routine without frantic reward loops.",
    alternatives:["Stardew Valley","Minecraft (creative)","Offline hobbies"]
  },
  { id:"stardew", name:"Stardew Valley", type:"game", age:"8-12", score:8.0,
    breakdown:{ pacing:3.4, stimulation:3.1, cognitive:3.0, interruptions:3.6, narrative:2.5 },
    why:"Planning, routine, and long-term goals support deeper attention.",
    alternatives:["Animal Crossing","Minecraft (creative)","Board games"]
  }
];

// ===== UI wiring (unchanged) =====
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

  // ✅ Alternatives moved ABOVE "Why it scored this way"
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
          <div class="sectionTitle">✅ Higher-Focus Alternatives (Main Point)</div>

          <div style="
            background: rgba(34,197,94,.14);
            border: 1px solid rgba(34,197,94,.40);
            padding: 12px 12px;
            border-radius: 14px;
            box-shadow: 0 10px 18px rgba(2,6,23,.06);
          ">
            <div style="font-weight:1000; margin-bottom:6px; color:#14532d;">
              Better picks to swap in:
            </div>

            <ul style="margin:8px 0 0 18px;">
              ${(item.alternatives || []).map(a => `<li>${a}</li>`).join("")}
            </ul>

            <div style="font-size:12px; font-weight:900; color:#14532d; margin-top:10px;">
              The goal isn’t “no screens” — it’s choosing content that supports attention.
            </div>
          </div>
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
      <div class="sectionTitle">Objective scoring rubric (0–4 each)</div>
      <div class="rubric">
        <div class="rubricHead">Same criteria applied to every item</div>
        <table>
          <tr><th>Pacing</th><td>How fast scene/cut changes happen (more cuts = lower).</td></tr>
          <tr><th>Stimulation</th><td>Frequency/intensity of loud/flash/chaos spikes (more spikes = lower).</td></tr>
          <tr><th>Cognitive</th><td>Planning/problem-solving vs passive consumption (more thinking = higher).</td></tr>
          <tr><th>Interruptions</th><td>Ads, autoplay loops, algorithm pulls (more interruptions = lower).</td></tr>
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
