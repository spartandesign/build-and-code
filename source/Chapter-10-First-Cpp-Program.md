# Chapter 10 · Your First C++ Program

**Unit 3 · Programming & automation · Activity 3.3 (modernized from "Using ROBOTC")**

**What you'll learn:** how to write real **C++**, send it to your robot, and watch it run. You'll set up **VS Code** with the **VEX extension**, create your first **EXP project**, learn the **anatomy of a program**, the commands that make a motor **spin, wait, and stop**, and the **download-and-run** workflow over USB-C. Then you'll turn your Chapter 9 pseudocode into real code — one tested piece at a time. This is where the robot starts listening to you.

## From a plan to a real program

In Chapter 9 you wrote **pseudocode** — a plain-language plan. A plan isn't something the robot can run. This chapter closes the gap: translate the plan into **C++** (the language your EXP robot speaks), type it into a real editor, and send it to the Brain. Same logic you already planned, now in a form the robot can carry out.

*(Central diagram: WRITE → DOWNLOAD → RUN, with an orange "test, fix, repeat" loop back to WRITE.)*

## The tool: VS Code and the VEX extension

You write code in **Visual Studio Code** with the free **VEX Robotics extension** added on. The extension teaches VS Code to build VEX programs and send them to the Brain.

- **It runs locally, not in the cloud** — your program travels down a real USB-C cable into the Brain.
- **You write in C++** — stricter than pseudocode (every semicolon and brace matters), but the same logic you already plan.

One-time setup: install the VEX extension, create a **new EXP project**, name it (the name shows on the Brain's screen). Code lives in the project's `src` folder.

## The anatomy of a program

A complete first program — spin one motor at half speed for 5 seconds, then stop:

```cpp
#include "vex.h"            // brings in all the VEX commands
using namespace vex;

motor leftMotor = motor(PORT1);   // name your motor + its Smart Port

int main() {
    vexcodeInit();                // sets up the robot — don't delete this

    leftMotor.setVelocity(50, percent);   // half speed
    leftMotor.spin(forward);              // start spinning
    wait(5, seconds);                     // keep going for 5 seconds
    leftMotor.stop();                     // stop
}
```

Every program has the same skeleton (a new project writes most of it for you):

- `#include "vex.h"` + `using namespace vex;` — **setup lines**: bring in all the VEX commands. Already there; leave them alone.
- `motor leftMotor = motor(PORT1);` — your **device list**: names a motor and its Smart Port. One line per device. (Your EXP motor is the fixed-speed Smart Motor from Ch3 — no gear cartridge to choose, unlike V5.)
- `int main() { … }` — the **main program**: the robot starts here and runs each line in order to the closing `}`. The curly braces are the same blocks you marked in pseudocode.
- `vexcodeInit();` — the **first line inside main**: gets the robot ready. Written for you; never delete it.
- Everything after that is **your behavior**.

Each command ends with a **semicolon** — "this instruction is finished," like a period. Forgetting one is the most common first mistake; the editor underlines it in red.

## Talking to a motor

Four commands do almost everything. Each starts with the motor's name, a dot, then what to do:

```cpp
leftMotor.setVelocity(50, percent);   // how fast: 0 to 100 percent
leftMotor.spin(forward);              // start spinning (forward or reverse)
wait(2, seconds);                     // pause the program here (also: msec)
leftMotor.stop();                     // stop the motor
```

- **Speed is a percent, 0–100.** 50 is half, 100 is full. (Older robots used 0–127; this is the modern scale.) A new motor starts at 50%.
- **Direction** is `forward` or `reverse`. For a motor mounted backwards, flag it once where you name it: `motor rightMotor = motor(PORT6, true);` — the `true` reverses it.
- **`wait` pauses the whole program** for `seconds` or `msec`. Whatever you started keeps going during the wait — that's why spin → wait(5, seconds) → stop runs the motor for 5 s.
- **`stop`** halts the motor. Leave it out and it keeps spinning — the classic Ch9 bug.

Shortcut: `leftMotor.spinFor(forward, 5, seconds);` does start-wait-stop in one line. Start with the three separate steps — they map onto your pseudocode.

## Wiring the Brain: ports and power

Your code names each device *and* the **port** it's plugged into (`motor leftMotor = motor(PORT1);`). For that to work, the motor really has to be in port 1. The EXP Brain has two kinds of port, plus one sensor built in:

- **10 Smart Ports**, **numbered** 1-10 along the top and bottom edges. Smart devices — the **Smart Motor**, **Distance Sensor**, **Optical Sensor** — plug in here with a **Smart Cable**, named by number in code: `motor(PORT1)`, `distance(PORT2)`.
- **8 3-Wire Ports**, **lettered** A-H. Simpler devices — the **Bumper Switch**, **Potentiometer V2** — plug in here, named by letter: `bumper(Brain.ThreeWirePort.A)`.
- The **Inertial Sensor** is **built into the Brain** — no port to plug it into, always available (Chapter 13).

*(Diagram: the EXP Brain's 10 numbered Smart Ports, 8 lettered 3-Wire ports A-H, and built-in Inertial; RULE: name each device in code to match the port it is plugged into.)*

Connecting: push a **Smart Cable** firmly into both the device and the Brain until it **clicks**; remove it with the **release tab**, not by pulling the wire. 3-Wire connectors are **keyed** and go in one way. **Match the code to the ports** — the most common reason a new program "does nothing" is the code naming one port while the device is in another. **Power:** a charged **battery** slides into the back; press the **Check button** to turn on, the **X button** to turn off. (The EXP battery and charger are their own — they don't swap with the V5 team's.)

## Getting it onto the robot

1. **Plug in.** Connect the Brain by **USB-C** and power it on.
2. **Download.** Click **Download** — the extension *builds* (checks the C++ is valid) then sends it to the Brain. Your project name shows on the Brain's screen.
3. **Run.** Press **Run** with the robot still on the bench. For a program that *drives*, download, unplug the cable, and start it from the Brain's screen.

If the build fails, read the first error: a missing semicolon, a missing `}`, or a misspelled motor name.

**It downloaded but nothing moves? Check in order:** (1) cable seated — re-push till it clicks; (2) right port — does the code's `PORT1` match where it's plugged? The Brain's **Devices** screen and the **VEX DEVICE INFO** panel in VS Code both show what the Brain detects; (3) powered and charged; (4) named in the device list; (5) motor whining but not turning = too much load (Chapter 3's stall).

## Build a little, test a lot

The orange loop in the diagram is the key habit: don't type the whole program and hope. Write one command, download, watch it run, then add the next. When a one-step-at-a-time program misbehaves, the culprit is the line you just added.

## Also on the V5 competition team?

Same tool, same commands. Two differences: a V5 program names its motors with a gear cartridge (e.g., `ratio18_1`) because V5 motors have swappable gears, while your EXP motor is fixed and needs none; and the V5 Brain has 21 Smart Ports to the EXP Brain's 10. Skills transfer straight across (V5 C++ API: api.vex.com/v5).

## Safety

- Make sure the robot **can't drive off the bench** before running — prop the wheels up or be ready to grab it.
- Keep fingers, hair, and loose clothing clear of the spinning motor shaft.
- Run a *driving* program only after **unplugging** the USB-C cable.
- Power down with the **X button** when done.

## What you'll need

- A computer with VS Code + the VEX extension
- A VEX EXP Brain and a charged EXP battery
- At least one EXP Smart Motor (or your robot)
- A USB-C cable
- Your Chapter 9 pseudocode and your notebook

## Do it

1. **Create a project** — new EXP project, name it; open the file in `src`.
2. **Name your motor** — add `motor leftMotor = motor(PORT1);` near the top.
3. **Type the first program** — inside `main`, after `vexcodeInit();`, set the speed, spin, wait 5 seconds, stop.
4. **Download and run** — plug in over USB-C, Download, Run; watch it spin 5 s and stop. Fix the first error if the build complains.
5. **Add a second motor** — name it on another port, reversed; spin both, run, stop. Test, then try one forward and one reverse.
6. **Make your plan real** — translate one Chapter 9 behavior into C++, one line at a time, testing as you go.

## Check your understanding

1. Name the parts of a VEX C++ program: what do the setup lines, the device list, `int main()`, and `vexcodeInit()` each do?
2. What does a semicolon mean at the end of a command, and what usually happens if you forget one?
3. Write the commands to spin a motor named `armMotor` at full speed for 3 seconds, then stop.
4. What does the Download button do — and why isn't writing code alone enough to move the robot?
5. Your code says `motor(PORT1)` but the motor is in port 3, and nothing happens when you run it. What's wrong, and what two things show which port the Brain actually detects the motor in?
6. You wrote `spin` and `wait(3, seconds)` but left out `stop`. What will the motor do, and why?
7. Why test one command at a time instead of typing the whole program first? Connect it to the test loop in the diagram.

## Key terms

C++ · VS Code · VEX extension · project · #include · device list · int main() · vexcodeInit() · command · semicolon · setVelocity · spin · wait · stop · percent · forward / reverse · build · download · run · Smart Port · 3-Wire port · Smart Cable · port · Check button · battery

## Sources

PLTW Gateway *Automation & Robotics*, Activity 3.3 "Using ROBOTC" / VEX testbed programming: the progression (run a motor at a set speed for a set time, then add a second motor and reverse, then add sensors) — modernized from legacy Cortex/ROBOTC to **VEX C++ in VS Code** on the EXP Brain. VEX Library (kb.vex.com): the toolchain workflow (install the VEX extension, create an EXP project, Build / Download / Run over USB-C). VEXcode EXP C++ API (api.vex.com): the program structure (`#include "vex.h"`, `using namespace vex;`, `int main()` with `vexcodeInit()`) and motor commands (`setVelocity` in percent, `spin`, `spinFor`, `wait`, `stop`; the `motor(PORT1)` declaration whose gearing defaults automatically). The fixed-speed EXP Smart Motor carries over from Chapter 3. The Brain's port layout (10 numbered Smart Ports, 8 lettered 3-Wire ports A-H, built-in Inertial), Smart Cable seating/release, and Check/X power are verified against the VEX Library (Connecting Devices to Smart Ports on the EXP Brain; Powering the EXP Brain On and Off) and EXP Brain documentation; the won't-respond checks draw on Troubleshooting VEX EXP Sensors and the VS Code DEVICE INFO panel.
