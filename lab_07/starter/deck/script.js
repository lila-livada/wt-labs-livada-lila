
const state = {
  query: "",       
  category: "all", 
  sortBy: "title", 
  battle: null,    
};

const deckEl = document.querySelector("#deck");
const summaryEl = document.querySelector("#summary");
const battleEl = document.querySelector("#battle");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#categoryFilter");
const sortSelect = document.querySelector("#sortBy");
const battleButton = document.querySelector("#battleButton");

function createEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function fillCategoryOptions() {
  const categories = [...new Set(cards.map((card) => card.category))].sort();
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.append(option);
  });
}

function fillSortOptions() {
  Object.keys(statInfo).forEach((key) => {
    const info = statInfo[key];
    const option = document.createElement("option");
    option.value = key;
    const directionText = info.higherWins ? "highest first" : "lowest first";
    option.textContent = `${info.label} (${directionText})`;
    sortSelect.append(option);
  });
}

function getVisibleCards() {
  let visible = cards;

  if (state.category !== "all") {
    visible = visible.filter((card) => card.category === state.category);
  }

  const query = state.query.trim().toLowerCase();
  if (query !== "") {
    visible = visible.filter((card) => card.title.toLowerCase().includes(query));
  }

  const sorted = [...visible];
  if (state.sortBy === "title") {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  } else if (statInfo[state.sortBy]) {
    const info = statInfo[state.sortBy];
    sorted.sort((a, b) =>
      info.higherWins ? b[state.sortBy] - a[state.sortBy] : a[state.sortBy] - b[state.sortBy]
    );
  }

  return sorted;
}

function createCardElement(card, highlightStat) {
  const article = createEl("article", "card");

  const emoji = createEl("div", "emoji", card.emoji);
  emoji.setAttribute("aria-hidden", "true"); 

  const titleEl = createEl("h2", "", card.title);
  const categoryEl = createEl("p", "category", card.category);

  const statList = createEl("dl", "stats");

  Object.keys(statInfo).forEach((key) => {
    const info = statInfo[key];
    const dt = createEl("dt", "", info.label);
    const dd = createEl("dd", "", `${card[key]} ${info.unit}`);

    if (key === state.sortBy || key === highlightStat) {
      dt.classList.add("active");
      dd.classList.add("active");
    }

    statList.append(dt, dd);
  });

  article.append(emoji, titleEl, categoryEl, statList);
  return article;
}

function renderDeck() {
  const visible = getVisibleCards();
  deckEl.replaceChildren(...visible.map((card) => createCardElement(card)));
  summaryEl.textContent = `${visible.length} of ${cards.length} cards`;

  if (visible.length === 0) {
    deckEl.append(createEl("p", "muted", "No card matches your search."));
  }
}

function renderBattle() {
  battleEl.replaceChildren();
  if (state.battle === null) return;

  const first = state.battle.first;
  const second = state.battle.second;
  const stat = state.battle.stat;
  const winner = state.battle.winner;
  const info = statInfo[stat];

  const heading = createEl("h2", "", `Battle: ${info.label}`);
  const arena = createEl("div", "arena");
  const firstEl = createCardElement(first, stat);
  const secondEl = createCardElement(second, stat);
  if (winner === first) firstEl.classList.add("winner");
  if (winner === second) secondEl.classList.add("winner");
  arena.append(firstEl, createEl("p", "versus", "vs"), secondEl);

  const result = winner === null
    ? "It's a draw!"
    : `${winner.title} wins with ${winner[stat]} ${info.unit}!`;

  const closeButton = createEl("button", "secondary", "Close battle");
  closeButton.type = "button";
  closeButton.addEventListener("click", handleCloseBattle);

  battleEl.append(heading, arena, createEl("p", "result", result), closeButton);
}

function render() {
  renderBattle();
  renderDeck();
}

function handleBattle() {
  
  if (cards.length < 2) return;

  const first = randomItem(cards);
  const others = cards.filter((card) => card.id !== first.id);
  const second = randomItem(others);
  const stat = randomItem(Object.keys(statInfo));
  const higherWins = statInfo[stat].higherWins;

  let winner = null;
  if (first[stat] !== second[stat]) {
    if (higherWins) {
      winner = first[stat] > second[stat] ? first : second;
    } else {
      winner = first[stat] < second[stat] ? first : second;
    }
  }

  state.battle = { first, second, stat, winner };
  render();
}

function handleCloseBattle() {
  state.battle = null;
  render();
  battleButton.focus();
}

searchInput.addEventListener("input", () => {
  state.query = searchInput.value;
  render();
});

categorySelect.addEventListener("change", () => {
  state.category = categorySelect.value;
  render();
});

sortSelect.addEventListener("change", () => {
  state.sortBy = sortSelect.value;
  render();
});

battleButton.addEventListener("click", handleBattle);

fillCategoryOptions();
fillSortOptions();
render();