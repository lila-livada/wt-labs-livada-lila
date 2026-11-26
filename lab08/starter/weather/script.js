// ---------------------------------------------------------------
// Weather Now – starter (Lab 8, guided)
// Work through TODO 1 ... TODO 8 together with the instructor.
// Form -> validate -> fetch (2 requests) -> state -> render
// Favourites are kept in localStorage.
// API: Open-Meteo (free, no key). https://open-meteo.com/
// ---------------------------------------------------------------

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const STORAGE_KEY = "weather-favourites";

// WMO weather codes used by Open-Meteo -> text + emoji
const WEATHER_CODES = {
  0: ["Clear sky", "☀️"], 1: ["Mainly clear", "🌤️"], 2: ["Partly cloudy", "⛅"], 3: ["Overcast", "☁️"],
  45: ["Fog", "🌫️"], 48: ["Fog", "🌫️"],
  51: ["Light drizzle", "🌦️"], 53: ["Drizzle", "🌦️"], 55: ["Heavy drizzle", "🌧️"],
  56: ["Freezing drizzle", "🌧️"], 57: ["Freezing drizzle", "🌧️"],
  61: ["Light rain", "🌦️"], 63: ["Rain", "🌧️"], 65: ["Heavy rain", "🌧️"],
  66: ["Freezing rain", "🌧️"], 67: ["Freezing rain", "🌧️"],
  71: ["Light snow", "🌨️"], 73: ["Snow", "🌨️"], 75: ["Heavy snow", "❄️"], 77: ["Snow grains", "🌨️"],
  80: ["Rain showers", "🌦️"], 81: ["Rain showers", "🌧️"], 82: ["Violent showers", "⛈️"],
  85: ["Snow showers", "🌨️"], 86: ["Snow showers", "❄️"],
  95: ["Thunderstorm", "⛈️"], 96: ["Thunderstorm, hail", "⛈️"], 99: ["Thunderstorm, hail", "⛈️"],
};

// ---------- STATE ----------
const state = {
  status: "idle",   // "idle" | "loading" | "notfound" | "error" | "done"
  message: "",      // text for "notfound" and "error"
  place: null,      // { name, country, latitude, longitude }
  weather: null,    // { current, days: [{ date, code, max, min }] }
  favourites: loadFavourites(),
};

// ---------- DOM references ----------
const form = document.querySelector("#searchForm");
const cityInput = document.querySelector("#city");
const cityError = document.querySelector("#cityError");
const favList = document.querySelector("#favourites");
const resultEl = document.querySelector("#result");

// ---------- helpers ----------

function createEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

// weather code -> { label, emoji }
function describe(code) {
  const entry = WEATHER_CODES[code] || ["Unknown", "❔"];
  return { label: entry[0], emoji: entry[1] };
}

// "2026-11-23" -> "Mon 23 Nov"
function formatDay(isoDate) {
  const date = new Date(isoDate + "T12:00:00");
  return date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}

// ---------- localStorage ----------

function loadFavourites() {
  // TODO 7a: read localStorage.getItem(STORAGE_KEY), turn the text back into an array
  //          with JSON.parse, and return it. Nothing saved yet -> getItem gives null -> return [].
  //          Put it in try { … } catch (error) { return []; } – the text could be broken.
  return [];
}

function saveFavourites() {
  // TODO 7b: localStorage.setItem(STORAGE_KEY, JSON.stringify(state.favourites))
  //          inside try/catch (storage can be full or blocked).
}

function isFavourite(place) {
  return state.favourites.some((fav) => fav.latitude === place.latitude && fav.longitude === place.longitude);
}

// ---------- validation ----------

// Returns an error text, or "" when the value is fine.
function validateCity(value) {
  // TODO 2: return a message when the value is empty, shorter than 2 or longer than 60 characters.
  return "";
}

function showFieldError(text) {
  cityError.textContent = text;
  cityInput.setAttribute("aria-invalid", text ? "true" : "false");
}

// ---------- fetch ----------

// Throws an Error when the network fails or the server answers with an error status.
async function getJson(url) {
  // TODO 3: const response = await fetch(url);
  //         if (!response.ok) throw new Error(`The weather service answered with status ${response.status}.`);
  //         return response.json();
}

// City name -> first matching place, or null
async function findPlace(city) {
  // TODO 4: build the URL: `${GEO_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
  //         data = await getJson(url)
  //         When nothing is found, data has NO "results" key -> return null.
  //         Open the URL in the browser first and look at the JSON!
  const data = { results: [] };
  if (!data.results || data.results.length === 0) return null;
  const first = data.results[0];
  return { name: first.name, country: first.country || "", latitude: first.latitude, longitude: first.longitude };
}

async function getWeather(place) {
  const params = new URLSearchParams({
    latitude: place.latitude,
    longitude: place.longitude,
    current: "temperature_2m,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "auto",
    forecast_days: 3,
  });
  const data = await getJson(`${FORECAST_URL}?${params}`);

  // the daily values come as parallel arrays – turn them into one object per day
  const days = data.daily.time.map((date, i) => ({
    date,
    code: data.daily.weather_code[i],
    max: data.daily.temperature_2m_max[i],
    min: data.daily.temperature_2m_min[i],
  }));
  return {
    current: {
      temperature: data.current.temperature_2m,
      wind: data.current.wind_speed_10m,
      code: data.current.weather_code,
    },
    days,
  };
}

// The whole flow for one search. place is optional (favourites already have coordinates).
async function loadWeather(city, knownPlace) {
  // TODO 5: set state.status = "loading", empty state.message and render() BEFORE the requests,
  //         then wrap everything below in try { … } catch (error) { … } (see the comment in catch).

  {
    const place = knownPlace || (await findPlace(city));
    if (place === null) {
      state.status = "notfound";
      state.message = `No city called "${city}" was found.`;
    } else {
      state.place = place;
      state.weather = await getWeather(place);
      state.status = "done";
    }
  }
  // TODO 5 (catch): state.status = "error";
  //   state.message = error instanceof TypeError
  //     ? "Could not reach the weather service. Check your internet connection."
  //     : error.message;
  render();
}

// ---------- RENDER ----------

function renderFavourites() {
  if (state.favourites.length === 0) {
    favList.replaceChildren(createEl("li", "muted", "No favourites yet – search a city and save it."));
    return;
  }
  const items = state.favourites.map((fav) => {
    const li = createEl("li", "chip");

    const openButton = createEl("button", "chip-open", fav.name);
    openButton.type = "button";
    openButton.addEventListener("click", () => loadWeather(fav.name, fav));

    const removeButton = createEl("button", "chip-remove", "×");
    removeButton.type = "button";
    removeButton.setAttribute("aria-label", `Remove ${fav.name} from favourites`);
    removeButton.addEventListener("click", () => handleRemoveFavourite(fav));

    li.append(openButton, removeButton);
    return li;
  });
  favList.replaceChildren(...items);
}

function renderResult() {
  resultEl.replaceChildren();

  if (state.status === "idle") {
    resultEl.append(createEl("p", "muted", "Search for a city to see its weather."));
    return;
  }
  // TODO 6: "loading" -> <p class="loading">Loading weather…</p>
  //         "notfound" -> <p class="warning box"> with state.message
  //         "error"    -> <p class="error box"> with state.message
  //         (return after each one)

  // status "done"
  const place = state.place;
  const current = state.weather.current;
  const nowInfo = describe(current.code);

  const title = createEl("h2", "", `${place.name}${place.country ? ", " + place.country : ""}`);
  const now = createEl("div", "now");
  now.append(
    createEl("span", "big-emoji", nowInfo.emoji),
    createEl("span", "temp", `${Math.round(current.temperature)} °C`),
    createEl("span", "", `${nowInfo.label} · wind ${Math.round(current.wind)} km/h`)
  );

  const saveButton = createEl("button", "save", isFavourite(place) ? "★ Saved" : "☆ Save as favourite");
  saveButton.type = "button";
  saveButton.disabled = isFavourite(place);
  saveButton.addEventListener("click", handleSaveFavourite);

  const forecast = createEl("ul", "forecast");
  state.weather.days.forEach((day) => {
    const info = describe(day.code);
    const li = createEl("li", "day");
    li.append(
      createEl("strong", "", formatDay(day.date)),
      createEl("span", "big-emoji", info.emoji),
      createEl("span", "", info.label),
      createEl("span", "", `${Math.round(day.min)}° / ${Math.round(day.max)}°`)
    );
    forecast.append(li);
  });

  resultEl.append(title, now, saveButton, createEl("h3", "", "Next 3 days"), forecast);
}

function render() {
  renderFavourites();
  renderResult();
}

// ---------- EVENTS ----------

form.addEventListener("submit", (event) => {
  // TODO 1: stop the page from reloading (event.preventDefault()),
  //         read and trim the city, validate it (validateCity), show the error (showFieldError).
  //         Error -> focus the input and stop. Otherwise: loadWeather(city).
});

// clear the error while the user corrects the input
cityInput.addEventListener("input", () => {
  if (cityError.textContent) showFieldError(validateCity(cityInput.value.trim()));
});

function handleSaveFavourite() {
  // TODO 8: if state.place is not yet a favourite: push it to state.favourites and save.
  //         Then render().
}

function handleRemoveFavourite(place) {
  state.favourites = state.favourites.filter((fav) => fav !== place);
  saveFavourites();
  render();
}

// ---------- start ----------
render();
