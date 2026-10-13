# Lab 2 – Anchors, Forms, and Micro-site

**Student:** Livada Liliana · **Group:** 10LF441 · **Date:** 2026-10-13

## What I built
Am realizat atât partea ghidată a laboratorului (adăugarea ancorelor interne și externe, stările link-urilor în CSS, focusul pentru tastatură și elementele de validare nativă pe formulare), cât și tema notată (un micro-site numit "Student Survey" compus din două pagini: index.html și faq.html). Toate cerințele legate de structura semantică, elementele de tip fieldset/legend și navigarea fluidă sunt complet funcționale.

## How to run it
Pornesc Live Server direct din VS Code pe fișierul `index.html` (din folderul `guided` sau din `hw-anchors`), iar paginile se încarcă instant în browser cu stilurile aplicate.

## Known problems / unfinished parts
Nu am probleme cunoscute sau aspecte nerezolvate; am verificat ca toate legăturile interne și externe să funcționeze corect, iar formularele să ruleze validarea nativă.

## AI usage log (mandatory)
Using AI tools (ChatGPT, Claude, Copilot, Gemini, …) is **allowed**. Hiding it is not.
Fill in this section for every exercise. If you did not use AI, write exactly: `I did not use AI for this exercise.`

| # | What I asked the AI (short) | What I changed, or what the AI got wrong |
|---|-----------------------------|-------------------------------------------|
| 1 | Cum se scriu corect stările pentru link-uri în CSS și ordinea lor | Am păstrat ordinea a:link, a:visited, a:hover, a:active și am adaptat culorile cerute de design. |
| 2 | Care este structura recomandată pentru fieldset și legend la formulare accesibile | Am mutat etichetele în interiorul câmpurilor și am adăugat atributele required și minlength corespunzătoare cerințelor mele. |

**One thing I learned in this exercise (in my own words):**
Am înțeles cum funcționează navigarea bazată pe ancore (#id) combinată cu `scroll-behavior: smooth` și cum pot folosi atributele native ale HTML5 (cum ar fi `required` sau `minlength`) pentru a valida formularele direct în browser, fără să mai scriu cod JavaScript suplimentar.