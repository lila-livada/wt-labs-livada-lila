# Lab 8 – Weather Now (guided) + Pokédex Team Builder (homework)

**Student:** <Liliana Livada> · **Group:** <10LF441> · **Date:** 2026-11-26

## What I built
În `team/` am implementat căutarea după nume sau număr în PokéAPI, validarea inputului și afișarea stărilor de încărcare, negăsit sau eroare. Cardul Pokémon-ului afișează tipurile, statisticile cu bare, înălțimea, greutatea și totalul punctelor. Am mai făcut formularul de adăugare în echipă cu validări (rol, lungime poreclă, limită de 6 membri și fără duplicate), ștergerea membrilor, rezumatul echipei și salvarea în `localStorage`.

## How to run it
Click dreapta `team/index.html` (sau `weather/index.html`) → Open with Live Server (recomandat).

## Known problems / unfinished parts
Nu am observat probleme majore în funcționarea curentă. Dacă numele introdus nu există în PokéAPI sau lipsește conexiunea la internet, aplicația afișează mesajul corespunzător fără să crape.

## AI usage log (recommended – not graded)
Using AI tools (ChatGPT, Claude, Copilot, Gemini, …) is **allowed**. Hiding it is not.
If you did not use AI, write exactly: `I did not use AI for this exercise.`

| # | What I asked the AI (short) | What I changed, or what the AI got wrong |
|---|-----------------------------|-------------------------------------------|
| 1 | Cum să normalizez căutările cu spații și să verific erorile din PokéAPI | Am păstrat logica de `fetch` și stările, dar am ajustat mesajele și verificările din formularul de echipă |
| 2 | Cum să calculez tipurile unice și cel mai puternic membru din echipă | Am verificat să nu modific array-ul original la sortare și am adaptat textul din rezumat |

**One thing I learned in this exercise (in my own words):**
Am înțeles mai bine cum să leg un `state` clar de funcția `render()` și cum să tratez separat cazurile de `404` față de erorile de rețea la un `fetch`.