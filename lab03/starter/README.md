# Lab 3 – HTML Tables and Basic CSS

**Student:** Livada Liliana · **Group:** 10LF441 · **Date:** 2026-10-23

## What I built
Am realizat atât partea ghidată a laboratorului (meniul săptămânal pentru tabără cu structură semantică de tabel și stilizare CSS), cât și tema notată ("Camp Adventure Tech" schedule) și cerința bonus. Orarul săptămânal conține celulele îmbinate pe verticală și orizontală respectând regula de 6 coloane pe rând, legături bidirecționale către meniu și un tabel complet de prețuri pentru bonus.

## How to run it
Pornesc Live Server direct din VS Code pe fișierele `index.html` din folderele `schedule`, `menu` sau `bonus`, iar paginile se încarcă instant în browser cu stilurile aplicate.

## Known problems / unfinished parts
Nu am probleme cunoscute sau aspecte nerezolvate; am verificat ca toate legăturile interne să funcționeze corect, numărul de coloane pe fiecare rând să fie exact 6, iar codul HTML să fie validat fără erori pe W3C.

## AI usage log (mandatory)
Using AI tools (ChatGPT, Claude, Copilot, Gemini, …) is **allowed**. Hiding it is not.
Fill in this section for every exercise. If you did not use AI, write exactly: `I did not use AI for this exercise.`

| # | What I asked the AI (short) | What I changed, or what the AI got wrong |
|---|-----------------------------|-------------------------------------------|
| 1 | Cum se calculează corect numărul de coloane când folosesc rowspan și colspan în tabel? | Am verificat fiecare rând în parte pentru a mă asigura că suma celulelor vizibile și a celor extinse este fix 6. |
| 2 | Care este sintaxa corectă pentru a lega paginile între ele din subfoldere diferite? | Am ajustat căile relative folosind `../` pentru ca navigația între orar și meniu să meargă corect. |

**One thing I learned in this exercise (in my own words):**
Am înțeles cum funcționează structurarea avansată a tabelelor HTML prin `<thead>`, `<tbody>` și `<tfoot>`, precum și modul în care proprietățile CSS `border-collapse` și `scope` ajută la crearea unor orare și tabele de prețuri clare și accesibile.
