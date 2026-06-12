// make-ch02.js — builds Ch02 student + teacher handouts in the course design system
const fs = require("fs");
const H = require("./helpers");
const { body, sectionHeading, listItem, headerBand, nameLine, footerBlock,
        makeDoc, bulletConfig, decimalConfig, blueBox, infoBox, answerBox,
        run, Packer, Paragraph, C } = H;

const BANNER = "ACTIVITY 1.2  ·  UNIT 1 — ROBOTS IN OUR WORLD";
const TITLE = "What Do We Use Robots For?";

// ---------- shared content ----------
const intro = [
  "Robots give us access to places people cannot safely go, protect us from danger, and take over tedious or repetitive work — the ",
  { t: "three Ds", b: true },
  ": dirty, dangerous, and dull jobs. Some of the first robots handled radioactive materials in the 1940s; today robots weld and assemble in factories, assist in surgery, vacuum homes, and explore other planets. Every robotic system has five main parts: a ",
  { t: "controller", b: true }, " (its brain), a ", { t: "program", b: true },
  " that tells it what to do, a ", { t: "manipulator", b: true },
  " that provides movement, an ", { t: "end effector", b: true },
  " that acts like a hand, and a ", { t: "power supply", b: true },
  ". In this activity, your team researches one class of robot and teaches the class about it. Read Chapter 2 in the textbook for the full explanation.",
];

const objectives = [
  "Describe what a robot is and the five parts of a robotic system.",
  "Research a category of robot and explain the task it performs and the human function it replaces or extends.",
  "Discuss benefits, drawbacks, and societal impacts of automation, including effects on jobs.",
  "Present findings clearly and summarize peers' presentations.",
];

const keyIdeas = [
  [{ t: "A robot senses → decides → acts:  ", b: true },
   "it senses its surroundings, decides using its program, acts on the world, then checks again. A machine that never senses (a toaster) is not a robot."],
  [{ t: "Five parts of a robotic system:  ", b: true },
   "controller (brain), program (instructions), manipulator (movement), end effector (hand), power supply. On your EXP robot: Brain, your C++ program, chassis/arm, claw, EXP Battery."],
  [{ t: "Degrees of freedom & work envelope:  ", b: true },
   "each flexible joint adds a direction of movement; the work envelope is the space the robot can reach — and the space people must stay out of."],
  [{ t: "Sensors close the loop:  ", b: true },
   "touch (Bumper Switch), distance (Distance Sensor), light/color (Optical Sensor), motion (Inertial Sensor) — your kit has the same sensor families big robots use."],
];

const equipment = [
  "Engineering notebook and pencil",
  "Computer with internet access and presentation software",
  "Reference books or articles on robotics",
];

const procedure = [
  [{ t: "Form teams and claim a category.  ", b: true },
   "Your teacher assigns each team a robot category: industrial, medical, automated vehicles, household, military, toys, exploratory, rescue, or assistive."],
  [{ t: "Choose a specific robot and research it  ", b: true },
   "against every question in the research checklist below. Split questions among teammates, but review everything together."],
  [{ t: "Build a short presentation  ", b: true },
   "with sketches, photos, or video of the robot in action."],
  [{ t: "Present, listen, and summarize.  ", b: true },
   "Present to the class; take notes during other teams' presentations; then write a paragraph summarizing what you learned across all the robots."],
];

const checklist = [
  "What task does the robot perform, and what human function does it simulate, replace, or extend?",
  "Where is it used, and what is its work envelope — how many degrees of freedom or flexible joints does it have?",
  "Is its end effector multi-functional? If so, what else can it do?",
  "How is the robot taught to perform its task?",
  "What sensors does it have, and how does it use them?",
  "What are the advantages and disadvantages of using a robot for this task?",
  "What impact has it had — or could it have — on the people it serves?",
  "What jobs and careers does this robot create?",
  "How might this robot be altered to do more, or different, tasks in the future?",
];

const rubricNote = [
  { t: "How you'll be graded:  ", b: true },
  "content (accurate, answers every checklist question), organization (easy to follow), delivery (on topic, audible, eye contact), and cooperation & teamwork. A beautiful presentation that skips three questions loses to a plain one that nails all nine.",
];

const questions = [
  "Name the five main parts of a robotic system, and identify where each one is on your EXP robot.",
  "In your own words, what is a work envelope, and why does it matter for safety around an industrial robot?",
  "Which robot do you think will have the most significant impact on humans, and why?",
  "What concerns do you have about the increasing use of robots in society?",
  "What do you think about giving up control to a machine?",
];

const answers = [
  "Controller = EXP Brain; program = the C++ project written in VS Code; manipulator = the chassis, motors, and arm; end effector = the claw; power supply = the EXP Battery. Accept equivalent mappings stated in the student's own words.",
  "The work envelope is the space the robot's arm can actually reach, set by its link lengths and degrees of freedom. It matters because anything (or anyone) inside it can be struck by a fast-moving arm — which is why industrial robots work in cages or behind light curtains.",
  "Teacher note: Accept reasoned answers; look for a connection between the robot's capability and a large population or high-stakes task.",
  "Teacher note: Look for thoughtful treatment of job displacement, safety, privacy, or over-reliance — not just \u201Crobots are scary.\u201D",
  "Teacher note: No single right answer; reward students who weigh trade-offs (convenience/safety vs. autonomy/accountability).",
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
          run("Activity 1.2, about Weeks 1–2 on the block schedule (sync to your pacing calendar). No EXP hardware or coding is needed yet — no charging. Reserve computers and presentation software, and assign the nine categories to teams before research day. Content is essentially unchanged from the original research-and-present activity; refresh the example robots with current ones (warehouse/AMR robots, surgical robots, delivery drones, vacuum and lawn robots, Mars rovers). Grade with the four-part rubric: content, organization, delivery, cooperation & teamwork."),
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

  ch.push(sectionHeading("Research Checklist (answer all nine)"));
  ch.push(blueBox(checklist.map((q, i) =>
    new Paragraph({
      children: [run({ t: `${i + 1}.  `, b: true, color: C.blueInk }), run(q)],
      spacing: { after: i === checklist.length - 1 ? 0 : 50, line: 264 },
    })
  )));

  ch.push(body(rubricNote, { before: 140 }));

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
    const name = teacher ? "Ch02_Robots_TEACHER.docx" : "Ch02_Robots_STUDENT.docx";
    fs.writeFileSync(`${outDir}/${name}`, buf);
    console.log("wrote", name, buf.length, "bytes");
  }
}
main().catch(e => { console.error(e); process.exit(1); });
