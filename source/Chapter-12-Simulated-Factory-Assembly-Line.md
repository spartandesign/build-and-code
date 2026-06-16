# Chapter 12 · Simulated Factory Assembly Line

**Unit 3 · Programming & automation · Project 3.5**

**What you'll learn:** how lots of automatic machines work **together** to build something — a real factory. The capstone of the unit, and it takes the whole class. Your team builds one **workcell**: an automated station that performs one process on a part. You'll learn the **cell cycle** (wait for the part, run your process, get ready), keep code tidy with a **function**, and then handle the hard part: **handing the part off** to the teams before and after you, so the whole line runs as one system.

## From one robot to a production line

In Ch11 you built a single automatic device. A real factory is **many** of those in sequence: a part enters one end, each station does one job and passes it along, a finished product exits. No single robot makes the whole thing — the product is the result of **cells cooperating**. This project: the **class is the factory.** Each team builds one **workcell** (one process), and all cells are joined into one **assembly line**.

*(Central diagram: PART IN → Workcell 1 (Stamp) → hand-off → Workcell 2 (Drill) → hand-off → Workcell 3 (Eject) → DONE. "Each cell is a Chapter 11 automatic behavior. The new challenge is making them work together.")*

## A workcell runs a cycle

Each cell does the same thing over and over: **wait** for a part, **run** its process, go back to waiting. That's the `while (true)` loop from Ch11, with the sensor as a "has the part arrived?" trigger:

```cpp
#include "vex.h"
using namespace vex;

motor stampArm      = motor(PORT1);
distance partSensor = distance(PORT2);

void runProcess() {           // our cell's job: stamp the part
    stampArm.spin(forward);   // press the stamp down
    wait(1, seconds);
    stampArm.spin(reverse);   // lift it back up
    wait(1, seconds);
    stampArm.stop();
}

int main() {
    vexcodeInit();
    stampArm.setVelocity(40, percent);

    while (true) {                                  // the workcell cycle
        if (partSensor.objectDistance(mm) < 80) {   // a part has arrived
            runProcess();                           // do our job
            wait(1, seconds);                       // let it move to the next cell
        }
        wait(20, msec);
    }
}
```

The loop is the cell's heartbeat: check the sensor, and when a part is close, run the process. The short `wait` after gives the part time to move on. Swap in your own process and sensor and you have *your* workcell.

## Name your process: functions

`runProcess();` in the loop is a **function** — a group of commands you've named. You *define* it once and *call* it by writing its name. Functions keep a program readable: tuck the stamping steps into `runProcess()` and the loop reads like plain English ("if a part arrived, run the process"). This is **decomposition** from Ch9 — a function is a name for one simple behavior made of basic steps. Define functions *above* `main`, give each a clear name (`lowerGate`, `sortPart`, `drillHole`), and main becomes a short, clear list of what your cell does.

## The hard part: making cells work together

The new challenge is **coordination**. Your cell sits between the cell before and after it, and the part must flow across those **hand-offs**. That works only if neighbors **agree on the interface**:

- **Where** does the part arrive and leave? Those spots must line up with your neighbors.
- **How** is the part sitting — orientation, height? Expect it flat and get it on its side and your process fails.
- **When** does each cell run? A part can't reach you until the previous cell finishes and releases it; timing chains down the line.

This is **systems integration** — Ch8's lesson one level up. There, a robot was a system of parts; here, the line is a system of *cells*, and a system is only as good as how its parts connect. One bad hand-off and the line stalls — so talk to neighbors early, agree on details, test the seams.

**Make it work alone, then make it fit:** first get your own cell reliable by itself, *then* work the hand-offs. Debugging a cell wired into a whole line is much harder than debugging it alone.

## Build constraints (still in force)

- Build from the **PLTW Gateway kit** only (competition V5 parts stay separate).
- Your cell must fit one **IKEA Kallax cubby** — 33 × 33 cm (13 × 13 in) opening, ~38 cm (15 in) deep — for storage and a consistent cell size when lining them up.

## Also on the V5 competition team?

This is how a winning alliance works: two robots share a field and coordinate (divide scoring, stay clear, time their moves) like cells handing off a part. And automating a real manufacturing process is one of the largest uses of robotics in the world. The systems thinking here — small reliable parts, clean interfaces, the whole greater than its pieces — is the heart of both.

## Safety

- A running line has **many moving cells at once** — keep hands, hair, sleeves clear of every mechanism.
- Agree on a way to **stop the whole line** fast if something jams; everyone should know it before the first run.
- Secure each cell so a moving part can't pinch/fling; run driving programs only after **unplugging** USB-C.
- Power down with the **X button**; store each cell in its cubby.

## The project: build the assembly line

As a class, produce one part by running it through a line of workcells. Your team designs, builds, and programs **one cell** (one process), then joins it to the line. Possible processes (assigned/chosen so the line makes sense): feed/convey; stamp/mark; drill/punch; sort/inspect (sensor sends it one way or another); gate/lift; eject/package. Work with the three roles — **mechanical** (build), **electrical** (wiring), **computer** (code) — and rotate. Use the design process, and coordinate with neighbors from the start.

## What you'll need

- Computer with VS Code + the VEX extension, and a USB-C cable
- PLTW Gateway EXP kit: Brain, charged battery, motor(s), and a sensor for your process
- The shared part the class is "manufacturing," and awareness of the cells before/after you
- Engineering notebook and the project worksheet (design brief, interface plan, journal, reflection)

## Do it

1. **Understand your cell — and its neighbors.** Learn your process; meet the teams before/after; agree on the hand-off (where the part arrives/leaves, how it sits).
2. **Sketch and build.** Sketch designs, pick one, build the cell from the kit to fit the cubby; mount and wire motor(s) and sensor.
3. **Plan, then code.** Pseudocode the cell cycle (wait → run → ready); write it in C++ with your process in a **function** called inside a `while (true)` loop.
4. **Test your cell alone.** Download and run until it does its job reliably every time; tune the sensor trigger and motor timing.
5. **Integrate.** Join to your neighbors; run a part across the hand-offs; fix position/orientation/timing.
6. **Run the line, then evaluate.** With the class, run a part end to end; reflect: what would improve your cell, and the team's biggest challenge?

## Check your understanding

1. What makes the assembly line a **system**? How is it like, and unlike, the single robot-as-a-system from Ch8?
2. Describe a workcell's cycle in three steps. Which Ch11 idea does it reuse?
3. What is a function, and why does putting your process in one make a program easier to read? Connect to decomposition (Ch9).
4. Why must neighboring teams agree on the hand-off? Give two specific things they must agree on.
5. Why get your cell working by itself before joining it to the line?
6. For your cell: what is its process, what sensor tells it a part has arrived, and what does it pass to the next cell?

## Key terms

assembly line · workcell · process · cell cycle · automation · sensor trigger · function · define / call · decomposition · hand-off · interface · coordination · systems integration · system · subsystem · while (true) · design process · mechanical / electrical / computer

## Sources

PLTW Gateway *Automation & Robotics*, Project 3.5 "Simulated Factory Assembly Line": a class-wide project where each team builds one automated workcell (one process), then cells are integrated into a working assembly line, coordinating hand-offs with neighbors, using the design process and three engineering roles — modernized from legacy Cortex/ROBOTC to **VEX C++ in VS Code** on the EXP Brain. The cell-cycle pattern (a sensor-triggered `while (true)` loop) builds on Ch11; user-defined `void` functions are standard C++, matching the VEXcode EXP C++ API function examples. Systems-integration framing carries from Ch8; sensors and motor commands from Ch10–11.
