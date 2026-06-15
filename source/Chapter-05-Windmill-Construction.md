# Chapter 5 — Windmill Construction
*Unit 2 · Mechanisms & motion · **Project***

**What you'll learn:** your first real engineering *project* — not a recipe, but a problem to solve. You'll run the full **engineering design process**, pick a design with a **decision matrix**, and put Unit 2 to work: a bevel gear to turn the corner 90° and a gear ratio chosen for enough torque to lift a load — all documented in your engineering notebook.

---

## From worksheets to a real problem

Until now, every build had an answer key. This one doesn't. A **windmill** captures rotary motion — historically from the wind — and turns it into useful work. Your job: build a geared windmill that **lifts a small load**, turning the rotor's spin into a steady pull on a string. There are many right answers; your team finds *yours* the way engineers do — run a process, make choices on purpose, test, improve. The mechanism from Chapters 3–4 is the heart of it: the windmill has to **change the direction of motion 90°** and **gear for the torque** to lift.

## The engineering design process

Engineers don't start by building. They follow a **loop** you'll use on every project:

1. **Define the problem.** Read the design brief; restate what the windmill must do and its limits, in your own words.
2. **Brainstorm.** Generate *at least three* concepts and sketch each. Quantity first — no idea rejected yet.
3. **Select.** Compare concepts with a **decision matrix**; choose on purpose, not by gut.
4. **Build.** Construct your design from EXP parts. Rigid frame — a wobbly frame lets gears slip.
5. **Test.** Try to lift the load. Measure: did it lift? how fast? did it stall?
6. **Improve, then loop.** Change gearing or stiffen structure; test again. Repeat until reliable.

Documenting in your notebook runs through every step. You'll often cycle Test → Improve → Build several times — that's normal, not failure.

## The design brief

A **client** hands engineers a **design brief**. Yours:

- **Client:** your teacher (standing in for someone who needs a load lifted).
- **Problem statement:** a load needs raising, and only rotary motion is available.
- **Design statement:** design and build a geared windmill that converts rotary input into a lifting motion and raises the standard load.
- **Constraints:** build only from the EXP kit; fit one storage cubby (≈33 × 33 × 39 cm); change direction of motion 90°; be stable and rigid.
- **Deliverables:** a working windmill, a completed decision matrix, a documented notebook.

## Choosing on purpose: the decision matrix

List the **criteria** that matter, give each a **weight**, then **score** each concept (1 poor – 5 great). Score × weight, summed:

| Criterion | Weight | A (spur 1:1) | B (spur, geared down) | C (bevel + geared down) |
|---|---|---|---|---|
| Lifting power (torque) | 5 | 2 → 10 | 4 → 20 | 5 → 25 |
| Turns the corner 90° | 5 | 1 → 5 | 1 → 5 | 5 → 25 |
| Stable & rigid | 3 | 4 → 12 | 3 → 9 | 4 → 12 |
| Easy to build | 2 | 5 → 10 | 4 → 8 | 3 → 6 |
| Fits the cubby | 2 | 5 → 10 | 4 → 8 | 4 → 8 |
| **Total** | | **47** | **50** | **76** |

Concept C wins — and *why* is visible: the two highest-weighted criteria (lifting power, turning the corner) are met only by the bevel design. Your criteria/weights may differ — that's the point.

## The windmill's engineering: turn the corner, gear for lift

- **Turn the corner — the bevel gear.** The rotor spins on one axis; the lifting drum may need an axis 90° away. A **bevel gear** pair transfers rotation "around the corner," changing the axis of motion 90° (Chapter 4). The catch is keeping the pair meshed at the right angle — a **gearbox bracket** holds a bevel pair at the correct spacing so the teeth don't skip under load.
- **Gear for lift — the gear ratio.** Lifting takes *torque*. If the windmill spins free but stalls under load, the fix is a **gear reduction** (Chapter 3): gear down so the drum turns slower but pulls harder. The trade is speed — and for lifting, slower-but-stronger is what you want.

**Three gearings to model:** A — equal (1:1); B — geared down (slower, more torque — the lifting setup); C — geared up (faster, less torque). Name the mechanism in each.

## The engineering notebook

Document as you go: restated problem + constraints; three labeled concept sketches; completed decision matrix; gear ratio choice and why; test results and every change you made. A good notebook lets someone else rebuild your windmill and understand every decision.

## Build constraints

1. **Build from the EXP kit** — including bevel gears from the Advanced Gear Kit. (Shared with V5; build from the EXP supply so the competition kits stay complete.)
2. **Fit the cubby** — the whole windmill fits ≈33 × 33 × 39 cm (13 × 13 × 15 in). Break it down at the end.

## Safety

- Keep fingers, hair, and loose clothing clear of meshing gears and the spinning rotor.
- The lifted load can swing or drop — keep it light, lift over the table, stand clear of the drop zone.
- If a motor drives the rotor, clear the gear train before it spins and stop it before adjusting.

## Do it

1. **Define** — restate problem and constraints in your notebook.
2. **Brainstorm** — sketch ≥3 concepts; label input (rotor) and output (drum); note the 90° turn and gearing.
3. **Select** — decision matrix; total columns; choose and record.
4. **Build** — rigid frame; confirm it fits the cubby.
5. **Model the three gearings** — A (1:1), B (down), C (up); name each mechanism; record the lift.
6. **Test & improve** — lift the load; gear down or stiffen if it stalls; loop until reliable, recording changes.
7. **Gallery walk** — compare, give and collect peer feedback.

## Check your understanding

1. How did your gear ratio choice affect the windmill's ability to lift the load?
2. What would you change if you built it again, and why?
3. Which mechanisms from Unit 2 can *increase torque and decrease speed*? (List all.)
4. Which mechanisms can *transmit rotary motion at a 90° angle*?
5. What is the purpose of an idler gear — and did your windmill use one?
6. How did the decision matrix change (or confirm) the design you'd have picked by gut feeling?

## Key terms

windmill · engineering design process · design brief · client · problem statement · design statement · constraint · deliverable · brainstorm · decision matrix · criteria · weight · prototype · iterate · bevel gear · gear reduction · torque · engineering notebook

**Sources (VEX Library, kb.vex.com / vexrobotics.com):** Building with VEX EXP; Using Gear Ratios with the V5 Motor; VEX Gears overview (bevel gears change the axis of motion 90°); Advanced Gearbox Brackets (https://www.vexrobotics.com/advanced-gearbox-brackets.html). Engineering design process, design brief, and decision-matrix structure adapted from the PLTW Gateway *Automation & Robotics* curriculum. Bevel gears are included in the PLTW Gateway VEX EXP kit's Advanced Gear Kit.
