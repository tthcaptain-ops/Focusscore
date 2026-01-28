// FocusScore MVP (UI version)
// Edit the CONTENT array to add more shows/apps/games.

const WEIGHTS = {
  pacing: 0.25,
  stimulation: 0.20,
  cognitive: 0.25,
  interruptions: 0.15,
  narrative: 0.15
};

function computeFocusScore(b) {
  const idx =
    b.pacing * WEIGHTS.pacing +
    b.stimulation * WEIGHTS.stimulation +
    b.cognitive * WEIGHTS.cognitive +
    b.interruptions * WEIGHTS.interruptions +
    b.narrative * WEIGHTS.narrative;

  const score = idx * 2.5;          // 0–4 => 0–10
  const clamped = Math.max(1, Math.min(10, score)); // keep 1–10 for presentation
  return Math.round(clamped * 10) / 10;
}

const CONTENT = [
  {
    id: "cocomelon",
    name: "Cocomelon",
    type: "show",
    ageBand: "4-6",
    why: "Extremely fast pacing and high stimulation. Very little sustained thinking required.",
    breakdown: { pacing: 0, stimulation: 0, cognitive: 1, interruptions: 2, narrative: 1 },
    alternatives: ["Bluey", "Daniel Tiger’s Neighborhood"]
  },
  {
    id: "bluey",
    name: "Bluey",
    type: "show",
    ageBand: "4-6",
    why: "Story-based episodes with calmer pacing. Attention is rewarded with continuity and meaning.",
    breakdown: { pacing: 3, stimulation: 3, cognitive: 3, interruptions: 4, narrative: 4 },
    alternatives: ["Daniel Tiger’s Neighborhood"]
  },
  {
    id: "daniel_tiger",
    name: "Daniel Tiger’s Neighborhood",
    type: "show",
    ageBand: "4-6",
    why: "Very calm pacing and repetition that encourages listening and patience.",
    breakdown: { pacing: 3, stimulation: 3, cognitive: 3, interruptions: 4, narrative: 4 },
    alternatives: ["Bluey"]
  },
  {
    id: "paw_patrol",
    name: "Paw Patrol",
    type: "show",
    ageBand: "4-6",
    why: "More action/stimulation than story shows, but still has an episode arc.",
    breakdown: { pacing: 2, stimulation: 2, cognitive: 2, interruptions: 4, narrative: 3 },
    alternatives: ["Bluey"]
  },
  {
    id: "youtube_shorts",
    name: "YouTube Shorts",
    type: "youtube",
    ageBand: "7-10",
    why: "Rapid-cut novelty with algorithm pulls. Trains constant switching instead of sustained attention.",
    breakdown: { pacing: 0, stimulation: 0, cognitive: 0, interruptions: 1, narrative: 0 },
    alternatives: ["MythBusters", "Curated long-form educational YouTube"]
  },
  {
    id: "roblox_unstructured",
    name: "Roblox (unstructured)",
    type: "game",
    ageBand: "7-10",
    why: "Focus quality varies by game. Often high stimulation with inconsistent cognitive demands.",
    breakdown: { pacing: 1, stimulation: 1, cognitive: 2, interruptions: 2, narrative: 1 },
    alternatives: ["Minecraft (Creative Mode)"]
  },
  {
    id: "minecraft_creative",
    name: "Minecraft (Creative Mode)",
    type: "game",
    ageBand: "7-10",
    why: "Encourages planning and building, which supports sustained attention and creativity.",
    breakdown: { pacing: 3, stimulation: 2, cognitive: 3, interruptions: 4, narrative: 2 },
    alternatives: ["LEGO building (offline)", "Puzzle games (offline-first)"]
  },
  {
    id: "mythbusters",
    name: "MythBusters",
    type: "show",
    ageBand: "7-10",
    why: "Curiosity-driven format with longer attention arcs and cause-effect thinking.",
    breakdown: { pacing: 3, stimulation: 2, cognitive: 3, interruptions: 4, narrative: 3 },
    alternatives: ["Nature documentaries", "How-it’s-made style shows"]
  }
].map(x => ({ ...x, focusScore: computeFocusScore(x.breakdown) }));

// --- UI ---
const $ = (id) => document.getElementById(id);

const listEl = $("list");
const detailEl = $("detail");
const countEl = $("count");

const searchEl = $("search");
const ageEl = $("age");
const typeEl = $("type");
const sortEl = $("sort");
const resetEl = $("reset");

function scoreLabel(score) {
  if (score >= 8) return "Great for focus";
  if (score >= 6) return "Decent";
  if (score >= 4) return "Mixed";
  return "Risky";
}

function barPct(value0to4) {
  return `${Math.round((value0to4 / 4) * 100)}%`;
}

function renderDetail(item) {
  const b = item.breakdown;

  detailEl.innerHTML = `
    <div class="title" style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
      <span>${item.name}</span>
      <span class="pill"><span class="score">${item.focusScore}</span>/10</span>
    </div>
    <div class="muted" style="margin-top:6px;">${item.type.toUpperCase()} • Ages ${item.ageBand} • ${scoreLabel(item.focusScore)}</div>

    <div class="kpi">
      <span class="pill">Pacing: ${b.pacing}/4</span>
      <span class="pill">Stimulation: ${b.stimulation}/4</span>
      <span class="pill">Cognitive: ${b.cognitive}/4</span>
      <span class="pill">Interruptions: ${b.interruptions}/4</span>
      <span class="pill">Narrative: ${b.narrative}/4</span>
    </div>

    <div class="section">
      <div class="title">Why it scored this way</div>
      <div style="margin-top:6px; line-height:1.55;">${item.why}</div>
    </div>

    <div class="section">
      <div class="title">Breakdown bars</div>

      <div style="margin-top:10px;">
        <div class="small">Pacing (25%)</div>
        <div class="bar"><div style="width:${barPct(b.pacing)}"></div></div>
      </div>

      <div style="margin-top:10px;">
        <div class="small">Stimulation (20%)</div>
        <div class="bar"><div style="width:${barPct(b.stimulation)}"></div></div>
      </div>

      <div style="margin-top:10px;">
        <div class="small">Cognitive Engagement (25%)</div>
        <div class="bar"><div style="width:${barPct(b.cognitive)}"></div></div>
      </div>

      <div style="margin-top:10px;">
        <div class="small">Interruptions (15%)</div>
        <div class="bar"><div style="width:${barPct(b.interruptions)}"></div></div>
      </div>

      <div style="margin-top:10px;">
        <div class="small">Narrative Continuity (15%)</div>
        <div class="bar"><div style="width:${barPct(b.narrative)}"></div></div>
      </div>
    </div>

    <div class="section">
      <div class="title">Higher-focus alternatives</div>
      <ul style="margin:8px 0 0 18px; line-height:1.6;">
        ${item.alternatives.map(a => `<li>${a}</li>`).join("")}
      </ul>
      <div class="small" style="margin-top:6px;">Starter recs for testing. You’ll expand with feedback.</div>
    </div>

    <div class="section" style="padding-top:12px; border-top:1px solid #e6e6e6;">
      <div class="title">How scoring stays consistent</div>
      <div class="small" style="margin-top:6px; line-height:1.5;">
        Each category is scored 0–4 using fixed definitions. Two reviewers can rate the same content and average scores if they differ.
      </div>
    </div>
  `;
}

function renderList(items) {
  listEl.innerHTML = "";
  countEl.textContent = String(items.length);

  if (items.length === 0) {
    const empty = document.createElement("div");
    empty.className = "muted";
    empty.style.padding = "12px 2px";
    empty.textContent = "No matches. Try clearing filters.";
    listEl.appendChild(empty);
    return;
  }

  for (const item of items) {
    const row = document.createElement("div");
    row.className = "item";
    row.onclick = () => renderDetail(item);

    const left = document.createElement("div");
    const title = document.createElement("div");
    title.className = "title";
    title.textContent = item.name;

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = `${item.type.toUpperCase()} • Ages ${item.ageBand}`;

    left.appendChild(title);
    left.appendChild(meta);

    const right = document.createElement("div");
    right.className = "pill";
    right.innerHTML = `<span class="score">${item.focusScore}</span>/10 • ${scoreLabel(item.focusScore)}`;

    row.appendChild(left);
    row.appendChild(right);

    listEl.appendChild(row);
  }
}

function applyFilters() {
  const q = searchEl.value.trim().toLowerCase();
  const age = ageEl.value;
  const type = typeEl.value;
  const sort = sortEl.value;

  let items = [...CONTENT];

  if (q) items = items.filter(x => x.name.toLowerCase().includes(q));
  if (age !== "all") items = items.filter(x => x.ageBand === age);
  if (type !== "all") items = items.filter(x => x.type === type);

  if (sort === "score_desc") items.sort((a,b) => b.focusScore - a.focusScore);
  if (sort === "score_asc") items.sort((a,b) => a.focusScore - b.focusScore);
  if (sort === "name_asc") items.sort((a,b) => a.name.localeCompare(b.name));

  renderList(items);
}

searchEl.addEventListener("input", applyFilters);
ageEl.addEventListener("change", applyFilters);
typeEl.addEventListener("change", applyFilters);
sortEl.addEventListener("change", applyFilters);

resetEl.addEventListener("click", () => {
  searchEl.value = "";
  ageEl.value = "all";
  typeEl.value = "all";
  sortEl.value = "score_desc";
  applyFilters();
});

// First load
applyFilters();
renderDetail(CONTENT.slice().sort((a,b)=>b.focusScore-a.focusScore)[0]);
