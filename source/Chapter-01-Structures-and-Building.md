# Chapter 1 — Structures & Building
*Unit 1 · Building the body of a robot*

**What you'll learn:** the parts and tools of the VEX EXP building system, how parts actually join, why some shapes and joints stay rigid while others wobble, and how to build a structure that survives being pushed on.

---

## Why the body comes first

Before a robot can move, sense, or run a program, it needs a frame to hold everything together — the **chassis**. The chassis carries the drivetrain that makes the robot mobile, and it's also what every arm, claw, lift, or intake bolts onto. Because it's the framework that supports the whole robot, the chassis has to be rigid.

If it flexes, everything mounted to it flexes too: wheels toe out of alignment and the robot pulls to one side, an arm sags and misses its target, a loose motor twists and grinds its gears. A solid structure is what makes the *interesting* parts work — which is why engineers say **you can't program your way out of a bad build.**

---

## The VEX EXP building system

EXP bolts together with screws and nuts — there are no snap-in pins. The structural metal:

- **C-channels** — U-shaped metal, your strongest and main building piece. The folded U-shape resists bending far better than flat metal of the same length, the same reason construction uses steel channels and I-beams. This is what your frame and arms should be made of.
- **Flat bars** (also called *flat beams*) — one-hole-wide strips for lighter links and braces.
- **Flat plates** — wide hole-filled sheets. Important: plates are *not* meant to be the main structural members of a chassis — that's a job for C-channels. Plates shine at *connecting and stiffening* (more on that below).
- **Gussets** — angled brackets that lock a corner. Wherever two structural pieces meet but don't overlap, a gusset bridges and strengthens the joint. Flat gussets brace a joint in one plane; bent gussets wrap a 90° corner; they come in 30°, 45°, 60°, and 90°.
- **Standoffs** — threaded #8-32 posts (¼" to 6") that hold two parts apart with a rigid connection.
- **Shafts, shaft collars, and bearings** — square rods that spin to carry motion; collars stop them sliding; bearing flats let them turn smoothly through a hole. (Heavy use in the gears unit.)

> **📚 Learn more — VEX Library**
> - [Building with VEX EXP](https://kb.vex.com/hc/en-us/articles/15034994190228-Building-with-VEX-EXP) — a tour of the structural parts with photos
> - [Using the Printable EXP Parts Ruler](https://kb.vex.com/hc/en-us/articles/4418696591124-Using-the-Printable-VEX-EXP-Parts-Ruler) — identify and measure parts during your inventory

---

## Tools and fasteners

The whole kit goes together with just two tools and basically one screw and one nut:

- The **T15 Star Drive Key** drives every screw in the kit — the **#8-32 Star Drive Screw**. EXP uses a *star* (Torx) socket instead of the older hex socket because star heads strip far less and let you tighten hard.
- The **Open-End Wrench** holds a nut or standoff still while you drive the screw into it. Its small end fits the **#8-32 Low Profile Nut** — the only nut in the EXP system — and the #8-32 Standoff.

So the motion you'll repeat a thousand times this semester: **wrench holds the nut, star key turns the screw.**

> **📺 Watch it — VEX Library**
> - [Understanding and Using EXP Tools](https://kb.vex.com/hc/en-us/articles/13076232754964-Understanding-and-Using-EXP-Tools) — a short video of the T15 Star Drive Key and open-end wrench in use
> - [Using V5 Fasteners](https://kb.vex.com/hc/en-us/articles/360035952791-Using-V5-Fasteners) — the wider VEX fastener family (locking nuts, screw types, retainers), with videos. **Heads-up:** this is the V5/competition page, so it shows more parts than your EXP kit — your kit uses just the **#8-32 Star Drive Screw** and **#8-32 Low Profile Nut**. Great background, and especially useful if you also build on the V5 competition team.

> ### 🔧 Shop tip: faster fastening with retainers
> The wrench-holds-the-nut method always works, but it needs two hands and a clear line to the back of the joint — awkward when you're reaching inside a frame. The kit's **Standoff Retainers** fix that: a retainer holds a nut or standoff captive so you can tighten a screw into it *without a wrench at all*. They come in **1-post** and **4-post** versions (and some with a built-in bearing flat for shafts).
>
> One thing to know: there are two families of retainers in the VEX system, and your EXP kit uses the **Standoff Retainer** — sized for the #8-32 Low Profile Nut and standoffs. The larger Hex Nut Retainers are for Nylock and Hex nuts, which aren't in the EXP kit; a Low Profile Nut dropped into one is too small to be held. So if a retainer isn't gripping your nut, you've grabbed the wrong family. Reach for these on hard-to-wrench spots and to speed up repetitive joins.
>
> 📚 *Learn more:* [Standoff vs. Hex Nut Retainers](https://kb.vex.com/hc/en-us/articles/10715612722964-Understanding-Standoff-vs-Hex-Nut-Retainers) — VEX's size chart showing which retainer fits which nut

---

## How parts actually join: one screw is a hinge

Here's a rule that prevents the single most common rookie mistake. **Never join two structural pieces with a single screw unless you *want* them to pivot.** One screw is a pin the parts can rotate around — a hinge. Two or more screws through different holes lock the angle so it can't rotate.

The flip side is a real engineering tradeoff: the more stress a joint takes, the more screws it should have — but more screws also means more weight. Good builders use *enough* fasteners where forces are high and fewer where they aren't.

---

## The big idea: triangulation

Now the most useful structural idea in the course. Build a square from four pieces and join each corner with a *single* screw, then push on one corner. It leans and collapses into a slanted parallelogram — the corners act like hinges and the shape **racks** (shears out of square). That's the one-screw-hinge problem at the scale of a whole structure. Now add one piece diagonally across it. Push again — it barely moves.

Why? The diagonal splits the square into two **triangles**, and a triangle can't change shape unless one of its sides changes *length*. Since the metal won't stretch, the triangle is locked. This is **triangulation**, and you'll see it in bridges, cranes, radio towers, and the roof trusses over your gym. On an EXP robot, when you can't fit a full diagonal piece, a **45° gusset** turns a wobbly corner into a braced triangle in two screws.

---

## Three ways VEX builders stiffen a structure

Triangulation is the headline, but there are three more techniques worth knowing:

1. **Box construction.** Bolt a plate between two C-channels (or close a frame into a rectangle) to create a box. A closed box resists twisting far better than open metal — this is *the* trick for a stiff drivetrain.
2. **Standoffs as braces.** A standoff placed between two structural pieces adds a connection point and keeps the metal from bending under load. They're not just spacers — they're stiffeners.
3. **More connection points at lonely junctions.** A tower or anything attached at only one place needs as many fasteners as possible right at that junction, plus supports made from bar, gusset, or plate.

> **📚 Learn more — VEX Library**
> - [Stiffening a V5 Chassis](https://kb.vex.com/hc/en-us/articles/360035590992-Stiffening-a-V5-Chassis) — 3D build examples of box construction, gussets, and standoff braces. (It's shown on V5, but the techniques are identical on EXP.)

---

## Where this matters most

Spend your effort where flex hurts most. The **drivetrain** comes first — twist there and the wheels lose alignment, so this is where C-channels and box construction earn their weight. **Arm and lift joints** are next, because a little flex at the base becomes a big miss at the end of the arm. And every **motor mount** must be solid, or the motor shifts and chews its gears.

> **📚 Learn more — VEX Library**
> - [Designing a V5 Chassis](https://kb.vex.com/hc/en-us/articles/360035953131-Designing-a-V5-Chassis) — how to plan a frame: its shape, laying out components before you build, and giving every spinning shaft **two points of support** so it doesn't bind. (V5/EDR page — it covers steel-vs-aluminum and parts beyond the EXP kit, but the design thinking carries straight over.)

---

## How to load-test safely

The goal of a load test in this lesson is **not** to find the breaking point. It's to *feel the difference a brace makes.* You can show that with tiny forces, long before anything deforms.

The reframe: **you're testing for *flex* (wobble that springs back), not for *failure* (permanent bending).** EXP metal is aluminum, so it *can* take a permanent set if someone leans on it. The moment a structure visibly gives and stays bent, the test has gone too far — and for this lesson, that was never the target.

**Three gentle methods, easiest first:**

- **Hand-wiggle test (no weights).** Hold the base, push the top sideways with *one finger*, and watch how far it deflects before springing back. Add a brace, repeat the *same* push, and watch it barely move. This alone teaches the whole concept, and one finger can't bend anything.
- **Known weights.** Add identical units one at a time — a paperback, a full water bottle — and *measure the deflection*, not the destruction. Record results like "sagged 4 mm with two bottles before bracing, 1 mm after."
- **Hanging load.** For a bridge or arm, hang a small bucket from the middle and add marbles or washers in tiny increments. Easy to add slowly, easy to stop.

**Three rules that keep the metal safe:**

1. **Set a hard load cap before you start** and write it down ("maximum three water bottles," or "stop at 2 cm of deflection"). The test ends at the cap — reaching it is *not* failure.
2. **No pushing down by hand, no standing on it, no levering.** A student's arm delivers far more force than any sane test load. Force comes only from the agreed weights or a single light finger-push.
3. **Measure deflection; define "pass" as springs-back.** Success is *how little it moved*, so the reward goes to the stiffest design — not the one that survived a catastrophe.

> **If a structure *does* take a small bend, that's a lesson, not a loss.** The bent spot is showing you exactly where the load concentrated and where a brace was missing. Straighten it by hand, add a gusset there, and re-test.

---

## What you'll need

- VEX EXP kit (structural metal, standoffs, shafts, fasteners)
- T15 Star Drive Key and open-end wrench
- A standard load for testing (identical water bottles, books, or a bucket + marbles)
- Engineering notebook

---

## Build it

> **📺 Watch it / Build it — VEX Library & STEM Labs**
> - [Building Your First EXP Robot (BaseBot)](https://kb.vex.com/hc/en-us/articles/4432197062804-Building-Your-First-EXP-Robot) — new to building? This follow-along video shows how EXP parts go together
> - [EXP Build Instructions](https://www.vexrobotics.com/exp/downloads/build-instructions) — VEX's official 3D and PDF guides for example robots

1. **Inventory and sort** the kit; set up the parts-management routine you'll keep all semester. Knowing a flat gusset from a bent one now saves you later.
2. **Practice the joins:** bolt a C-channel to a plate with a star screw and Low Profile Nut (T15 key plus wrench), using *two* screws so the joint can't pivot. Mount a shaft so it spins freely but is locked against sliding by a collar.
3. **Build a freestanding tower or bridge of your own design** (or one your teacher provides), then **load-test** it using the safe method above — note *where* it flexes most.
4. **Brace it.** Add a diagonal, a gusset, a standoff, or close a box exactly where it wobbled. Test again with the *same* load and record the before/after in your notebook.

---

## Check your understanding

1. Using triangulation, explain why a diagonal brace or a 45° gusset makes a structure stronger.
2. A C-channel and a flat bar are the same length. Which resists bending better, and what about its shape explains that?
3. You join two beams with one screw and they keep rotating. What's happening, and what's the fix?
4. Why does adding more screws to a joint make it stronger but isn't always the best choice?
5. Name one way to stiffen a drivetrain *other* than adding a diagonal brace.
6. In a load test, why do we measure how far the structure flexes instead of how much weight makes it break?

---

## Key terms

chassis · C-channel · flat bar (flat beam) · flat plate · gusset · standoff · shaft · shaft collar · bearing · T15 Star Drive Key · open-end wrench · #8-32 Star Drive Screw · #8-32 Low Profile Nut · Standoff Retainer · pivot vs. fixed joint · triangulation · racking · box construction · flex vs. failure · load-test

---

*Sources (VEX Library, kb.vex.com): Building with VEX EXP; Understanding and Using EXP Tools; Using V5 Fasteners; Stiffening a V5 Chassis; Designing a V5 Chassis; Understanding Standoff vs. Hex Nut Retainers; Using the Printable VEX EXP Parts Ruler.*
