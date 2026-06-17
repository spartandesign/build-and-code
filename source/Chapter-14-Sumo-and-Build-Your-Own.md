# Chapter 14 · Sumo Competition & Build Your Own

**Unit 4 · Control & competition · Projects 4.2 & 4.3**

**What you'll learn:** the finale — a *build*, not a lecture. Everything from this year comes down to two capstone challenges. First, a head-to-head **robot sumo** tournament: design a robot that pushes its opponent out of the ring. Then **build your own** — pick a real problem and design a robot to solve it, autonomous or driver-controlled. No new command to learn; instead you'll combine **building**, **gears** for pushing power, **sensors** and autonomous decisions, and **driver control**, all run through the **engineering design process** you've used since day one.

## The finale: you're the engineer now

You've learned to build something **sturdy** (Units 1–2), how **gears** trade speed for force, how a **mechanism** turns rotation into useful motion, and how a robot is a **system** of inputs, decisions, and outputs. You learned to plan in **pseudocode**, write your **first C++ program**, make a robot run **itself** with sensors (Ch11), and **drive** one by hand (Ch13). Up to now most chapters handed you a thing to build; these last two hand you a **goal** and let *you* design the robot — which is what real engineering is. Two challenges, and your teacher says whether you do one or both:

- **Challenge 1 — Sumo:** a structured competition; everyone builds to the same rules and faces off in a tournament.
- **Challenge 2 — Build Your Own:** wide open; you pick the problem and define what "success" means.

## Challenge 1: robot sumo (Honbasho)

Sumo is a centuries-old Japanese sport — push your opponent out of a ring. **Robot sumo** (*Honbasho*) started in Japan and is now the most popular robot competition in the world: two robots, one ring, one job — **push the other robot out**.

*(Diagram: a top-down 122 cm / 48 in ring with a thick black border; YOUR robot (blue, wedge front) pushes the OPPONENT toward the edge. "the floor = OUT — any part here, you lose"; "the black border still counts as INSIDE.")*

Simplified rules (from the official Japanese rules):

- A **match is 2 minutes**; the tournament is **double elimination** (out after two losses).
- An **inspection** before each match checks the rules and safety; an unsafe robot doesn't compete.
- Start on the referee's go; **jumping the start** costs a freeze penalty.
- Once the match starts, **you can't touch your robot** or reach into the ring.
- A robot is **out** when any part touches the floor *outside* the ring (even a broken-off piece). You **win** by pushing your opponent out, or if they drive themselves out.
- **15 seconds** stopped = giving up = a loss. If no one is out at time, judges decide on technical merit.
- **No interference** (signal jamming) and **no deliberate damage** — it's a pushing contest, not a demolition derby.

## Strategy: where pushing power comes from

Winning sumo is an **engineering** problem, and you know the engineering. The robot that **pushes harder** and **stays planted** wins. Three levers, all met earlier:

*(Diagram: a side view — a low, wide robot with grippy wheels, a low CG marker, and a wedge slipping under an opponent's wheel to lift it. Callouts: LOW & WIDE (hard to tip/shove); TRACTION (weight on grippy wheels; spin = nowhere); GEAR DOWN (trade speed for torque — torque is pushing force, Ch 4).)*

- **Torque, not speed (Ch3–4).** Gear down (small gear drives a big one) to trade speed for **torque** — turning force. In a shoving match, **torque is pushing force**; a geared-down robot out-pushes a fast one every time.
- **Traction.** Torque is wasted if the wheels spin. Traction = **grippy wheels with weight pressing on them**; mass over the drive wheels grips the mat.
- **Low and wide (Ch7).** A **low center of gravity** and **wide wheelbase** resist tipping and shoving — the stable-base idea again.

A classic add-on: a **wedge** at the front. Slide it under the opponent to lift their wheels off the mat, and a robot whose wheels aren't touching can't push back.

## Drive it, or let it drive itself?

This is the Ch11-vs-Ch13 choice. Most sumo teams **drive** (you react faster than a simple program) — the tank drive from Ch13. But you *can* make sumo **autonomous**, using the **Distance Sensor** from Ch11 to find and charge the opponent:

```cpp
distance frontEye  = distance(PORT2);   // looks for the opponent
motor leftMotor  = motor(PORT1);
motor rightMotor = motor(PORT6, true);

int main() {
    vexcodeInit();
    while (true) {
        if (frontEye.objectDistance(mm) < 400) {   // opponent close ahead?
            leftMotor.spin(forward);               // charge straight in
            rightMotor.spin(forward);
        } else {                                   // can't see one —
            leftMotor.spin(forward);               // spin in place to search
            rightMotor.spin(reverse);
        }
        wait(20, msec);
    }
}
```

It's the same autonomous shape from Ch11: a forever loop, a sensor reading, an `if` that decides. It hunts (spin until the Distance Sensor sees something close), then charges. What it *doesn't* solve is staying in the ring — for that a robot senses the **edge**, usually with a downward **Optical Sensor** that spots the black border and backs away (a great stretch goal, and what the "what sensors?" question is about).

## Challenge 2: build your own

The brief is one sentence: **find a problem, and build a robot to solve it** — autonomous or driver-controlled, your choice. Same constraints (kit only, fits the cubby); everything else, including what counts as **success**, is yours. Pick a problem that's **real but small enough to build**:

- a **sorting/delivery bot** that moves an object, or pushes objects into the right bin;
- a **cleanup bot** that plows scattered objects into a corner;
- a **maze or line follower** that navigates with sensors;
- a **guard bot** that watches a doorway and reacts when the Distance Sensor sees something approach;
- a **drawing/stamping bot**, or a **fetch bot** that grabs and returns an object.

Write *what the robot must do* and *how you'll know it worked* before you build — that's your design statement and your finish line.

## Your toolkit: the design process & the decision matrix

Both challenges run on the **engineering design process**: **define** the problem and constraints, **research and sketch** ideas, **choose** the best, **build**, **test**, **improve**. It's a loop — testing sends you back.

For the **choose** step, use a **decision matrix**: list **criteria** down the side, **ideas** across the top, score each idea 1–4 (4 = best), and total the columns. Highest total wins — now your choice is based on *reasons*, not on who argued loudest. Example for sumo:

| Criteria | A: wedge bot | B: fast pusher | C: heavy box |
|---|---|---|---|
| Pushing power (torque) | 4 | 2 | 3 |
| Stays in the ring (low & wide) | 3 | 2 | 4 |
| Easy to build from the kit | 4 | 3 | 2 |
| Fits the cubby | 4 | 4 | 3 |
| **Total** | **15** | **11** | **12** |

Idea A wins — by the criteria the team agreed on, not by anyone's favorite.

**Build constraints (still in force).** (1) Kit only — bundled motors, controller, and sensors are fair game; the competition team's V5 parts are off-limits. (2) Fits one **IKEA Kallax cubby** (33 × 33 cm / 13 × 13 in opening, ~38 cm / 15 in deep). (3) For sumo: a **30 cm (12 in) square footprint** (which also fits the cubby), **well under ~2.3 kg (5 lb)**, no part built to damage the other robot or the ring, no signal interference.

**Sumo build tips:** gear down for torque; go low and wide with the heavy parts down low over the drive wheels; add a **wedge**; build a little and test a lot (push against a wall to feel your traction).

**Competition safety:** robots collide and move fast — keep hands, hair, faces, and cables clear of the ring while robots run, and watch from outside. The inspection is a real safety check. Only the driver stays near the field. Unplug the USB-C cable before competing; power the Brain down with the **X button** and store the robot in its cubby when done.

## The project: compete, then create

Work the full design process on one or both challenges in a team of two or three with shared, rotating jobs (build / wiring / code), document as you go (sketches, decision matrix, pseudocode, daily journal), and **present** your robot and process to the class like an engineering team presenting to a client.

## What you'll need

- Computer with VS Code + the VEX extension, and a USB-C cable
- PLTW Gateway EXP kit: Brain, charged battery, controller, motors, and any sensors your design uses
- Engineering notebook for sketches, the decision matrix, pseudocode, and a daily journal
- The project worksheet (design brief, decision matrix, build & code plan, journal, reflection)
- For Build Your Own: any extra materials your robot needs (your team brings these)

## Do it

1. **Define the problem** — a short design brief and every constraint. Sumo's are given; for Build Your Own *you* write the problem and how you'll know it worked.
2. **Sketch and choose** — each teammate sketches a couple of ideas, then build a **decision matrix** and pick the winner by reasons.
3. **Build it** — from the kit, fitting the cubby (and, for sumo, the footprint); sturdy; mount and wire motors and sensors.
4. **Plan, then code** — autonomous or driver control; pseudocode first, then C++ (a `while (true)` loop with sensor `if`s from Ch11 or stick/button driving from Ch13).
5. **Test and refine** — one thing per round: more torque if it gets pushed, a wider stance if it tips, a flipped motor if a side runs backward.
6. **Evaluate and present** — keep the journal, judge how well the robot met its goal, and present to the class.

## Check your understanding

1. In robot sumo, how do you **win** a match, and what makes a robot **out** of the ring?
2. A teammate says "we just need the fastest robot." Why is that wrong? Explain where pushing power comes from, using the word **torque**.
3. Name **two** things that make a robot hard to push out of the ring, and connect each to something earlier in the course.
4. What is a **decision matrix**, and why is it better than picking the idea you like best?
5. If your robot ran **fully autonomously**, what **sensor(s)** would it need and what would each do? (Finding the opponent *and* staying in the ring.)
6. Suggest one idea for a future robotics competition (no destroying robots).

## Key terms

robot sumo · Honbasho · ring · out of bounds · double elimination · inspection · torque · traction · center of gravity · wheelbase · gear down · wedge · autonomous · driver control · Distance Sensor · engineering design process · criteria · constraints · decision matrix · prototype · iteration

## Sources

PLTW Gateway *Automation & Robotics*, Project 4.2 "Honbasho: Sumo Competition" and Project 4.3 "Build Your Own": a rules-based robot-sumo tournament and an open-ended "design a robot to solve a problem you choose" build, each run through the full engineering design process (design brief, decision matrix, prototype, journal, conclusion questions) — modernized from legacy Cortex/ROBOTC to **VEX C++ in VS Code** on the EXP Brain. Sumo rules are simplified from the official Japanese robot-sumo rules referenced by PLTW. Constraints are adapted to this course's kit-only and IKEA Kallax cubby framing; the 30 cm (12 in) footprint and ~2.3 kg (5 lb) limits follow PLTW's sumo requirements. The autonomous example reuses the verified EXP Distance Sensor API from Ch11 (`distance` device, `objectDistance(mm)`); tank drive and buttons are from Ch13; torque/traction/stable-base from Chapters 3, 4, and 7.
