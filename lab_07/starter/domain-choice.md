# Your topic (Lab 7 → final project)

From Lab 7 on, every student works with **their own topic**. The tasks and rubrics are the same for everyone, but the data is yours. Choose one topic in Lab 7 and keep it until the final project. Later lab sheets call it your **domain**.

In Lab 7 your topic becomes a **card deck** (Top Trumps). In the following labs the same cards get a form (Lab 8), a server API and a database (Labs 9–10), and a React front end (Labs 11–12).

## What one card needs

| Field | Type | Example (invented creatures) |
|---|---|---|
| `id` | unique whole number | `7` |
| `title` | text | `"Flamewing"` |
| `category` | text, a few different values | `"Fire"` (Fire, Water, Earth, Air) |
| `emoji` | one emoji as picture (optional) | `"🔥"` |
| at least **3 stats** | numbers, as normal fields | `attack: 82`, `defence: 45`, `speed: 90` |

```js
{ id: 7, title: "Flamewing", category: "Fire", emoji: "🔥", attack: 82, defence: 45, speed: 90 }
```

For every stat you also write a label, a unit and whether a **higher** value wins in a battle:

```js
const statInfo = {
  attack:  { label: "Attack",  unit: "points", higherWins: true },
  defence: { label: "Defence", unit: "points", higherWins: true },
  speed:   { label: "Speed",   unit: "points", higherWins: true },
};
```

## Ideas

| Topic | Category | Stats (unit, which value wins) |
|---|---|---|
| Football players | position | goals, assists, matches (higher wins) |
| Video games | genre | release year, rating 1–100, price in EUR (**lower** wins) |
| Cars | body type | power (hp), top speed (km/h), 0–100 km/h in s (**lower** wins) |
| Films | genre | year, length (min), rating 1–10 |
| Recipes | course | preparation time (min, **lower** wins), calories (kcal), rating 1–5 |
| Countries | continent | population (million), area (km²), capital altitude (m) |
| Invented creatures | type | attack, defence, speed |
| Phones | brand | battery (mAh), storage (GB), price (EUR, **lower** wins) |

You may propose another topic. It needs a category and at least 3 numeric stats.

## Rules

- **At least 10 cards**, with realistic values. Rounded values are fine, but write where they come from in your README (e.g. "Wikipedia, November 2026" or "invented").
- Your own topic and your own data. Two identical decks are treated as copied work.
- No personal data about private persons.

Write your choice at the top of the top-level `README.md` of your repository:

```markdown
**My topic:** Football players – category: position – stats: goals, assists, matches
```
