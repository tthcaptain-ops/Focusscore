function scoreClass(score) {
  if (score >= 8) return "score-green";
  if (score >= 6) return "score-yellow";
  if (score >= 4) return "score-orange";
  return "score-red";
}

const DATA = [
  { name: "Bluey", type: "TV Show", age: "3–7", score: 8.7, why: "Calm pacing, story-based episodes." },
  { name: "Peppa Pig", type: "TV Show", age: "3–7", score: 7.2, why: "Simple narratives, steady pacing." },
  { name: "Sesame Street", type: "TV Show", age: "3–7", score: 6.5, why: "Educational segments; some jumpy formatting." },
  { name: "Paw Patrol", type: "TV Show", age: "3–7", score: 5.4, why: "Action-heavy and stimulation-focused." },

  { name: "Cocomelon", type: "YouTube", age: "2–4", score: 2.1, why: "Fast cuts and constant stimulation." },
  { name: "Super Simple Songs", type: "YouTube", age: "2–4", score: 5.6, why: "More predictable pacing and structure." },
  { name: "PBS KIDS", type: "YouTube", age: "3–7", score: 7.0, why: "Education-forward content, calmer pacing." },

  { name: "Minecraft", type: "Game", age: "7–12", score: 7.8, why: "Encourages planning and creativity (varies by mode)." },
  { name: "Roblox", type: "Game", age: "7–12", score: 6.0, why: "Varies heavily by game experience." },
  { name: "Among Us", type: "Game", age: "8–12", score: 4.5, why: "Fast rounds; some deduction but can drive switching." }
];

const listEl = document.getElementById("list");
const detailEl = document.getElementById("detail");

function renderList() {
  listEl.innerHTML = "";
  DATA.forEach(item => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.innerHTML = `
      <div>
        <div class="name">${item.name}</div>
        <div class="meta">${item.type} • Ages ${item.age}</div>
      </div>
      <div class="score-pill ${scoreClass(item.score)}">
        ${item.score.toFixed(1)}/10
      </div>
    `;
    div.onclick = () => renderDetail(item);
    listEl.appendChild(div);
  });
}

function renderDetail(item) {
  detailEl.innerHTML = `
    <h2 style="margin:0;font-weight:1000;">${item.name}</h2>
    <div class="meta">${item.type} • Ages ${item.age}</div>

    <div class="big-score ${scoreClass(item.score)}">
      ${item.score.toFixed(1)}/10
    </div>

    <div class="section">
      <div style="font-weight:1000;margin-bottom:6px;">Why it scored this way</div>
      <div style="line-height:1.55;color:#0f172a;">${item.why}</div>
    </div>
  `;
}

renderList();
renderDetail(DATA[0]);
