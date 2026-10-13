# Labor 1: HTML5-Struktur, erstes CSS und Git-Einrichtung

**Webtechnologien – IAG III**

| | |
|---|---|
| **Lernziele** | Nach diesem Labor können Sie: (O1) eine valide HTML5-Seite mit Überschriften, Absätzen, Listen, einer Tabelle, Bildern und Links erstellen; (O2) eine Seite mit einem externen Stylesheet unter Verwendung von Element-, Klassen- und ID-Selektoren gestalten (Außenabstände, Innenabstände, Rahmen); (O3) ein Git-Repository anlegen, aussagekräftige Commits erstellen und diese auf GitHub hochladen (pushen). |
| **Voraussetzungen** | Keine. Grundlegende Programmiererfahrung (Java) genügt. |
| **Geschätzter Zeitaufwand** | 100 Min. im Labor + ca. 2 Std. Hausaufgabe |
| **Benötigte Werkzeuge** | Visual Studio Code (aktuelle stabile Version), Git 2.40 oder neuer, ein aktueller Browser (Chrome, Edge oder Firefox), ein GitHub-Konto |

---

## 0. Kursregeln, die Sie ab dem ersten Tag kennen müssen

Lesen Sie `AI-and-commit-policy.md` (wird mit diesem Labor ausgegeben). Zusammenfassung:

- **KI-Werkzeuge sind erlaubt.** Sie müssen jede Zeile, die Sie abgeben, verstehen, und Sie müssen in der `README.md` jeder Übung das *KI-Nutzungsprotokoll* (AI usage log) ausfüllen. Nicht angegebene KI-Nutzung gilt als Plagiat.
- **Ihre Commit-Historie wird bewertet.** Mindestens 3 aussagekräftige Commits pro Übung, mit Nachrichten, die die Änderung beschreiben.
- Zusammen machen diese beiden Punkte 15 % jeder wöchentlichen Übung aus.

---

## 1. Theorie-Wiederholung

### 1.1 Aufbau einer HTML-Seite

Ein HTML-Dokument ist ein Baum aus Elementen. Jede Seite hat dasselbe Grundgerüst:

```html
<!DOCTYPE html>                <!-- Dokumenttyp: HTML5 -->
<html lang="de">               <!-- Wurzelelement -->
<head>                         <!-- Metadaten, werden nicht auf der Seite angezeigt -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Seitentitel (wird im Browser-Tab angezeigt)</title>
</head>
<body>                         <!-- sichtbarer Inhalt -->
  <h1>Hauptüberschrift</h1>
  <p>Ein Absatz.</p>
</body>
</html>
```

### 1.2 Die häufigsten Elemente

| Zweck | Element | Beispiel |
|---|---|---|
| Überschriften | `<h1>` … `<h6>` | `<h2>Fächer</h2>` |
| Absatz | `<p>` | `<p>Etwas Text.</p>` |
| Link | `<a>` | `<a href="https://www.unitbv.ro/">UniTBv</a>` |
| Bild | `<img>` | `<img src="images/laptop.svg" alt="Ein Laptop">` |
| Ungeordnete / geordnete Liste | `<ul>`, `<ol>`, `<li>` | `<ul><li>Eintrag</li></ul>` |
| Wichtiger / betonter Text | `<strong>`, `<em>` | `<strong>Abgabetermin</strong>` |
| Schaltfläche | `<button>` | `<button type="button">Klicken</button>` |

Attribute fügen einem Element Informationen hinzu: `<tag attribut="wert">`.
Jedes `<img>` benötigt ein `alt`-Attribut, das das Bild für Menschen beschreibt, die es nicht sehen können.

### 1.3 Tabellen

```html
<table>
  <caption>Wochenplan</caption>
  <thead>
    <tr><th scope="col">Uhrzeit</th><th scope="col">Montag</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">08:00</th><td>Webtechnologien</td></tr>
  </tbody>
</table>
```

`<tr>` = Zeile, `<th>` = Kopfzelle, `<td>` = Datenzelle. Tabellen sind ausschließlich für tabellarische Daten gedacht, niemals für das Seitenlayout.

### 1.4 CSS

CSS bestimmt, wie die Seite aussieht: Farben, Schriftarten, Abmessungen, Ausrichtung, Abstände. Es trennt den Inhalt (HTML) von der Darstellung.

Drei Möglichkeiten, CSS einzubinden:

| Art | Beispiel | Verwenden? |
|---|---|---|
| Inline | `<p style="color:red;">Text</p>` | Vermeiden |
| Intern | `<style> … </style>` innerhalb von `<head>` | Nur für kleine Demos |
| **Extern** | `<link rel="stylesheet" href="style.css">` | **Empfohlen** |

Vorteile einer externen Datei: klare Trennung von Struktur und Design, dieselbe Datei kann von vielen Seiten wiederverwendet werden, einfachere Wartung.

Syntax einer Regel:

```css
selektor { eigenschaft: wert; }

h1       { color: #0a66c2; }           /* Element-Selektor */
.subject { padding: 0.5rem; }          /* Klassen-Selektor */
#web-tech { font-weight: bold; }       /* ID-Selektor      */
```

**id vs. class**

| | `id` | `class` |
|---|---|---|
| Wie viele Elemente? | Genau eines pro Seite | Beliebig viele |
| HTML | `<li id="web-tech">` | `<li class="subject">` |
| CSS | `#web-tech { … }` | `.subject { … }` |

Farben und Formatierungen im alten Stil gehören in CSS, nicht in HTML-Attribute. Verwenden Sie **nicht** `<font>`, `<center>` oder die Attribute `bgcolor`, `border`, `align` – sie sind veraltet.

### 1.5 Git in fünf Befehlen

| Befehl | Bedeutung |
|---|---|
| `git clone <url>` | Ein GitHub-Repository auf den eigenen Laptop kopieren |
| `git status` | Was hat sich geändert? |
| `git add <datei>` (oder `git add .`) | Änderungen für den nächsten Commit auswählen |
| `git commit -m "nachricht"` | Einen Schnappschuss mit Beschreibung speichern |
| `git push` | Die eigenen Commits auf GitHub hochladen |

---

## 2. Geführte Einführung (ca. 35 Min.)

### Teil A – Werkzeuge und Repository (15 Min.)

1. Installieren Sie VS Code von <https://code.visualstudio.com/download> und Git von <https://git-scm.com/downloads>.
2. Öffnen Sie ein Terminal (in VS Code: **Terminal → New Terminal**) und prüfen Sie die Installation:
   ```bash
   git --version
   ```
3. Teilen Sie Git mit, wer Sie sind (einmal pro Laptop):
   ```bash
   git config --global user.name "Vorname Nachname"
   git config --global user.email "ihre-github-email@example.com"
   ```
4. Erstellen Sie auf <https://github.com> ein **privates** Repository mit dem Namen `wt-labs-<nachname>-<vorname>`. Setzen Sie das Häkchen bei **Add a README file**. Fügen Sie Ihre Lehrkraft als Mitarbeiter hinzu (**Settings → Collaborators**).
5. Klonen Sie es und öffnen Sie es in VS Code:
   ```bash
   git clone https://github.com/<ihr-benutzername>/wt-labs-<nachname>-<vorname>.git
   cd wt-labs-<nachname>-<vorname>
   code .
   ```
   Beim ersten `git push` öffnet sich ein Browserfenster zur Anmeldung bei GitHub.
6. Kopieren Sie den Ordner `starter` aus den Labormaterialien in das Repository und benennen Sie ihn in `lab01` um. Ihr Repository sieht nun so aus:
   ```text
   wt-labs-<nachname>-<vorname>/
   ├── README.md
   └── lab01/
       ├── README.md        (KI-Nutzungsprotokoll – am Ende ausfüllen)
       ├── index.html
       ├── style.css
       └── images/
   ```
7. Erstellen Sie Ihren ersten Commit:
   ```bash
   git add .
   git commit -m "Add lab 1 starter files"
   git push
   ```
   Laden Sie die GitHub-Seite neu – die Dateien sind da.

### Teil B – Erste Seite (10 Min.)

1. Öffnen Sie `lab01/index.html` in VS Code und im Browser (Doppelklick auf die Datei oder die Datei in ein Browserfenster ziehen).
2. Ändern Sie den Text des `<h1>` und des Absatzes. Speichern Sie und laden Sie den Browser neu.
3. Fügen Sie der Fächerliste einen zweiten Listeneintrag hinzu. Neu laden.
4. Öffnen Sie die Entwicklerwerkzeuge des Browsers (**F12 → Elements / Inspector**) und suchen Sie Ihr `<li>` im Elementbaum.

### Teil C – Erste Stile (10 Min.)

1. Erledigen Sie in `index.html` **TODO 1**:
   ```html
   <link rel="stylesheet" href="style.css">
   ```
   Neu laden: Die Schriftart ändert sich, das Stylesheet ist also eingebunden.
2. Fügen Sie in `style.css` eine Regel für die Klasse und eine für die ID hinzu:
   ```css
   .subject {
     padding: 0.5rem 0.75rem;
     border-left: 6px solid #999999;
   }

   #web-tech {
     border-left-color: #0a66c2;
   }
   ```
3. Wählen Sie in den Entwicklerwerkzeugen das `<li>` aus und betrachten Sie den Bereich **Styles**: Beide Regeln werden angewendet. Fahren Sie mit der Maus über das Element, um Margin (Außenabstand, außerhalb des Rahmens) und Padding (Innenabstand, innerhalb des Rahmens) zu sehen.
4. Committen Sie:
   ```bash
   git add .
   git commit -m "Link stylesheet and style the subject list"
   ```

---

## 3. Übungen

### Übung 1 – Grundlagen (10 Min.) · O1

In `lab01/index.html`:

1. Führen Sie **alle** Ihre Fächer dieses Semesters in der ungeordneten Liste auf. Jedes `<li>` hat die Klasse `subject` und eine eigene `id`.
2. Fügen Sie ein zweites Bild (`images/laptop.svg`) mit einem aussagekräftigen `alt`-Text hinzu.
3. Verwenden Sie `<strong>` und `<em>` mindestens einmal im Einleitungsabsatz.

### Übung 2 – Standard, bewertet (35 Min.) · O1, O2, O3

Vervollständigen Sie die Seite so, dass sie Folgendes enthält:

1. Die Liste der Fächer dieses Semesters (ungeordnete Liste).
2. Eine Tabelle mit Ihrem **echten Stundenplan** des aktuellen Semesters: eine Spalte pro Tag, eine Zeile pro Zeitfenster, `<caption>`, `<thead>`, `<tbody>` und `<th>` für Kopfzellen.
3. Am Ende der Seite einen Link zum Stundenplan auf der Website der Universität.
4. Mindestens zwei Bilder, jeweils mit `alt`-Text.
5. Unterschiedliche Textformatierungen und einen eigenen Stil für jedes Fach, unter Verwendung von `id`- **und** `class`-Selektoren in der externen Datei `style.css`. Verwenden Sie Margins, Paddings und Rahmen.
6. Mindestens 3 aussagekräftige Commits, auf GitHub gepusht, sowie eine ausgefüllte `lab01/README.md`.

Regeln: keine Inline-`style`-Attribute, kein `<style>`-Element, keine veralteten Formatierungs-Tags oder -Attribute.

### Übung 3 – Herausforderung / Hausaufgabe 1 (ca. 2 Std.) · O1, O2, O3

Schreiben Sie Ihren Lebenslauf als HTML- + CSS-Seite im Ordner `lab01/cv/`.

- Hauptseite mit persönlichen Angaben, Ausbildung, Fähigkeiten, Hobbys.
- Bildergalerie (Fotos, Projekte, …).
- Kontaktbereich mit einem Beispielformular (es muss nichts versenden).
- Externes CSS mit Farben, Abständen, Ausrichtung, Schriftarten.

Anforderungen:

- Semantisch korrekte HTML-Struktur.
- Vollständige Gestaltung in einer externen CSS-Datei, unter Verwendung von `id` und `class`.
- Verwendung von Listen, Tabellen, Bildern und Links.
- Stimmiges, gut lesbares Design mit Augenmerk auf Kontrast und Ausrichtung.

Sie dürfen erfundene persönliche Daten verwenden. Veröffentlichen Sie nicht Ihre echte Telefonnummer oder Wohnadresse.
Bewahren Sie diesen Lebenslauf auf – Sie werden ihn in Labor 4 mit Bootstrap neu aufbauen.

---

## 4. Abgabe und Bewertung

- **Was:** der Ordner `lab01/` (und `lab01/cv/` für die Hausaufgabe) in Ihrem `wt-labs-…`-Repository, einschließlich der ausgefüllten `README.md`.
- **Wie:** `git push`. Prüfen Sie auf GitHub, dass die Dateien und Commits sichtbar sind.
- **Abgabetermin:** Übung 2 – Ende dieses Labors. Hausaufgabe 1 – vor Beginn von Labor 2.
- **Vor der Abgabe prüfen:** Fügen Sie Ihr HTML in den Validator unter <https://validator.w3.org/#validate_by_input> ein. Ziel: null Fehler.
- **Bewertung:** siehe `lab01_rubric.md`.

---

## 5. Weiterführende Literatur

- MDN – Inhalte mit HTML strukturieren: <https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content>
- MDN – Grundlagen der CSS-Gestaltung: <https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics>
- Pro-Git-Buch, Kapitel 1–2 (kostenlos, auch auf Deutsch verfügbar): <https://git-scm.com/book/de/v2>
- W3C Markup Validation Service: <https://validator.w3.org/>
