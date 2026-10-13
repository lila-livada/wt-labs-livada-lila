# Lab 1: HTML5 Structure, First CSS, and Git Setup

**Web Technologies – IAG III**

| | |
|---|---|
| **Objectives** | After this lab you can: (O1) build a valid HTML5 page with headings, paragraphs, lists, a table, images and links; (O2) style a page with an external stylesheet using element, class and id selectors (margins, paddings, borders); (O3) create a Git repository, make meaningful commits and push them to GitHub. |
| **Prerequisites** | None. Basic programming experience (Java) is enough. |
| **Estimated time** | 100 min in the lab + about 2 h homework |
| **Tools needed** | Visual Studio Code (current stable release), Git 2.40 or newer, a current browser (Chrome, Edge or Firefox), a GitHub account |

---

## 0. Course rules you need from day one

Read `AI-and-commit-policy.md` (handed out with this lab). Summary:

- **AI tools are allowed.** You must understand every line you submit and you must fill in the *AI usage log* in the `README.md` of every exercise. Undeclared AI use counts as plagiarism.
- **Your commit history is graded.** At least 3 meaningful commits per exercise, with messages that describe the change.
- Together these two are worth 15 % of every weekly exercise.

---

## 1. Theory recap

### 1.1 HTML page structure

An HTML document is a tree of elements. Every page has the same skeleton:

```html
<!DOCTYPE html>                <!-- document type: HTML5 -->
<html lang="en">               <!-- root element -->
<head>                         <!-- metadata, not shown on the page -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page title (shown in the browser tab)</title>
</head>
<body>                         <!-- visible content -->
  <h1>Main heading</h1>
  <p>A paragraph.</p>
</body>
</html>
```

### 1.2 Most common elements

| Purpose | Element | Example |
|---|---|---|
| Headings | `<h1>` … `<h6>` | `<h2>Subjects</h2>` |
| Paragraph | `<p>` | `<p>Some text.</p>` |
| Link | `<a>` | `<a href="https://www.unitbv.ro/">UniTBv</a>` |
| Image | `<img>` | `<img src="images/laptop.svg" alt="A laptop">` |
| Unordered / ordered list | `<ul>`, `<ol>`, `<li>` | `<ul><li>Item</li></ul>` |
| Important / emphasised text | `<strong>`, `<em>` | `<strong>Deadline</strong>` |
| Button | `<button>` | `<button type="button">Click</button>` |

Attributes add information to an element: `<tag attribute="value">`.
Every `<img>` needs an `alt` attribute that describes the image for people who cannot see it.

### 1.3 Tables

```html
<table>
  <caption>Weekly schedule</caption>
  <thead>
    <tr><th scope="col">Time</th><th scope="col">Monday</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">08:00</th><td>Web Technologies</td></tr>
  </tbody>
</table>
```

`<tr>` = row, `<th>` = header cell, `<td>` = data cell. Tables are for tabular data only, never for page layout.

### 1.4 CSS

CSS controls how the page looks: colours, fonts, dimensions, alignment, margins. It separates the content (HTML) from the presentation.

Three ways to add CSS:

| Way | Example | Use it? |
|---|---|---|
| Inline | `<p style="color:red;">Text</p>` | Avoid |
| Internal | `<style> … </style>` inside `<head>` | Small demos only |
| **External** | `<link rel="stylesheet" href="style.css">` | **Recommended** |

Advantages of an external file: clear separation of structure and design, the same file is reused by many pages, easier maintenance.

Rule syntax:

```css
selector { property: value; }

h1       { color: #0a66c2; }           /* element selector */
.subject { padding: 0.5rem; }          /* class selector   */
#web-tech { font-weight: bold; }       /* id selector      */
```

**id vs class**

| | `id` | `class` |
|---|---|---|
| How many elements? | Exactly one per page | Any number |
| HTML | `<li id="web-tech">` | `<li class="subject">` |
| CSS | `#web-tech { … }` | `.subject { … }` |

Colours and old-style formatting belong in CSS, not in HTML attributes. Do **not** use `<font>`, `<center>`, or the attributes `bgcolor`, `border`, `align` – they are obsolete.

### 1.5 Git in five commands

| Command | Meaning |
|---|---|
| `git clone <url>` | Copy a GitHub repository to your laptop |
| `git status` | What has changed? |
| `git add <file>` (or `git add .`) | Select changes for the next commit |
| `git commit -m "message"` | Save a snapshot with a description |
| `git push` | Upload your commits to GitHub |

---

## 2. Guided walkthrough (about 35 min)

### Part A – Tools and repository (15 min)

1. Install VS Code from <https://code.visualstudio.com/download> and Git from <https://git-scm.com/downloads>.
2. Open a terminal (in VS Code: **Terminal → New Terminal**) and check the installation:
   ```bash
   git --version
   ```
3. Tell Git who you are (once per laptop):
   ```bash
   git config --global user.name "First Last"
   git config --global user.email "your-github-email@example.com"
   ```
4. On <https://github.com> create a **private** repository named `wt-labs-<lastname>-<firstname>`. Tick **Add a README file**. Add your instructor as a collaborator (**Settings → Collaborators**).
5. Clone it and open it in VS Code:
   ```bash
   git clone https://github.com/<your-username>/wt-labs-<lastname>-<firstname>.git
   cd wt-labs-<lastname>-<firstname>
   code .
   ```
   The first `git push` will open a browser window to sign in to GitHub.
6. Copy the folder `starter` from the lab materials into the repository and rename it to `lab01`. Your repository now looks like this:
   ```text
   wt-labs-<lastname>-<firstname>/
   ├── README.md
   └── lab01/
       ├── README.md        (AI usage log – fill it in at the end)
       ├── index.html
       ├── style.css
       └── images/
   ```
7. Make your first commit:
   ```bash
   git add .
   git commit -m "Add lab 1 starter files"
   git push
   ```
   Refresh the GitHub page – the files are there.

### Part B – First page (10 min)

1. Open `lab01/index.html` in VS Code and in the browser (double-click the file, or drag it into a browser window).
2. Change the text of the `<h1>` and the paragraph. Save, then reload the browser.
3. Add a second list item to the subjects list. Reload.
4. Open the browser developer tools (**F12 → Elements / Inspector**) and find your `<li>` in the element tree.

### Part C – First styles (10 min)

1. In `index.html`, complete **TODO 1**:
   ```html
   <link rel="stylesheet" href="style.css">
   ```
   Reload: the font changes, so the stylesheet is connected.
2. In `style.css`, add a rule for the class and one for the id:
   ```css
   .subject {
     padding: 0.5rem 0.75rem;
     border-left: 6px solid #999999;
   }

   #web-tech {
     border-left-color: #0a66c2;
   }
   ```
3. In the developer tools, select the `<li>` and look at the **Styles** panel: both rules are applied. Hover over the element to see margin (outside the border) and padding (inside the border).
4. Commit:
   ```bash
   git add .
   git commit -m "Link stylesheet and style the subject list"
   ```

---

## 3. Exercises

### Exercise 1 – Basic (10 min) · O1

In `lab01/index.html`:

1. List **all** your subjects of this semester in the unordered list. Every `<li>` has the class `subject` and its own `id`.
2. Add a second image (`images/laptop.svg`) with a meaningful `alt` text.
3. Use `<strong>` and `<em>` at least once in the intro paragraph.

### Exercise 2 – Standard, graded (35 min) · O1, O2, O3

Complete the page so that it contains:

1. The list of subjects of this semester (unordered list).
2. A table with your **real schedule** of the current semester: one column per day, one row per time slot, `<caption>`, `<thead>`, `<tbody>`, and `<th>` for header cells.
3. At the end of the page, a link to the schedule on the university's website.
4. At least two images, each with `alt` text.
5. Different text formatting, and a different style for each subject, using `id` **and** `class` selectors in the external file `style.css`. Use margins, paddings and borders.
6. At least 3 meaningful commits, pushed to GitHub, and a completed `lab01/README.md`.

Rules: no inline `style` attributes, no `<style>` element, no obsolete formatting tags or attributes.

### Exercise 3 – Challenge / Homework 1 (about 2 h) · O1, O2, O3

Write your CV as an HTML + CSS page in the folder `lab01/cv/`.

- Main page with personal details, education, skills, hobbies.
- Image gallery (photos, projects, …).
- Contact section with a mock form (it does not need to send anything).
- External CSS with colours, spacing, alignment, fonts.

Requirements:

- Semantically correct HTML structure.
- Complete styling in an external CSS file, using both `id` and `class`.
- Use of lists, tables, images and links.
- Coherent, readable design with attention to contrast and alignment.

You may use invented personal data. Do not publish your real phone number or home address.
Keep this CV – you will rebuild it with Bootstrap in Lab 4.

---

## 4. Submission and grading

- **What:** folder `lab01/` (and `lab01/cv/` for the homework) in your `wt-labs-…` repository, including the filled-in `README.md`.
- **How:** `git push`. Check on GitHub that the files and commits are visible.
- **Deadline:** Exercise 2 – end of this lab. Homework 1 – before the start of Lab 2.
- **Check before you submit:** paste your HTML into the validator at <https://validator.w3.org/#validate_by_input>. Aim for zero errors.
- **Grading:** see `lab01_rubric.md`.

---

## 5. Further reading

- MDN – Structuring content with HTML: <https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content>
- MDN – CSS styling basics: <https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics>
- Pro Git book, chapters 1–2 (free): <https://git-scm.com/book/en/v2>
- W3C Markup Validation Service: <https://validator.w3.org/>
