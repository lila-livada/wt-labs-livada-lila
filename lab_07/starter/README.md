**My topic:** Football players – category: position – stats: goals, assists, matches

# Lab 7 – Mini Quiz (guided) + homework (Option A deck or Option B memory)

**Student:** <Livada Liliana> · **Group:** <Grupa 10LF441> · **Date:** 2026-11-19

## My option and topic
**Option:** A – Top Trumps deck
**Topic:** Football players · Option A: **Category field:** position · **Stats:** goals, assists, matches
**Where the values come from:** Approximate rounded figures based on public football data, November 2026

## What I built
I put together the Top Trumps deck in `deck/script.js` using the state, render, and events structure, and filled `deck/data.js` with football players across positions and stats (`goals`, `assists`, `matches`). Filtering by position, searching by name, sorting, and running random card battles with stat highlighting all work. I also checked the quiz and memory game setups while working through the lab.

## How to run it
Right-click `deck/index.html` (Option A) or `memory/index.html` (Option B) → Open with Live Server.

## Known problems / unfinished parts
Everything needed for the deck works on my end; no major bugs left open.

## AI usage log (mandatory)
Using AI tools (ChatGPT, Claude, Copilot, Gemini, …) is **allowed**. Hiding it is not.
If you did not use AI, write exactly: `I did not use AI for this exercise.`

| # | What I asked the AI (short) | What I changed, or what the AI got wrong |
|---|-----------------------------|-------------------------------------------|
| 1 | Guidance on state updates, filtering/sorting, and battle winner logic in `deck/script.js` | Checked the behavior directly in the browser and adjusted the football cards and labels to fit my dataset. |
| 2 | Ideas and structure for a 10-card football dataset in `deck/data.js` | Reviewed and tailored the player list, positions, emojis, and rounded stat numbers myself. |

**One thing I learned in this exercise (in my own words):**
Keeping the state in one object and re-rendering from it makes it much cleaner to handle filters, sorting, and battles without losing track of what is on screen. Building card elements dynamically from data arrays also showed me how flexible data-driven UIs can be.