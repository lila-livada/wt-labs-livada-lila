// ---------------------------------------------------------------
// Pokédex Team Builder – Lab 8 homework
// Search form -> validate -> fetch from PokéAPI -> state -> render
// "Add to team" form with validation -> team kept in localStorage.
// API: https://pokeapi.co/docs/v2 – free, no API key.
// ---------------------------------------------------------------

const API_URL = "https://pokeapi.co/api/v2/pokemon/";
const STORAGE_KEY = "pokedex-team";
const MAX_TEAM = 6;
const ROLES = ["Attacker", "Defender", "Support", "Speedster"];

const STAT_LABELS = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

// ---------- STATE ----------
const state = {
  status: "idle",   
  query: "",        
  pokemon: null,    
  team: loadTeam(), 
};

// ---------- DOM references ----------
const searchForm = document.querySelector("#searchForm");
const queryInput = document.querySelector("#query");
const queryError = document.querySelector("#queryError");
const resultEl = document.querySelector("#result");
const addSection = document.querySelector("#addSection");
const addForm = document.querySelector("#addForm");
const addStatus = document.querySelector("#addStatus");
const teamEl = document.querySelector("#team");
const teamTitle = document.querySelector("#teamTitle");
const teamSummary = document.querySelector("#teamSummary");

// ---------- helpers ----------

function createEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function totalStats(pokemon) {
  let total = 0;
  for (const key of Object.keys(STAT_LABELS)) {
    total += pokemon.stats[key];
  }
  return total;
}

function memberName(member) {
  const name = capitalize(member.name);
  return member.nickname ? `${member.nickname} (${name})` : name;
}

// ---------- TODO 1: the search form ----------

function validateQuery(query) {
  if (query === "") {
    return "Type a name or a number.";
  }
  if (query.length > 30) {
    return "At most 30 characters.";
  }
  if (!/^[a-z0-9-]+$/.test(query)) {
    return "Use only letters, digits and hyphens (e.g. mr-mime).";
  }
  return "";
}

function showQueryError(message) {
  queryError.textContent = message;
  queryInput.setAttribute("aria-invalid", message ? "true" : "false");
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = queryInput.value.trim().toLowerCase().replace(/\s+/g, "-");

  const error = validateQuery(query);
  showQueryError(error);

  if (error) {
    queryInput.focus();
    return;
  }
  loadPokemon(query);
});

queryInput.addEventListener("input", () => {
  if (queryError.textContent) {
    const query = queryInput.value.trim().toLowerCase().replace(/\s+/g, "-");
    showQueryError(validateQuery(query));
  }
});

// ---------- TODO 2: fetch one Pokémon ----------

async function getPokemon(query) {
  const response = await fetch(API_URL + encodeURIComponent(query));

  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(`Status ${response.status}`);
  }

  const raw = await response.json();
  return toPokemon(raw);
}

// ---------- TODO 3: keep only what we need ----------

function toPokemon(raw) {
  const stats = {};
  for (const entry of raw.stats) {
    stats[entry.stat.name] = entry.base_stat;
  }

  return {
    id: raw.id,
    name: raw.name,
    types: raw.types.map((entry) => entry.type.name),
    stats,
    image:
      raw.sprites?.other?.["official-artwork"]?.front_default ||
      raw.sprites?.front_default ||
      null,
    height: raw.height / 10, // decimetres → metres
    weight: raw.weight / 10, // hectograms → kilograms
  };
}

// ---------- TODO 4: load and the three states ----------

async function loadPokemon(query) {
  state.query = query;
  state.pokemon = null;
  state.status = "loading";
  addStatus.textContent = "";
  addStatus.className = "status";
  render();

  try {
    const pokemon = await getPokemon(query);
    if (pokemon === null) {
      state.status = "notfound";
    } else {
      state.pokemon = pokemon;
      state.status = "done";
    }
  } catch (error) {
    state.status = "error";
  }

  render();
}

// ---------- TODO 5: read and validate the "Add to team" form ----------

function readAddForm() {
  const formData = new FormData(addForm);
  return {
    nickname: (formData.get("nickname") || "").trim(),
    role: formData.get("role") || "",
  };
}

function validateMember(values, pokemon) {
  const errors = {};

  if (values.nickname.length > 15) {
    errors.nickname = "At most 15 characters.";
  }
  if (!ROLES.includes(values.role)) {
    errors.role = "Choose a role from the list.";
  }
  if (state.team.length >= MAX_TEAM) {
    errors.form = `Your team is full (${MAX_TEAM} members). Remove one first.`;
  } else if (state.team.some((member) => member.id === pokemon.id)) {
    errors.form = `${capitalize(pokemon.name)} is already in your team.`;
  }

  return errors;
}

// ---------- TODO 6: show the messages and add the member ----------

function showErrors(errors) {
  let firstWrong = null;

  for (const name of ["nickname", "role"]) {
    const field = addForm.elements[name];
    const errorEl = document.querySelector(`#error-${name}`);
    const message = errors[name] || "";

    if (errorEl) errorEl.textContent = message;
    if (field) {
      field.setAttribute("aria-invalid", message ? "true" : "false");
      if (message && !firstWrong) firstWrong = field;
    }
  }

  if (errors.form) {
    addStatus.textContent = errors.form;
    addStatus.className = "status error";
  } else {
    addStatus.textContent = "";
    addStatus.className = "status";
  }

  if (firstWrong) firstWrong.focus();
}

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (state.pokemon === null) return;

  const values = readAddForm();
  const errors = validateMember(values, state.pokemon);
  showErrors(errors);
  if (Object.keys(errors).length > 0) return;

  const member = { ...state.pokemon, nickname: values.nickname, role: values.role };
  state.team.push(member);

  const saved = saveTeam();
  addForm.reset();
  if (saved) {
    addStatus.textContent = `${memberName(member)} was added to your team.`;
    addStatus.className = "status ok";
  }
  render();
});

// ---------- TODO 7: localStorage ----------

function loadTeam() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(saved)) return [];
    // keep only entries that really look like team members
    return saved.filter(
      (member) =>
        member &&
        typeof member.id === "number" &&
        typeof member.name === "string" &&
        Array.isArray(member.types) &&
        member.stats &&
        typeof member.stats === "object"
    );
  } catch (error) {
    return [];
  }
}

function saveTeam() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.team));
    return true;
  } catch (error) {
    addStatus.textContent = "Could not save your team in this browser (storage is full or blocked).";
    addStatus.className = "status error";
    return false;
  }
}

// ---------- RENDER ----------

function createTypeList(types) {
  const list = createEl("ul", "types");
  types.forEach((type) => list.append(createEl("li", "type", type)));
  return list;
}

function createImage(pokemon) {
  if (!pokemon.image) return createEl("p", "muted", "No picture");
  const img = document.createElement("img");
  img.src = pokemon.image;
  img.alt = `Picture of ${capitalize(pokemon.name)}`;
  return img;
}

function createPokemonCard(pokemon) {
  const article = createEl("article", "pokemon");
  const info = createEl("div", "info");

  const title = createEl("h3", "", capitalize(pokemon.name) + " ");
  title.append(createEl("span", "number", `#${pokemon.id}`));

  const stats = createEl("dl", "stats");
  Object.keys(STAT_LABELS).forEach((key) => {
    const value = pokemon.stats[key];
    const bar = createEl("div", "bar");
    bar.setAttribute("aria-hidden", "true"); 
    const fill = createEl("span");
    fill.style.width = `${Math.min(100, (value / 200) * 100)}%`;
    bar.append(fill);
    stats.append(createEl("dt", "", STAT_LABELS[key]), createEl("dd", "", value), bar);
  });

  info.append(
    title,
    createTypeList(pokemon.types),
    stats,
    createEl("p", "muted", `Total ${totalStats(pokemon)} · ${pokemon.height} m · ${pokemon.weight} kg`),
  );
  article.append(createImage(pokemon), info);
  return article;
}

function renderResult() {
  if (state.status === "idle") {
    resultEl.replaceChildren();
  } else if (state.status === "done") {
    resultEl.replaceChildren(createPokemonCard(state.pokemon));
  } else if (state.status === "loading") {
    resultEl.replaceChildren(createEl("p", "loading", `Looking for "${state.query}"…`));
  } else if (state.status === "notfound") {
    resultEl.replaceChildren(
      createEl(
        "p",
        "warning box",
        `No Pokémon called "${state.query}" was found. Check the spelling or try a number.`
      )
    );
  } else if (state.status === "error") {
    resultEl.replaceChildren(
      createEl(
        "p",
        "error box",
        "Could not load data from PokéAPI. Check your internet connection and try again."
      )
    );
  }

  addSection.hidden = state.status !== "done";
}

// ---------- TODO 8: the team, remove, summary ----------

function createMemberItem(member) {
  const li = createEl("li", "member");
  const heading = memberName(member);

  const removeButton = createEl("button", "remove", "Remove");
  removeButton.type = "button";
  removeButton.setAttribute("aria-label", `Remove ${heading} from the team`);
  removeButton.addEventListener("click", () => handleRemove(member.id));

  li.append(
    createImage(member),
    createEl("h3", "", heading),
    createEl("p", "muted", `${member.role} · total ${totalStats(member)}`),
    createTypeList(member.types),
    removeButton,
  );
  return li;
}

function renderTeam() {
  teamTitle.textContent = `My team (${state.team.length}/${MAX_TEAM})`;

  teamEl.replaceChildren(...state.team.map((member) => createMemberItem(member)));

  if (state.team.length === 0) {
    teamSummary.textContent = "Your team is empty. Search a Pokémon and add it.";
    return;
  }

  const types = [...new Set(state.team.map((member) => member.types).flat())];

  const strongest = [...state.team].sort((a, b) => totalStats(b) - totalStats(a))[0];

  teamSummary.textContent =
    `Types covered: ${types.join(", ")}. ` +
    `Strongest member: ${memberName(strongest)} (total ${totalStats(strongest)}).`;
}

function handleRemove(id) {
  state.team = state.team.filter((member) => member.id !== id);
  saveTeam();
  render();
}

function render() {
  renderResult();
  renderTeam();
}

// ---------- start ----------
render();
