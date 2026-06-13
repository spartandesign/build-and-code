// make-ch03.js — builds Ch03 student + teacher handouts in the course design system
const fs = require("fs");
const H = require("./helpers");
const { body, sectionHeading, listItem, headerBand, nameLine, footerBlock,
        makeDoc, bulletConfig, decimalConfig, blueBox, infoBox, answerBox, dataTable,
        run, Packer, Paragraph, C } = H;

const BANNER = "ACTIVITY 2.1  ·  UNIT 2 — MECHANISMS & MOTION";
const TITLE = "Observing Mechanisms";

// ---------- shared content ----------
const intro = [
  "A ", { t: "mechanism", b: true },
  " is a device that takes one kind of motion or force and changes it into another — its direction, speed, torque, or type. Motion comes in four types: ",
  { t: "rotary", b: true }, " (turning), ", { t: "linear", b: true }, " (straight line), ",
  { t: "reciprocating", b: true }, " (back-and-forth in a line), and ", { t: "oscillating", b: true },
  " (swinging in an arc), and the six simple machines combine into the mechanisms all around us. The mechanism you'll use most this semester is the ",
  { t: "gear train", b: true },
  " — and on your EXP robot, whose motor speed is fixed, the gear ratio is the only speed-and-strength dial you have. In this activity you'll observe mechanisms on everyday objects, then build a gear train and feel the speed–torque trade with your own hands. Read Chapter 3 in the textbook for the full explanation.",
];

const objectives = [
  "Classify motion as rotary, linear, reciprocating, or oscillating, and spot the six simple machines inside everyday mechanisms.",
  "Identify the drive and driven gears in a gear train and explain why meshed gears turn in opposite directions.",
  "Calculate a gear ratio from tooth counts and predict what happens to speed and torque.",
  "Choose and justify a gear ratio for an EXP mechanism (drivetrain vs. arm) using the speed–torque trade.",
];

const keyIdeas = [
  [{ t: "Four motions:  ", b: true },
   "rotary (wheel), linear (drawer), reciprocating (saw blade), oscillating (swing). Mechanisms convert one into another — a rack and pinion turns rotary into linear."],
  [{ t: "Drive vs. driven:  ", b: true },
   "the drive gear is the one the motor turns (input); the driven gear is the output. Meshed gears always turn in opposite directions. Find the drive gear FIRST — it's where most wrong answers come from."],
  [{ t: "Gear ratio = driven teeth : drive teeth.  ", b: true },
   "24T driving 60T → 60:24 = 2.5:1 — the motor turns 2½ times per output turn. Bigger than 1 = slower and stronger; less than 1 = faster and weaker."],
  [{ t: "The trade:  ", b: true },
   "torque up means speed down, always. More torque: smaller drive gear or bigger driven gear. Memory hook: slow down to power up."],
  [{ t: "Your EXP numbers:  ", b: true },
   "the Smart Motor (5.5W) is fixed at 200 RPM and 0.5 N·m — no swappable cartridges (that's V5). Your kit's gears are 24T, 36T, 48T, and 60T; external gearing is your only ratio tool. 24T→60T gives an arm 2.5× the torque at 80 RPM."],
];

const equipment = [
  "VEX EXP parts: 24T/36T/48T/60T gears, shafts, bearing flats, shaft collars, flat bars or C-channels",
  "Everyday objects with mechanisms (scissors, eggbeater, can opener, bicycle)",
  "Engineering notebook",
];

const procedure = [
  [{ t: "See the four motions.  ", b: true },
   "Watch the demonstration of rotary, linear, reciprocating, and oscillating motion; copy the four into your notebook with one example of your own per type."],
  [{ t: "Observation stations.  ", b: true },
   "At each station, record the input motion, the mechanism (and the simple machines inside it), and the output motion in the table below."],
  [{ t: "Build and feel the trade.  ", b: true },
   "Mount a 24T gear meshed with a 60T gear on a flat bar (bearing flats behind each shaft, collars to hold them). Turn the 24T by hand while your partner gently resists the 60T shaft — feel how strong the slow shaft is. Then drive the 60T and feel the 24T spin fast but give up easily. Write one sentence about what you felt."],
  [{ t: "Complete the gear-ratio practice table  ", b: true },
   "below — the first row is worked for you."],
  [{ t: "Class discussion:  ", b: true },
   "which simple machines appeared at each station, and where did motion change type?"],
];

const stationHeader = ["Station / object", "Input motion", "Mechanism & simple machines", "Output motion"];
const stationExample = [
  [{ t: "Eggbeater ", i: true }, { t: "(example)", i: true, color: C.gray }],
  [{ t: "Rotary (hand crank)", i: true, color: C.gray }],
  [{ t: "Gear train — wheel & axle + gears; big drive gear, small driven gears → speeds up", i: true, color: C.gray }],
  [{ t: "Rotary (faster)", i: true, color: C.gray }],
];
const blankRow = ["", "", "", ""];

const ratioHeader = ["Drive (input) teeth", "Driven (output) teeth", "Gear ratio", "What happens to speed & torque?"];
const ratioExample = [
  "24", "48",
  [{ t: "48:24 = 2:1", i: true, color: C.gray }],
  [{ t: "Drive turns twice per output turn — speed halves (200 → 100 RPM), torque doubles.", i: true, color: C.gray }],
];
const ratioRows = [["36", "60", "", ""], ["48", "48", "", ""], ["60", "24", "", ""], ["24", "60", "", ""]];
const ratioAnswers = [
  "60:36 = 5:3 ≈ 1.7:1 — slower (200 → 120 RPM), about 1.7× the torque.",
  "1:1 — same speed and torque; only the direction of rotation reverses.",
  "24:60 = 1:2.5 — 2.5× faster (200 → 500 RPM), 2.5× less torque.",
  "60:24 = 2.5:1 — slowest (200 → 80 RPM), 2.5× the torque. The classic arm/lift choice.",
];

const questions = [
  "Give an example of a mechanism that converts rotary motion into linear motion.",
  "Why do engineers care about the type of motion a mechanism produces?",
  "A 24-tooth gear on the motor drives a 60-tooth gear on a wheel. What is the gear ratio, what is the output speed if the motor spins 200 RPM, and which shaft has more torque?",
  "Fill in the blanks: As the torque of a gear train increases, the speed _______. To increase torque, you should _______ the size of the drive gear or _______ the size of the driven gear.",
  "Pedaling a bike up a steep hill, you shift to a low gear. Which way are you trading speed and torque, and why does it help?",
  "Your robot's arm motor whines and quits when lifting a full water bottle. Without a bigger motor, what's the fix — and what will you give up?",
];

const answers = [
  "A rack-and-pinion, a screw, or a wheel driving a vehicle forward are all acceptable.",
  "The task dictates the motion needed (lifting = linear, steering = rotary); choosing the right mechanism makes the design efficient and reliable.",
  "Ratio 60:24 = 2.5:1. Output speed = 200 × 24/60 = 80 RPM. The 60T (wheel) shaft has more torque — about 2.5× the motor's.",
  "decreases; decrease (drive gear); increase (driven gear).",
  "Trading speed for torque: the wheel turns more slowly for the same pedaling, but each pedal stroke delivers more turning force — so the same effort climbs the hill.",
  "Add a gear reduction: small (24T) drive gear on the motor, large (60T) driven gear on the arm shaft — about 2.5× the torque. The trade-off is speed: the arm lifts more slowly (and meshes add a little friction).",
];

// ---------- builders ----------
function buildContent({ teacher }) {
  const ch = [];
  ch.push(headerBand(BANNER, TITLE,
    (teacher ? "Teacher Copy" : "Student Edition") + " — VEX EXP · C++ in VS Code"));

  if (teacher) {
    ch.push(new Paragraph({ children: [run(" ")], spacing: { before: 120, after: 0 } }));
    ch.push(infoBox([
      new Paragraph({
        children: [
          run({ t: "Pacing & prep.  ", b: true, color: C.blue }),
          run("Activity 2.1, about Week 3 on the block schedule (sync to your pacing calendar). No Brain or coding needed — no charging. Set up observation stations (scissors, eggbeater, can opener, a bicycle if you can park one in the room) and pre-build two demo gear trains on flat bars: 24T→60T and 60T→24T. Run the 'feel the trade' demo in pairs and insist on the drive-gear-first habit — misidentifying the drive gear is the #1 source of wrong ratios. Misconception watchlist: 'bigger gear spins faster' (it's the opposite); 'a middle gear changes the ratio' (it doesn't — that's an idler; full treatment in Chapter 4); writing the ratio without saying which gear is driven. The gear-ratio table answers are in the key below; gear-down/gear-up language returns in Chapters 4–6, so this foundation pays off three times."),
        ],
        spacing: { line: 264 },
      }),
    ]));
  } else {
    ch.push(nameLine());
  }

  ch.push(sectionHeading("Introduction"));
  ch.push(body(intro));

  ch.push(sectionHeading("Learning Objectives"));
  objectives.forEach(o => ch.push(listItem(o, "obj")));

  ch.push(sectionHeading("Key Ideas (quick reference)"));
  keyIdeas.forEach(k => ch.push(listItem(k, "ideas")));

  ch.push(sectionHeading("Equipment & Materials"));
  equipment.forEach(e => ch.push(listItem(e, "equip")));

  ch.push(sectionHeading("Procedure"));
  procedure.forEach(p => ch.push(listItem(p, "proc")));

  ch.push(sectionHeading("Observation Stations"));
  ch.push(dataTable(stationHeader,
    [stationExample, blankRow, blankRow, blankRow, blankRow],
    [2200, 1900, 3360, 1900]));

  ch.push(sectionHeading("Gear-Ratio Practice Table"));
  ch.push(body([
    "Ratio = ", { t: "driven teeth : drive teeth", b: true },
    ". Bigger than 1 → slower and stronger. The motor spins 200 RPM.",
  ], { after: 70 }));
  if (teacher) {
    ch.push(dataTable(ratioHeader,
      [ratioExample, ...ratioRows.map((r, i) => [r[0], r[1],
        [{ t: ratioAnswers[i].split(" — ")[0], color: C.greenInk, b: true }],
        [{ t: ratioAnswers[i].split(" — ").slice(1).join(" — "), color: C.greenInk }]])],
      [1700, 1800, 2300, 3560]));
  } else {
    ch.push(dataTable(ratioHeader, [ratioExample, ...ratioRows], [1700, 1800, 2300, 3560]));
  }

  ch.push(sectionHeading("Conclusion Questions"));
  ch.push(new Paragraph({
    children: [run({ t: "Answer in complete sentences.", i: true, color: C.gray })],
    spacing: { after: 80 },
  }));
  questions.forEach((q, i) => {
    ch.push(listItem(q, "conc", { before: 90 }));
    if (teacher) ch.push(answerBox(answers[i]));
  });

  ch.push(...footerBlock(teacher ? "Teacher Copy" : "Student Edition"));
  return ch;
}

const numbering = [
  bulletConfig("obj"), bulletConfig("ideas"), bulletConfig("equip"),
  decimalConfig("proc"), decimalConfig("conc"),
];

async function main() {
  const outDir = "/home/claude/build-and-code/handouts";
  for (const teacher of [false, true]) {
    const doc = makeDoc(buildContent({ teacher }), numbering);
    const buf = await Packer.toBuffer(doc);
    const name = teacher ? "Ch03_Mechanisms_TEACHER.docx" : "Ch03_Mechanisms_STUDENT.docx";
    fs.writeFileSync(`${outDir}/${name}`, buf);
    console.log("wrote", name, buf.length, "bytes");
  }
}
main().catch(e => { console.error(e); process.exit(1); });
