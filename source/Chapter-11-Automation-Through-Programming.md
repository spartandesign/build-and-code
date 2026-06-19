# Chapter 11 · Automation Through Programming

**Unit 3 · Programming & automation · Project 3.4**

**What you'll learn:** how to make a robot run **on its own**. You'll add the two pieces that turn a machine into an *automatic* one: **reading a sensor** for input, and using **if / else** to decide from what it reads. Wrap that in a **while loop** and the robot senses, decides, and acts — over and over, with no driver. That's the **sense → decide → act** feedback loop from Chapter 8, written in code. Then you'll design, build, and program a real automated device — a gate, a sign, an elevator — as a team.

## What makes a robot automatic

An **open-loop** machine runs blind (a microwave heats whether the food is hot or not) — your Chapter 10 programs were open-loop, a list of commands run once. A **closed-loop** machine *senses* and *adjusts* (a thermostat reads the temperature and switches the heat). That difference is **automation**. To make your robot closed-loop you need a cycle: **sense**, **decide**, **act**. You already have "act" (the Ch10 motor commands); this chapter adds the other two.

*(Central diagram: SENSE → DECIDE → ACT, with a blue `while (true)` loop back to SENSE. "This is the feedback loop from Chapter 8 — now written in code.")*

## Reading a sensor

A **sensor** is the robot's input. In Ch8 you watched a reading change on the Devices screen; now you read it *in code*. Name a sensor in your device list, then ask for its reading:

```cpp
motor driveMotor = motor(PORT1);
distance frontEye  = distance(PORT2);                 // Distance Sensor on Smart Port 2
bumper startButton = bumper(Brain.ThreeWirePort.A);   // Bumper Switch on 3-Wire port A
```

- **Distance Sensor:** `frontEye.objectDistance(mm)` returns how far the nearest object is, in millimeters (e.g., 340). Smart sensors use a numbered **Smart Port**.
- **Bumper Switch:** `startButton.pressing()` is `true` when pushed, `false` when not. Switches use a lettered **3-Wire port**.

A reading is just a **value your program can check** — a number or a yes/no.

## Making a decision: if / else

An `if` asks a true/false **condition** and runs one block if true, another (with `else`) if false:

```cpp
if (frontEye.objectDistance(mm) < 150) {   // is something closer than 150 mm?
    driveMotor.stop();                       // yes -> stop
} else {
    driveMotor.spin(forward);                // no  -> keep driving
}
```

The condition is in parentheses; it uses a comparison — `<`, `>`, `==` — or a yes/no reading like `startButton.pressing()`. For more than two cases, chain `else if`. Curly braces mark each block, like in your Ch9 pseudocode.

## Doing it forever: the while loop

An `if` checks once. A real automatic device checks **continuously**, so wrap it in `while (true)` ("repeat forever"):

```cpp
int main() {
    vexcodeInit();
    driveMotor.setVelocity(50, percent);

    while (true) {                                // keep checking, forever
        if (frontEye.objectDistance(mm) < 150) {  // something is close
            driveMotor.stop();                    //   -> stop
        } else {                                  // path is clear
            driveMotor.spin(forward);             //   -> keep driving
        }
        wait(20, msec);                           // small pause, then check again
    }
}
```

Read it as the diagram: sense (read frontEye), decide (the if), act (stop/spin), loop back. Always put `wait(20, msec)` at the end of a `while (true)` loop. Swap the sensor and you get a different machine: `if (startButton.pressing())` builds a sign that spins only while a button is held.

**"true" forever, on purpose:** an automatic machine should keep sensing and responding the whole time it's on. Keep the `wait(20, msec)`, and make sure something *inside* the loop can change.

## Going further: a sensor that reports an angle

The bumper gives a yes/no, and the Distance Sensor gives millimeters to an object. But to know *how far a shaft has turned* — a robot arm, a dial, a steering column — you need a different sensor and one new tool: a place to **store a value**.

**Storing a value: variables.** A **variable** is a named box that holds a value you can read, use in math, and change later. Give it a **type** and a name:

```cpp
int count = 0;          // a whole number
double home = 0;        // a number with decimals
bool running = false;   // true or false
```

Update it (`count = count + 1;`) or read it inside an `if`. Variables let you **save a sensor reading and reuse it**, keep a running total, or remember something between loop passes. (The `bool running` latch in Pattern D is a variable.)

**A sensor that measures rotation: the Potentiometer.** The **Potentiometer V2** measures the angle of the shaft it's mounted on, 0 to about **330°**. It plugs into a lettered **3-Wire port** like the bumper, and you read it as a decimal angle:

```cpp
// in the device list, above main:
potV2 armPot = potV2(Brain.ThreeWirePort.A);

// later, read the angle into a double:
double raw = armPot.angle(degrees);  // 0 to ~330
```

Unlike the bumper (pressed or not) or the Distance Sensor (mm to an object), it reports a **rotation** — perfect for an arm or dial. It even keeps its reading after the Brain restarts, because the value follows the shaft's physical position.

**Where's zero? Calibration.** The potentiometer's zero is wherever it was **mounted** — the sensor even has slots to nudge it up to 90° by hand. So a raw reading of 145° doesn't mean "the arm is 145° above level"; it means "145° from the sensor's own internal zero," which is arbitrary. To make it mean something, **calibrate**: at startup, hold the arm at a known **home** position, read the potentiometer, and store it in a variable — the **baseline**. Then `raw − baseline` is the arm's angle *from home*. Same idea as the inertial's calibrate step in Chapter 13 (find your zero at startup), but here you do it yourself, with a variable.

*(Diagram: an arm pivoting on a potentiometer; dashed home line = baseline; the angle from home = raw − baseline.)*

**Repeat a set number of times: the for loop.** One analog reading jitters, so for a steady baseline you **average** several. That needs a loop that runs a **fixed number of times** — a `for` loop. It starts a counter, runs while it's below a limit, and steps it each pass:

```cpp
double sum = 0;
for (int i = 0; i < 20; i = i + 1) {
    sum = sum + armPot.angle(degrees);
    wait(5, msec);
}
double home = sum / 20;          // the baseline
```

(`i = i + 1` adds one each pass; also written `i++`.) Now you know **two kinds of loop**: `while (true)` repeats *forever* (keep reacting); a `for` loop repeats a *set number of times*, then moves on.

**Putting it together.** Calibrate once at the top of `main()`, then read the calibrated angle in your `while (true)` loop and act:

```cpp
int main() {
    vexcodeInit();

    // calibrate: average 20 readings at home
    double sum = 0;
    for (int i = 0; i < 20; i = i + 1) {
        sum = sum + armPot.angle(degrees);
        wait(5, msec);
    }
    double home = sum / 20;

    armMotor.setStopping(hold);
    while (true) {
        double angle = armPot.angle(degrees) - home;
        if (angle < 90) {     // not high enough yet
            armMotor.spin(forward);
        } else {
            armMotor.stop();
        }
        wait(20, msec);
    }
}
```

It senses an angle, compares it to a calibrated target, and acts — the Chapter 8 loop, now with a sensor that reports *how much*, not just *whether*. Classic challenge: hold the arm at three different heights, one per controller button. Always subtract your baseline before trusting a potentiometer number, and re-calibrate whenever you remount the sensor.

## Build constraints (still in force)

- Build from the **PLTW Gateway kit** only (its bundled motor/sensors are fair game; the competition team's V5 parts are off-limits).
- The device must fit one **IKEA Kallax cubby** — a 33 × 33 cm (13 × 13 in) opening, ~38 cm (15 in) deep. The 33 × 33 face is the limit.

## Also on the V5 competition team?

This *is* competition programming. A V5 **autonomous routine** is exactly this loop: read sensors, decide with if/while, drive motors — same C++, same structure, just more sensors and a 21-port Brain (V5 C++ API: api.vex.com/v5).

## Safety

- An automatic robot moves on its own, sometimes unexpectedly — keep hands clear of gates/arms/gears, be ready to power down.
- Secure the device so a moving part can't pinch or knock things off the bench.
- Run a driving program only after **unplugging** the USB-C cable.
- Power down with the **X button**; store the device in its cubby.

## The project: build something automatic

Design, build, and program a working automatic device that senses and responds with no driver. Pick a challenge (or propose your own):

- **Toll-booth / parking gate** — raises when a car pulls up (Distance), lowers when it leaves.
- **Automatic door** — opens when someone approaches, closes when clear.
- **"Stay on course" vehicle** — drives forward but stops before hitting an obstacle.
- **Spinning sign with a stop switch** — spins while a button is held (Bumper).
- **Freight elevator** — rises and stops when it reaches a switch.
- **No-touch switch** — turns a mechanism on when you wave a hand at the sensor.

Work as a small team with shared jobs (build / wiring / code) and rotate. Use the **design process**: understand the problem and constraints, sketch ideas, pick the best, build, test, improve.

## What you'll need

- Computer with VS Code + the VEX extension, and a USB-C cable
- PLTW Gateway EXP kit: Brain, charged battery, a motor, and a sensor (Distance, Bumper, or Optical)
- Engineering notebook for sketches, pseudocode, and a daily journal
- The project worksheet (design brief, decision matrix, reflection)

## Do it

1. **Define the problem** — write a short design brief: what it must do, and every constraint (EXP kit only, fits the cubby, which sensor).
2. **Sketch and choose** — each teammate sketches; compare in a decision matrix; pick the best.
3. **Build the mechanism** — construct from the kit to fit the cubby; mount and wire the motor and sensor.
4. **Plan, then code** — write pseudocode for the sense → decide → act loop, then translate to C++ (name devices, set up `while (true)`, fill in the `if`/`else`).
5. **Test and refine** — download, watch, fix one thing at a time; tune the distance threshold or speed.
6. **Evaluate** — judge how well it works, and answer: which sensors, and open or closed loop?

## Check your understanding

1. Open-loop vs. closed-loop: what's the difference, and which is "automatic"? Why?
2. What does a sensor give your program? Give the reading from a Distance Sensor and from a Bumper Switch.
3. What does if / else do? What is the "condition," and where does it go?
4. Why does an automatic device need a `while (true)` loop instead of a single `if`?
5. A Potentiometer V2 on an arm reads 160 at the arm's home position. Why can't you just call that "160°," what do you store in a **variable** to fix it, and how do you then get the angle *from home*?
6. When would you use a `for` loop instead of `while (true)`? Give one example from this chapter.
5. Write the sense–decide–act idea as pseudocode for: "a night-light motor turns a lamp on when the room is dark." Name the sensor reading, the decision, the action.
6. For your project: which sensor did you choose, and what condition makes it respond correctly?

## Key terms

automation · open loop · closed loop · sensor · input · Distance Sensor · Bumper Switch · objectDistance · pressing() · condition · if · else · else if · comparison · variable · int · double · Potentiometer V2 · angle() · calibration · baseline · for loop · while loop · while (true) · 3-Wire port · Smart Port · design process · decision matrix

## Sources

PLTW Gateway *Automation & Robotics*, Project 3.4 "Automation Through Programming": design, build, and program an automatic device (toll booth, traffic signal, elevator, spinning sign, etc.) as a team via the design process, with conclusion questions on sensors used and open vs. closed loop — modernized from legacy Cortex/ROBOTC to **VEX C++ in VS Code** on the EXP Brain. Control structures (`if`/`else if`/`else`, `while (true)`) are standard C++. Sensor commands verified against the VEX Library: the Distance Sensor's `objectDistance(mm)` and the Bumper Switch's `pressing()` (a 3-Wire device on `Brain.ThreeWirePort`). The open/closed-loop framing and sense → decide → act loop carry over from Chapter 8; the motor commands from Chapter 10. The Potentiometer V2 (`potV2`, read with `angle(degrees)` over a 3-Wire port, 0 to ~330°) is verified against the VEX Library and VEXcode EXP C++ API; `int`/`double` variables and the `for` loop are standard C++; the calibrate-with-a-baseline pattern mirrors the inertial calibration in Chapter 13.
