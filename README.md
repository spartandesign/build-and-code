# Build & Code

The student textbook, handouts, and source for **Automation & Robotics** — an 18-week VEX EXP (C++ in VS Code) course at Mary R. Stauffer Middle School, Downey USD.

This repo holds three things that stay in sync: the **website** students read, the **print handouts** for class, and the **editable sources** the site is built from.

---

## What's in here

```
build-and-code/
├── docs/        ← the published website (this is what GitHub Pages serves)
│   ├── index.html        cover + table of contents
│   ├── chapter-01.html   a chapter page
│   ├── styles.css        the whole book's styling (one file)
│   └── nav.js            the table of contents (single source of truth)
├── handouts/    ← print-ready Word docs
│   ├── Ch01_Structures_STUDENT.docx
│   └── Ch01_Structures_TEACHER.docx
├── source/      ← the editable chapter text (Markdown)
│   └── Chapter-01-Structures-and-Building.md
└── README.md
```

There is no build step. The `docs/` folder is plain HTML/CSS/JS — open `docs/index.html` in any browser to preview the whole site locally.

---

## How to add a new chapter

1. **Copy** `docs/chapter-01.html` to `docs/chapter-02.html` (and so on).
2. **Edit** the new file: change the chapter number in `.chead__num`, the unit eyebrow, the title, the `<title>` tag, the `<body data-chapter="2">` value, and the body content.
3. **Register it** in `docs/nav.js` — find the chapter in the `BOOK` list and fill in its `file`:
   ```js
   { n: 2, title: "What Do We Use Robots For?", file: "chapter-02.html" },
   ```
   That one line makes the chapter appear in every page's sidebar **and** wires up the Previous/Next buttons automatically. You never edit a sidebar by hand.
4. (Optional) Drop the chapter's Markdown in `source/` and its handouts in `handouts/`.

**Style:** all colors and type live in `docs/styles.css`. Change the book's look in one place. Callout boxes use the classes `card--learn`, `card--tip`, `card--safe`, and `card--note`. External (VEX) links use `class="ext"` with `target="_blank" rel="noopener"` so they open in a new tab and keep the textbook open.

---

## Publish it (GitHub Pages)

1. Push this repo to GitHub.
2. In the repo: **Settings → Pages**.
3. Under "Build and deployment," set **Source: Deploy from a branch**, then **Branch: `main`** and **Folder: `/docs`**. Save.
4. Wait ~1 minute. Your site is live at `https://<your-username>.github.io/build-and-code/`.

Every time you push, the site updates. Only the `docs/` folder is published; `handouts/` and `source/` stay in the repo but aren't served.

**Prefer Netlify instead?** Import the repo, set the **publish directory** to `docs`, and deploy. You get preview links per change and easy custom domains. (The repo itself doesn't change either way.)

---

## Design system

Continues the course's printed-document palette so the site, handouts, and slides feel like one course:

| Role | Hex |
|---|---|
| Navy (headers/structure) | `#1F3864` |
| Blue (links/section accents) | `#2E75B6` |
| Orange (rules/highlights) | `#C55A11` |
| Soft blue (info callouts) | `#F2F7FC` |
| Green (positive callouts) | `#E2EFDA` |
| Amber (safety callouts) | `#FBEFD6` |

---

## Sourcing standard

Content is grounded in the **VEX Library** (kb.vex.com), using real VEX EXP parts and terminology. Anything shown for V5 or the older EDR system is labeled as such, so an EXP beginner is never misled about what's in their own kit. Each chapter lists its VEX Library sources at the bottom.
