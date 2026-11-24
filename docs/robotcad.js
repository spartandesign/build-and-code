/* ============================================================
   robotcad.js — robotics CAD practice tools (VEX V5, inches).
   Self-contained: works on Model & Make, Robot CAD, and Build & Code.
     <div class="sim pitchsim"></div>      hole pattern counter (0.5 in pitch)
     <div class="sim bracketsim"></div>    bracket designer on the hole grid
     <div class="sim gearsim"></div>       gear ratio + drivetrain speed
     <div class="sim fourbarsim"></div>    four-bar linkage
     <div class="sim holecomp"></div>      laser hole compensation
     <div class="sim reviewsim"></div>     design review checklist
   Facts used (VEX Library): 0.5 in hole pitch; #8-32 screws (0.164 in);
   gears 12/36/60/84 T; gear ratio = driven : driving; cartridges 100/200/600 RPM.
   ============================================================ */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const C = { navy: "#1F3864", orange: "#C55A11", blue: "#2E75B6", green: "#3F6B2A", red: "#B42318", ink: "#1A1A1A", gray: "#5B6470", steel: "#C9D1DB", steel2: "#9AA6B4", tan: "#E7B98F", print: "#9DC3E6" };
  const P = 0.5; // VEX pitch, inches
  const f3 = x => (+x).toFixed(3), f2 = x => (+x).toFixed(2);

  // shared styles, injected once
  if (!document.getElementById("robotcad-css")) {
    const st = document.createElement("style"); st.id = "robotcad-css";
    st.textContent = `.rc-row{display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;margin:8px 0;font-size:14.5px}
.rc-row label{display:flex;align-items:center;gap:6px}.rc-row select,.rc-row input[type=text]{font:inherit;font-size:14.5px;padding:4px 8px;border:1.5px solid #d6dbe3;border-radius:8px;background:#fff}
.rc-row input[type=range]{flex:1;min-width:140px;accent-color:${C.orange}}.rc-out{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;margin:8px 0}
.rc-out div{background:#fff;border:1px solid #d6dbe3;border-radius:10px;padding:8px 10px}.rc-out b{display:block;font-size:12px;color:${C.gray};font-weight:700;text-transform:uppercase;letter-spacing:.04em}
.rc-out span{font-family:ui-monospace,Consolas,monospace;font-size:19px;font-weight:800;color:${C.navy}}.rc-list{font-family:ui-monospace,Consolas,monospace;font-size:13.5px;background:#fff;border:1px solid #d6dbe3;border-radius:8px;padding:8px 10px;white-space:pre-wrap;margin:6px 0}
.rc-svg{width:100%;height:auto;touch-action:manipulation}.rc-row [hidden],[hidden].rc-row,label[hidden]{display:none!important}.rc-check label{display:flex;gap:8px;align-items:flex-start;padding:6px 8px;border:1px solid #d6dbe3;border-radius:8px;background:#fff;margin:5px 0;cursor:pointer;font-size:14.5px}`;
    document.head.appendChild(st);
  }

  // ---------- 1. Hole pattern counter ----------
  $$(".pitchsim").forEach(el => {
    el.innerHTML = `<svg class="rc-svg" viewBox="0 0 640 120" role="img" aria-label="A strip of VEX metal with square holes every 0.5 inch"></svg>
      <div class="rc-row"><label>Length in holes <input type="range" class="pt-n" min="2" max="35" value="15"></label><span class="sim__phase pt-v"></span></div>
      <div class="rc-out"><div><b>Overall length</b><span class="pt-len"></span></div><div><b>First to last hole</b><span class="pt-cc"></span></div><div><b>Two holes you tapped</b><span class="pt-sel">—</span></div></div>
      <p class="sim__say">Tap any two holes to measure center to center. Every hole is 0.5 in from the next one.</p>`;
    const svg = $("svg", el), n = $(".pt-n", el); let pick = [];
    function draw() {
      const k = +n.value, w = Math.min(600 / k, 34), x0 = (640 - w * k) / 2; let s = `<rect x="${x0}" y="35" width="${w * k}" height="${w * 1.1}" rx="3" fill="${C.steel}" stroke="${C.steel2}" stroke-width="2"/>`;
      for (let i = 0; i < k; i++) { const on = pick.includes(i), cx = x0 + w * (i + .5);
        s += `<rect data-i="${i}" x="${cx - w * .2}" y="${35 + w * .35}" width="${w * .4}" height="${w * .4}" fill="${on ? C.orange : "#fff"}" stroke="${C.ink}" stroke-width="1" style="cursor:pointer"/>`; }
      if (pick.length === 2) { const [a, b] = pick.sort((p, q) => p - q), xa = x0 + w * (a + .5), xb = x0 + w * (b + .5);
        s += `<line x1="${xa}" y1="25" x2="${xb}" y2="25" stroke="${C.orange}" stroke-width="2.5"/><line x1="${xa}" y1="18" x2="${xa}" y2="32" stroke="${C.orange}" stroke-width="2"/><line x1="${xb}" y1="18" x2="${xb}" y2="32" stroke="${C.orange}" stroke-width="2"/>`; }
      svg.innerHTML = s;
      $(".pt-v", el).textContent = `${k} holes`; $(".pt-len", el).textContent = `${f2(k * P)} in`; $(".pt-cc", el).textContent = `${f2((k - 1) * P)} in`;
      $(".pt-sel", el).textContent = pick.length === 2 ? `${f2(Math.abs(pick[1] - pick[0]) * P)} in` : "—";
      $$("rect[data-i]", svg).forEach(r => r.addEventListener("click", () => { const i = +r.dataset.i; pick = pick.length >= 2 ? [i] : pick.includes(i) ? pick.filter(x => x !== i) : [...pick, i]; draw(); }));
    }
    n.addEventListener("input", () => { pick = []; draw(); }); draw();
  });

  // ---------- 2. Bracket designer ----------
  $$(".bracketsim").forEach(el => {
    const COLS = 9, ROWS = 5, S = 52;
    el.innerHTML = `<svg class="rc-svg" viewBox="0 0 ${COLS * S + 40} ${ROWS * S + 40}" role="img" aria-label="A grid of hole positions 0.5 inch apart. Tap to place screw holes."></svg>
      <div class="rc-row"><label>Edge margin <select class="bk-m"><option value="0.25" selected>0.25 in (half a hole)</option><option value="0.375">0.375 in</option><option value="0.5">0.5 in</option></select></label>
        <label>Screw hole Ø <select class="bk-d"><option value="0.170">0.170 in</option><option value="0.180" selected>0.180 in</option><option value="0.190">0.190 in</option></select></label>
        <button type="button" class="sim__btn bk-clear">Clear</button></div>
      <div class="rc-out"><div><b>Plate size</b><span class="bk-size">—</span></div><div><b>Screw holes</b><span class="bk-n">0</span></div><div><b>Hole Ø</b><span class="bk-dia"></span></div></div>
      <p class="sim__say bk-say" aria-live="polite"></p><div class="rc-list bk-list" aria-label="Hole centers for Onshape"></div>`;
    const svg = $("svg", el); let on = new Set(["1,1", "4,1"]);
    function draw() {
      let s = ""; const m = +$(".bk-m", el).value, d = +$(".bk-d", el).value;
      const pts = [...on].map(k => k.split(",").map(Number));
      if (pts.length) {
        const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]), minx = Math.min(...xs), maxx = Math.max(...xs), miny = Math.min(...ys), maxy = Math.max(...ys);
        const mm = m / P * S;
        s += `<rect x="${20 + minx * S + S / 2 - mm}" y="${20 + miny * S + S / 2 - mm}" width="${(maxx - minx) * S + 2 * mm}" height="${(maxy - miny) * S + 2 * mm}" rx="8" fill="${C.print}" stroke="${C.navy}" stroke-width="3" opacity=".9"/>`;
        const W = (maxx - minx) * P + 2 * m, H = (maxy - miny) * P + 2 * m;
        $(".bk-size", el).textContent = `${f2(W)} × ${f2(H)} in`;
        $(".bk-list", el).textContent = "Hole centers, measured from the plate's lower-left corner (in):\n" + pts.sort((a, b) => b[1] - a[1] || a[0] - b[0]).map(([x, y]) => `x ${f3((x - minx) * P + m)}   y ${f3((maxy - y) * P + m)}`).join("\n");
        const say = $(".bk-say", el);
        if (pts.length === 1) say.innerHTML = `<strong style="color:${C.red}">One screw is a hinge.</strong> The bracket can spin around it. Add a second hole.`;
        else if (new Set(ys).size === 1 || new Set(xs).size === 1) say.innerHTML = `<strong style="color:${C.green}">Holds.</strong> Two or more holes in a line stop spinning. Add a hole out of line if the bracket will be pushed sideways.`;
        else say.innerHTML = `<strong style="color:${C.green}">Strong.</strong> Holes in two directions lock the bracket in place.`;
      } else { $(".bk-size", el).textContent = "—"; $(".bk-list", el).textContent = ""; $(".bk-say", el).textContent = "Tap grid points to place screw holes."; }
      for (let c = 0; c < COLS; c++) for (let r = 0; r < ROWS; r++) {
        const k = `${c},${r}`, x = 20 + c * S + S / 2, y = 20 + r * S + S / 2, sel = on.has(k);
        s += `<g data-k="${k}" style="cursor:pointer"><rect x="${x - S / 2}" y="${y - S / 2}" width="${S}" height="${S}" fill="transparent"/>` +
          (sel ? `<circle cx="${x}" cy="${y}" r="${d / P * S / 2}" fill="#fff" stroke="${C.navy}" stroke-width="2.5"/>` : `<rect x="${x - 4}" y="${y - 4}" width="8" height="8" fill="${C.steel2}"/>`) + `</g>`;
      }
      svg.innerHTML = s; $(".bk-n", el).textContent = on.size; $(".bk-dia", el).textContent = `${f3(d)} in`;
      $$("g[data-k]", svg).forEach(g => g.addEventListener("click", () => { const k = g.dataset.k; on.has(k) ? on.delete(k) : on.add(k); draw(); }));
    }
    $$("select", el).forEach(x => x.addEventListener("change", draw)); $(".bk-clear", el).addEventListener("click", () => { on.clear(); draw(); }); draw();
  });

  // ---------- 3. Gear ratio + drivetrain ----------
  $$(".gearsim").forEach(el => {
    const G = [12, 36, 60, 84], opt = (sel) => G.map(g => `<option value="${g}" ${g === sel ? "selected" : ""}>${g} T</option>`).join("");
    el.innerHTML = `<svg class="rc-svg" viewBox="0 0 640 230" role="img" aria-label="A driving gear and a driven gear turning together"></svg>
      <div class="rc-row"><label>Motor cartridge <select class="gr-m"><option value="100">Red · 100 RPM</option><option value="200" selected>Green · 200 RPM</option><option value="600">Blue · 600 RPM</option></select></label>
        <label>Driving (on motor) <select class="gr-a">${opt(36)}</select></label><label>Driven <select class="gr-b">${opt(60)}</select></label></div>
      <div class="rc-row"><label><input type="checkbox" class="gr-c"> Add a second stage</label><label>Driving 2 <select class="gr-a2" disabled>${opt(12)}</select></label><label>Driven 2 <select class="gr-b2" disabled>${opt(36)}</select></label>
        <label>Wheel <select class="gr-w"><option value="2.75">2.75 in</option><option value="3.25" selected>3.25 in</option><option value="4">4 in</option></select></label></div>
      <div class="rc-out"><div><b>Gear ratio</b><span class="gr-r"></span></div><div><b>Output speed</b><span class="gr-rpm"></span></div><div><b>Torque</b><span class="gr-t"></span></div><div><b>Wheel speed</b><span class="gr-v"></span></div></div>
      <p class="sim__say gr-say" aria-live="polite"></p>`;
    const svg = $("svg", el); let ang = 0, last = performance.now(), live = true;
    const io = new IntersectionObserver(e => { live = e[0].isIntersecting; }); io.observe(el);
    function gearPath(cx, cy, T, a) {
      const r = T * 1.7 + 14, ro = r + 6; let d = "";
      for (let i = 0; i < T; i++) { const t0 = a + i * 2 * Math.PI / T, w = Math.PI / T * .5;
        const p = [[r, t0 - w * 1.4], [ro, t0 - w * .6], [ro, t0 + w * .6], [r, t0 + w * 1.4]];
        p.forEach(([rr, tt], j) => d += `${i === 0 && j === 0 ? "M" : "L"}${f2(cx + rr * Math.cos(tt))},${f2(cy + rr * Math.sin(tt))} `); }
      return d + "Z";
    }
    function vals() {
      const m = +$(".gr-m", el).value, a = +$(".gr-a", el).value, b = +$(".gr-b", el).value, two = $(".gr-c", el).checked;
      const a2 = +$(".gr-a2", el).value, b2 = +$(".gr-b2", el).value, w = +$(".gr-w", el).value;
      const ratio = (b / a) * (two ? b2 / a2 : 1), rpm = m / ratio, ips = rpm * Math.PI * w / 60;
      return { m, a, b, two, ratio, rpm, ips };
    }
    function text() {
      const v = vals(); $(".gr-a2", el).disabled = $(".gr-b2", el).disabled = !v.two;
      const R = v.ratio >= 1 ? `${f2(v.ratio)} : 1` : `1 : ${f2(1 / v.ratio)}`;
      $(".gr-r", el).textContent = R; $(".gr-rpm", el).textContent = `${Math.round(v.rpm)} RPM`; $(".gr-t", el).textContent = `${f2(v.ratio)} ×`;
      $(".gr-v", el).textContent = `${f2(v.ips / 12)} ft/s`;
      $(".gr-say", el).innerHTML = v.ratio > 1 ? `<strong>Torque gearing:</strong> the output turns ${f2(v.ratio)}× slower with ${f2(v.ratio)}× the torque. Good for arms and lifts.`
        : v.ratio < 1 ? `<strong>Speed gearing:</strong> the output turns ${f2(1 / v.ratio)}× faster with less torque. Watch out: too fast can be hard to control.`
        : `<strong>1 : 1.</strong> Same speed and torque. The gears only move the motion to a new place.`;
      $(".gr-say", el).innerHTML += ` <span style="color:${C.gray}">(Ideal numbers: real robots lose some to friction.)</span>`;
    }
    function frame(now) {
      const dt = Math.min(.05, (now - last) / 1000); last = now; const v = vals();
      if (live) {
        ang += dt * (v.m / 60) * 2 * Math.PI * .15;
        const ra = v.a * 1.7 + 20, rb = v.b * 1.7 + 20, cy = 0, xa = 0, xb = ra + rb - 3;
        const sc = Math.min(1, 600 / (2 * ra + 2 * rb + 30), 175 / (2 * Math.max(ra, rb) + 40));
        const ox = 320 - (xa - ra + xb + rb) / 2 * sc, oy = 100;
        svg.innerHTML = `<g transform="translate(${ox},${oy}) scale(${sc})">
          <path d="${gearPath(xa, cy, v.a, ang)}" fill="${C.print}" stroke="${C.navy}" stroke-width="2"/><circle cx="${xa}" cy="${cy}" r="8" fill="${C.orange}"/>
          <text x="${xa}" y="${cy + ra + 34}" text-anchor="middle" font-size="18" font-weight="800" fill="${C.navy}">${v.a} T · motor</text>
          <path d="${gearPath(xb, cy, v.b, -ang * v.a / v.b + Math.PI / v.b)}" fill="${C.tan}" stroke="${C.orange}" stroke-width="2"/><circle cx="${xb}" cy="${cy}" r="8" fill="${C.navy}"/>
          <text x="${xb}" y="${cy + rb + 34}" text-anchor="middle" font-size="18" font-weight="800" fill="${C.orange}">${v.b} T · output</text></g>`;
      }
      requestAnimationFrame(frame);
    }
    $$("select,input", el).forEach(x => x.addEventListener("input", text)); text(); requestAnimationFrame(frame);
  });

  // ---------- 4. Four-bar linkage ----------
  $$(".fourbarsim").forEach(el => {
    el.innerHTML = `<svg class="rc-svg" viewBox="0 0 640 300" role="img" aria-label="A four-bar linkage: ground, input arm, top link, and output arm"></svg>
      <div class="rc-row"><label>Input arm angle <input type="range" class="fb-t" min="-60" max="80" value="20"></label><span class="sim__phase fb-tv"></span></div>
      <div class="rc-row"><label>Top link <input type="range" class="fb-c" min="40" max="160" value="110"></label><label>Output arm <input type="range" class="fb-r" min="70" max="200" value="150"></label></div>
      <div class="rc-row"><button type="button" class="sim__btn sim__btn--go fb-par">Parallel four-bar (lift)</button><button type="button" class="sim__btn fb-play">Play</button></div>
      <p class="sim__say fb-say" aria-live="polite"></p>`;
    const svg = $("svg", el), g = 90, a = 130; let playing = false, dir = 1;
    function draw() {
      const t = +$(".fb-t", el).value * Math.PI / 180, c = +$(".fb-c", el).value, r = +$(".fb-r", el).value;
      const O2 = [230, 262], O4 = [230, 262 - g]; // vertical ground link (tower), like a VEX lift
      const A = [O2[0] + a * Math.cos(-t), O2[1] + a * Math.sin(-t)];
      const dx = O4[0] - A[0], dy = O4[1] - A[1], d = Math.hypot(dx, dy);
      let s = `<rect x="215" y="${O4[1] - 16}" width="30" height="${g + 40}" fill="${C.steel}" stroke="${C.steel2}" stroke-width="2"/><line x1="40" y1="286" x2="600" y2="286" stroke="${C.ink}" stroke-width="3"/>`;
      if (d > c + r || d < Math.abs(c - r)) {
        s += `<line x1="${O2[0]}" y1="${O2[1]}" x2="${A[0]}" y2="${A[1]}" stroke="${C.blue}" stroke-width="10" stroke-linecap="round"/>`;
        svg.innerHTML = s; $(".fb-say", el).innerHTML = `<strong style="color:${C.red}">Can't connect.</strong> These link lengths don't reach at this angle. Change a length or the angle.`; return;
      }
      const aa = (c * c - r * r + d * d) / (2 * d), h = Math.sqrt(Math.max(0, c * c - aa * aa));
      const Pm = [A[0] + aa * dx / d, A[1] + aa * dy / d], B = [Pm[0] - h * dy / d, Pm[1] + h * dx / d];
      const cang = Math.atan2(B[1] - A[1], B[0] - A[0]) * 180 / Math.PI, level = Math.abs(((cang % 360) + 360) % 360 - 270) < 2 || Math.abs(((cang % 360) + 360) % 360 - 90) < 2;
      s += `<line x1="${O2[0]}" y1="${O2[1]}" x2="${A[0]}" y2="${A[1]}" stroke="${C.blue}" stroke-width="10" stroke-linecap="round"/>`;
      s += `<line x1="${O4[0]}" y1="${O4[1]}" x2="${B[0]}" y2="${B[1]}" stroke="${C.blue}" stroke-width="10" stroke-linecap="round" opacity=".75"/>`;
      s += `<line x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}" stroke="${C.orange}" stroke-width="12" stroke-linecap="round"/>`;
      [O2, O4, A, B].forEach(p => s += `<circle cx="${p[0]}" cy="${p[1]}" r="7" fill="#fff" stroke="${C.ink}" stroke-width="2.5"/>`);
      const tip = [ (A[0] + B[0]) / 2 + 60, (A[1] + B[1]) / 2 ];
      svg.innerHTML = s;
      const par = Math.abs(c - g) < 1 && Math.abs(r - a) < 1;
      $(".fb-tv", el).textContent = `${$(".fb-t", el).value}°`;
      $(".fb-say", el).innerHTML = par ? `<strong style="color:${C.green}">Parallel four-bar.</strong> The orange link stays vertical the whole way up, so whatever you mount on it (a claw or an intake) stays level. That's why VEX lifts use this.`
        : `The orange link tilts as the arm moves. Set the top link equal to the tower (${g}) and the output arm equal to the input arm (${a}) to make it parallel.`;
    }
    $$("input", el).forEach(x => x.addEventListener("input", draw));
    $(".fb-par", el).addEventListener("click", () => { $(".fb-c", el).value = g; $(".fb-r", el).value = a; draw(); });
    $(".fb-play", el).addEventListener("click", e => { playing = !playing; e.target.textContent = playing ? "Pause" : "Play";
      const step = () => { if (!playing) return; const s = $(".fb-t", el); let v = +s.value + dir; if (v > 80 || v < -60) { dir *= -1; v += 2 * dir; } s.value = v; draw(); requestAnimationFrame(step); }; step(); });
    draw();
  });

  // ---------- 5. Laser hole compensation ----------
  $$(".holecomp").forEach(el => {
    el.innerHTML = `<div class="rc-row"><label>Hole you need <select class="hc-n"><option value="0.170">#8 screw clearance · 0.170 in</option><option value="0.180">#8 screw, easier fit · 0.180 in</option><option value="custom">Custom…</option></select></label>
      <label class="hc-cl" hidden>Custom <input type="text" class="hc-c" value="0.250" size="6"> in</label>
      <label>Kerf (your test) <input type="text" class="hc-k" value="0.008" size="6"> in</label></div>
      <div class="rc-out"><div><b>Draw the hole at</b><span class="hc-d"></span></div><div><b>Laser cuts it to</b><span class="hc-r"></span></div></div>
      <p class="sim__say">A laser hole comes out bigger than drawn, by the kerf. So draw it smaller: drawn = needed − kerf. Measure your own kerf on a test coupon first.</p>`;
    function calc() {
      const sel = $(".hc-n", el).value; $(".hc-cl", el).hidden = sel !== "custom";
      const need = sel === "custom" ? parseFloat($(".hc-c", el).value) : +sel, k = parseFloat($(".hc-k", el).value);
      if (isNaN(need) || isNaN(k)) { $(".hc-d", el).textContent = "—"; return; }
      $(".hc-d", el).textContent = `${f3(need - k)} in`; $(".hc-r", el).textContent = `${f3(need)} in`;
    }
    $$("select,input", el).forEach(x => x.addEventListener("input", calc)); calc();
  });

  // ---------- 6. Design review checklist ----------
  $$(".reviewsim").forEach(el => {
    const items = (el.dataset.items || "Solves the job in your design brief|Fits inside the robot's size limit (check the current game manual)|Every hole is on the 0.5 in pattern|Printed parts: prints flat, no supports, walls about 1 mm or more|Gear ratio chosen and explained with numbers|Moves through its full range with no interference|Named versions saved for each revision|Drawing or screenshots ready for the engineering notebook").split("|");
    el.innerHTML = `<div class="rc-check">${items.map((t, i) => `<label><input type="checkbox" data-i="${i}"> ${t}</label>`).join("")}</div><p class="sim__say rv-say" aria-live="polite"></p>`;
    const upd = () => { const n = $$("input:checked", el).length; $(".rv-say", el).innerHTML = n === items.length ? `<strong style="color:${C.green}">Ready for design review.</strong> Bring your notebook pages and your Onshape link.` : `${n} of ${items.length} checked. Fix the rest before your design review.`; };
    $$("input", el).forEach(i => i.addEventListener("change", upd)); upd();
  });
})();
