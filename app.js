function scoreClass(score) {
  if (score >= 8) return "score-green";
  if (score >= 6) return "score-yellow";
  if (score >= 4) return "score-orange";
  return "score-red";
}

const DATA = [
  { name: "Bluey", type: "TV Show", age: "3–7", score: 8.7, why: "Calm pacing, story-based episodes." },
  { name: "Peppa Pig", type: "TV Show", age: "3–7", score: 7.2, why: "Simple narratives, steady pacing." },
  { name: "Paw Patrol", type: "TV Show", age: "3–7", score: 5.4, why: "Action-heavy and stimulation-focused." },
  { name: "Cocomelon", type: "YouTube", age: "2–4", score: 2.1, why: "Fast cuts and constant stimulation." },
  { name: "Super Simple Songs", type: "YouTube", age: "2–4", score: 5.6, why: "More predictable pacing." },
  { name: "Minecraft", type: "Game", age: "7–12", score: 7.8, why: "Encourages planning and creativity." },
  { name: "Roblox", type: "Game", age: "7–12", score: 6.0, why: "Varies heavily by game mode." }
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
        ${item.score}/10
      </div>
    `;
    div.onclick = () => renderDetail(item);
    listEl.appendChild(div);
  });
}

function renderDetail(item) {
  detailEl.innerHTML = `
    <h2>${item.name}</h2>
    <div class="meta">${item.type} • Ages ${item.age}</div>

    <div class="big-score ${scoreClass(item.score)}">
      ${item.score}/10
    </div>

    <div class="section">
      <strong>Why it scored this way</strong>
      <p>${item.why}</p>
    </div>
  `;
}

renderList();
