# Lab 5 – CSS Personalizat, Tranziții, Animații și Layout Responsive

**Student:** Livada Liliana  
**Group:** 10LF441  
**Date:** 2026-06-06  

---

## What I built
Pentru această temă am proiectat și dezvoltat un site web complet dedicat unei cafenele de specialitate numită **Aroma Café** (Opțiunea 1 – Business și Eveniment). Proiectul este structurat pe două pagini principale conectate printr-o bară de navigare intuitivă:
1. **Pagina principală (`index.html`)**: Include o secțiune de tip "Hero" cu animații de intrare, un set de carduri interactive pentru produsele principale care conțin efecte de ridicare la trecerea cursorului (*hover*), precum și imagini vectoriale integrate curat.
2. **Pagina de meniu (`menu.html`)**: Prezintă lista detaliată a produselor și prețurilor sub formă de elemente interactive stilizate, menținând aceeași identitate vizuală și structură responsive.

Toate elementele vizuale sunt construite folosind clase CSS proprii și un layout modern adaptat pentru dispozitive mobile cu ajutorul Bootstrap 5.

## How to run it
Pentru a rula și testa aplicația web local pe calculatorul tău, urmează acești pași simpli:
* Deschide folderul proiectului în **VS Code**.
* Instalează extensia **Live Server** (dacă nu o ai deja).
* Dă click dreapta pe fișierul `index.html` și selectează **"Open with Live Server"**, sau deschide manual fișierul `index.html` direct în orice browser web modern.

## Known problems / unfinished parts
În urma testării pe diferite rezoluții și browsere, nu există erori majore sau bug-uri funcționale cunoscute. Toate cerințele legate de tranziții, animații fluide și accesibilitate prin interogări media sunt implementate complet și validate.

## AI usage log (mandatory)
Using AI tools (ChatGPT, Claude, Copilot, Gemini, ...) is **allowed**. Hiding it is not.
Fill in this section for every exercise. If you did not use AI, write exactly: `I did not use AI for this exercise.`

| # | What I asked the AI (short) | What I changed, or what the AI got wrong |
|---|---|---|
| 1 | Cum se scriu corect regulile de `@keyframes` și tranzițiile pentru `:hover` în CSS | Am adaptat duratele, efectele de scalare și umbrele (*box-shadow*) pentru a se potrivi cu designul cafenelei mele |
| 2 | Structura generală pentru un șablon Bootstrap 5 curat orientat spre business | Am personalizat complet conținutul paginilor, textele, denumirile claselor și am adăugat a doua pagină de meniu |

**One thing I learned in this exercise (in my own words):**
Am aprofundat modul în care funcționează animațiile personalizate în CSS cu ajutorul cheilor de animație (`@keyframes`) și am înțeles importanța regulii de accesibilitate `prefers-reduced-motion` pentru utilizatorii care preferă să dezactiveze elementele vizuale dinamice de pe ecran.

---

## My site

* **Option:** 1 – business or event
* **Topic:** Cafenea artizanală și de specialitate (Aroma Café)
* **Pages:** 
  * `index.html` – Pagina de prezentare generală, secțiunea de bun venit și cardurile cu produse populare.
  * `menu.html` – Pagina dedicată ofertei de băuturi și deserturi, structurată sub formă de listă interactivă.

---

## W3.CSS and Bootstrap – the same thing, two names

Tabelul de mai jos descrie clasele utilizate frecvent în cadrul proiectului și echivalentele lor între framework-ul Bootstrap și W3.CSS:

| What it does | W3.CSS | Bootstrap |
|---|---|---|
| Container principal cu padding lateral | `w3-container` | `container` |
| Bară de navigare fixă / responsivă | `w3-bar` | `navbar navbar-expand-lg` |
| Rând pentru sistemul de grile | `w3-row` | `row` |
| Coloană flexibilă pe dispozitive medii | `w3-col` | `col-md-4` |
| Card pentru conținut modular | `w3-card` | `card` |
| Buton cu stil de acțiune principală | `w3-button` | `btn btn-warning` |