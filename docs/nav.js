/* ============================================================
   nav.js — one source of truth for the whole book's navigation.
   Add a chapter here and every page's sidebar + pager updates.
   Each page sets <body data-chapter="N"> (or data-chapter="index").
   Pages with file:"" are placeholders (not yet written).
   ============================================================ */

const BOOK = [
  { unit: "Getting Started", chapters: [
    { n: "GS", title: "Getting Started with Code", file: "getting-started-code.html" },
    { n: "SET", title: "Set Up Your Tools", file: "setup-tools.html" },
  ]},
  { unit: "Unit 1 · Robots & Structures", chapters: [
    { n: 1, title: "Structures & Building", file: "chapter-01.html" },
    { n: 2, title: "What Do We Use Robots For?", file: "chapter-02.html" },
  ]},
  { unit: "Unit 2 · Mechanisms & Design", chapters: [
    { n: 3, title: "Observing Mechanisms", file: "chapter-03.html" },
    { n: 4, title: "Mechanical Gears", file: "chapter-04.html" },
    { n: 5, title: "Windmill Construction", file: "chapter-05.html" },
    { n: 6, title: "Pull Toy Construction", file: "chapter-06.html" },
    { n: 7, title: "Survival Challenge", file: "chapter-07.html" },
  ]},
  { unit: "Unit 3 · Programming & Automation", chapters: [
    { n: 8,  title: "Robots as Technological Systems", file: "chapter-08.html" },
    { n: 9,  title: "Behaviors & Pseudocode", file: "chapter-09.html" },
    { n: 10, title: "Your First C++ Program", file: "chapter-10.html" },
    { n: 11, title: "Automation Through Programming", file: "chapter-11.html" },
    { n: 12, title: "Simulated Factory Assembly Line", file: "chapter-12.html" },
  ]},
  { unit: "Unit 4 · Control & Competition", chapters: [
    { n: 13, title: "Remote Controls (Driver Control)", file: "chapter-13.html" },
    { n: 14, title: "Sumo Competition & Build Your Own", file: "chapter-14.html" },
  ]},
  { unit: "Reference", chapters: [
    { n: "A", title: "Advanced Mechanisms", file: "appendix-a-mechanisms.html" },
    { n: "B", title: "EXP → V5 Team Bridge", file: "appendix-b-exp-to-v5.html" },
  ]},
];

(function () {
  const current = document.body.getAttribute("data-chapter");
  const flat = BOOK.flatMap(u => u.chapters);

  // ----- Sidebar -----
  const toc = document.getElementById("toc");
  if (toc) {
    let html = `<p class="toc__head">Contents</p>`;
    html += `<div class="toc__unit"><a href="index.html"${current === "index" ? ' aria-current="page"' : ""}><span class="num">▣</span><span>Cover &amp; overview</span></a></div>`;
    for (const u of BOOK) {
      html += `<div class="toc__unit"><span class="unit-label">${u.unit}</span>`;
      for (const c of u.chapters) {
        const isCur = String(c.n) === current;
        const numTxt = typeof c.n === "number" ? String(c.n).padStart(2, "0") : c.n;
        if (c.file) {
          html += `<a href="${c.file}"${isCur ? ' aria-current="page"' : ""}><span class="num">${numTxt}</span><span>${c.title}</span></a>`;
        } else {
          html += `<span class="dim"><span class="num">${numTxt}</span><span>${c.title}</span></span>`;
        }
      }
      html += `</div>`;
    }
    toc.innerHTML = html;
  }

  // ----- Prev / next pager -----
  const pager = document.getElementById("pager");
  if (pager && current !== "index") {
    const idx = flat.findIndex(c => String(c.n) === current);
    const prev = idx > 0 ? flat[idx - 1] : null;
    const next = idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null;
    let html = "";
    if (prev && prev.file) {
      html += `<a class="prev" href="${prev.file}"><span class="dir">← Previous</span><span class="name">${prev.n}. ${prev.title}</span></a>`;
    } else { html += `<span class="ph"></span>`; }
    if (next && next.file) {
      html += `<a class="next" href="${next.file}"><span class="dir">Next →</span><span class="name">${next.n}. ${next.title}</span></a>`;
    } else if (next) {
      html += `<span class="ph"></span>`;
    }
    pager.innerHTML = html;
  }

  // ----- Mobile menu toggle -----
  const btn = document.getElementById("menuBtn");
  if (btn && toc) {
    btn.addEventListener("click", () => toc.classList.toggle("open"));
  }
})();
