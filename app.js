const CONTENT = [
  { name: "Cocomelon", age: "4-6", score: 2.0, why: "Fast cuts, high stimulation." },
  { name: "Bluey", age: "4-6", score: 7.5, why: "Story-based, calmer pacing." },
  { name: "Minecraft (Creative)", age: "7-10", score: 6.5, why: "Planning and creativity." },
  { name: "YouTube Shorts", age: "7-10", score: 2.5, why: "Rapid cuts and constant novelty." }
];

const list = document.getElementById("list");
const detail = document.getElementById("detail");
const search = document.getElementById("search");
const age = document.getElementById("age");
const sort = document.getElementById("sort");

function render(items){
  list.innerHTML = "";
  items.forEach(i => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `<strong>${i.name}</strong><span class="pill">${i.score}/10</span>`;
    div.onclick = () => {
      detail.innerHTML = `<h3>${i.name}</h3><p><strong>Score:</strong> ${i.score}/10</p><p>${i.why}</p>`;
    };
    list.appendChild(div);
  });
}

function apply(){
  let items = CONTENT.filter(i =>
    i.name.toLowerCase().includes(search.value.toLowerCase()) &&
    (age.value === "all" || i.age === age.value)
  );
  items.sort((a,b)=> sort.value==="score_desc" ? b.score-a.score : a.score-b.score);
  render(items);
}

search.oninput = apply;
age.onchange = apply;
sort.onchange = apply;

apply();
