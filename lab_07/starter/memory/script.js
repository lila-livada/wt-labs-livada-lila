
const FLIP_BACK_DELAY = 900; 

const state = {
  pairCount: 8,  
  cards: [],     
  openIds: [],   
  moves: 0,      
  locked: false, 
};

const boardEl = document.querySelector("#board");
const movesEl = document.querySelector("#moves");
const pairsEl = document.querySelector("#pairs");
const statusEl = document.querySelector("#status");
const foundList = document.querySelector("#foundList");
const difficultySelect = document.querySelector("#difficulty");
const restartButton = document.querySelector("#restartButton");

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]; 
  }
  return copy;
}

function createDeck() {
  const chosen = pairs.slice(0, state.pairCount);
  const doubled = [...chosen, ...chosen];
  const shuffled = shuffle(doubled);

  return shuffled.map((pair, index) => ({
    id: index,
    pairId: pair.id,
    name: pair.name,
    emoji: pair.emoji,
    flipped: false,
    matched: false,
  }));
}

function findCard(id) {
  return state.cards.find((card) => card.id === id);
}

function createCardButton(card) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "card";

  const isVisible = card.flipped || card.matched;

  if (isVisible) {
    button.classList.add("flipped");
    button.textContent = card.emoji;
    button.setAttribute("aria-label", card.name);
  } else {
    button.textContent = "?";
    button.setAttribute("aria-label", "Hidden card");
  }

  if (card.matched) {
    button.classList.add("matched");
    button.disabled = true;
  }

  button.addEventListener("click", () => handleCardClick(card.id));
  return button;
}

function renderFound() {
  const boardPairs = pairs.slice(0, state.pairCount);
  const found = boardPairs.filter((pair) =>
    state.cards.some((card) => card.pairId === pair.id && card.matched)
  );

  if (found.length === 0) {
    const emptyLi = document.createElement("li");
    emptyLi.className = "muted";
    emptyLi.textContent = "No pairs yet.";
    foundList.replaceChildren(emptyLi);
    return;
  }

  const items = found.map((pair) => {
    const li = document.createElement("li");
    li.textContent = `${pair.emoji} ${pair.name}`;
    return li;
  });

  foundList.replaceChildren(...items);
}

function render() {
  boardEl.style.setProperty("--columns", state.pairCount >= 10 ? 5 : 4);
  boardEl.replaceChildren(...state.cards.map(createCardButton));

  const matchedCount = state.cards.filter((c) => c.matched).length;
  const foundPairs = matchedCount / 2;

  movesEl.textContent = state.moves;
  pairsEl.textContent = `${foundPairs} / ${state.pairCount}`;

  if (state.cards.length > 0 && state.cards.every((c) => c.matched)) {
    statusEl.textContent = `You won in ${state.moves} moves!`;
  } else {
    statusEl.textContent = "";
  }

  renderFound();
}

function handleCardClick(id) {
  const card = findCard(id);

  if (state.locked || !card || card.flipped || card.matched) return;

  card.flipped = true;
  state.openIds.push(id);

  if (state.openIds.length === 2) {
    state.moves++;
    const first = findCard(state.openIds[0]);
    const second = findCard(state.openIds[1]);

    if (first.pairId === second.pairId) {
      first.matched = true;
      second.matched = true;
      state.openIds = [];
    } else {
      state.locked = true;
      setTimeout(() => {
        first.flipped = false;
        second.flipped = false;
        state.openIds = [];
        state.locked = false;
        render();
      }, FLIP_BACK_DELAY);
    }
  }
  render();
}

function handleRestart() {
  state.cards = createDeck();
  state.openIds = [];
  state.moves = 0;
  state.locked = false;
  render();
}

difficultySelect.addEventListener("change", () => {
  state.pairCount = Number(difficultySelect.value);
  handleRestart();
});

restartButton.addEventListener("click", handleRestart);

handleRestart();