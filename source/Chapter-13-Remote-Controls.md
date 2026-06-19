# Chapter 13 · Remote Controls (Driver Control)

**Unit 4 · Control & competition · Project 4.1**

**What you'll learn:** how to **drive your robot by hand** with the VEX controller. Chapter 11 was *autonomous* — sensors decided, no driver. This is the other half: **driver control** (teleoperation), where a human is the decision-maker, moving the robot in real time with the controller's **joysticks** and **buttons**. You'll read a joystick as a number, send it straight to the motors so one stick steers each side (**tank drive**), ignore the center wobble with a **dead zone**, and run a mechanism with a **button**. Then you'll build and drive a **remote-controlled robot**.

## Driver control: now you're the loop

A competition robot runs **autonomously** for part of a match (the Ch11 program reads sensors, decides with `if`, drives motors, by itself) and under **driver control** for the rest (a person drives it with a controller). Driver control is the *same* `while (true)` loop as automation — **sense → decide → act** — but **you** are the "decide": the program reads the **controller** instead of a sensor, and your thumbs choose the action. Your eyes watch and your hands react, so you close the loop.

*(Diagram: YOU THE DRIVER → READ the controller → MOVE the motors, with an orange `while (true)` loop back to YOU. "In driver control YOU close the loop — your eyes are the sensor.")*

## Meet the controller

The VEX controller has two **joysticks** and a set of **buttons**. But before it can drive anything, two quick setup steps.

**First: charge it and pair it.**
- **Charge it.** The controller has its own battery; charge it through its USB port until the charge light reads full. Charge the **Brain's** battery too — a low battery is a common reason a robot turns sluggish or quits mid-run.
- **Pair it to the Brain.** The EXP controller talks to the Brain **wirelessly**. Turn on the Brain (Check button) and the controller (its Power button), then on the **Brain's screen** go to **Settings → Link** and follow the prompt. When they connect, the Brain's light and the controller's **Power/Link** light both blink **green** — and they stay paired through a power cycle, so you only do this once.

Once it's paired, name the controller once in your code, like a motor:

```cpp
controller Controller = controller();        // the EXP controller
motor leftMotor  = motor(PORT1);             // left side of the drive
motor rightMotor = motor(PORT6, true);       // right side (reversed — mirror-mounted)
motor armMotor   = motor(PORT3);             // the lift / claw mechanism
```

Those two drive motors are the same `leftMotor` / `rightMotor` from Chapter 6. Each **joystick moves on two axes** (up/down and left/right), reported as `Axis1`–`Axis4`. On the EXP controller: **left stick = `Axis3` (up/down), `Axis4` (left/right); right stick = `Axis2` (up/down), `Axis1` (left/right)**. Front buttons: **Up/Down** (left) and **A/B** (right); shoulder buttons **L1/L2** and **R1/R2**. (The EXP controller has no Left/Right arrows and no X/Y — those are V5.)

*(Diagram: a labeled EXP controller schematic — both sticks with their axes, the front and shoulder buttons.)*

## Driving: a stick for each side

`Axis.position()` returns a **whole number from −100 to 100** — full up = `100`, full down = `−100`, centered = `0`. That's a percent, exactly what `setVelocity` wants, so feed a stick straight to a motor:

```cpp
int main() {
    vexcodeInit();

    while (true) {      // the driver-control loop
        // each stick runs one side (Axis3 = left, Axis2 = right):
        leftMotor.setVelocity(Controller.Axis3.position(), percent);
        rightMotor.setVelocity(Controller.Axis2.position(), percent);
        leftMotor.spin(forward);
        rightMotor.spin(forward);
        wait(20, msec); // pause, then read again
    }
}
```

This is **tank drive**: each stick runs one side (like a tank or bulldozer). Both sticks up = straight forward; both down = reverse; one up, one down = spin in place. You never code "reverse" — pulling a stick down makes `position()` negative, and a negative velocity with `spin(forward)` runs the motor backward. One stick = full speed both ways. The speed isn't a fixed number; it's read **fresh** every loop, which is what makes driving feel live.

**The dead zone.** Real sticks rest at a tiny non-zero value, so the robot creeps when untouched. Ignore readings near center:

```cpp
int p = Controller.Axis3.position();        // read the left stick once
if (p > 5 || p < -5) {                       // outside the dead zone?
    leftMotor.setVelocity(p, percent);
    leftMotor.spin(forward);
} else {
    leftMotor.stop();                        // tiny wobble -> hold still
}
```

Read into a variable `p`, then drive only if it's past ±5; otherwise hold still. Widen to 10 if it still twitches.

## Buttons: run a mechanism

A lift or claw just goes up/down — use **buttons**. Ask `.pressing()` → `true` (held) or `false` (not). Two buttons run a mechanism both ways:

```cpp
if (Controller.ButtonR1.pressing()) {        // R1 held  -> raise
    armMotor.spin(forward);
} else if (Controller.ButtonR2.pressing()) { // R2 held  -> lower
    armMotor.spin(reverse);
} else {
    armMotor.stop();                         // nothing held -> hold position
}
```

Same `if` / `else if` / `else` as Ch11 — the condition is now *is the driver pressing this button?* The final `else` is what stops the arm when you let go.

## Put it together: the driver-control loop

One `while (true)` loop — read the sticks, drive the wheels, check the buttons, run the arm, short `wait`, repeat:

```cpp
int main() {
    vexcodeInit();

    while (true) {
        // --- drive: each stick runs one side ---
        leftMotor.setVelocity(Controller.Axis3.position(), percent);
        rightMotor.setVelocity(Controller.Axis2.position(), percent);
        leftMotor.spin(forward);
        rightMotor.spin(forward);

        // --- arm: R1 raises, R2 lowers ---
        if (Controller.ButtonR1.pressing()) {
            armMotor.spin(forward);
        } else if (Controller.ButtonR2.pressing()) {
            armMotor.spin(reverse);
        } else {
            armMotor.stop();
        }

        wait(20, msec);
    }
}
```

That's teleop: a forever loop that keeps reading the controller and moving the robot to match. Add a dead zone, swap buttons, or point the arm code at a second motor to drive anything you build.

## Build constraints (still in force)

- Build from the **PLTW Gateway kit** only (bundled motors/controller fair game; the competition team's V5 parts off-limits).
- The robot must fit one **IKEA Kallax cubby** — a 33 × 33 cm (13 × 13 in) opening, ~38 cm (15 in) deep. The 33 × 33 face is the limit.

**Keep your wiring tidy.** A driving robot with a moving arm is where a loose cable gets snagged or yanked out mid-run. Three habits: seat every cable fully (feel the Smart Cable click); route wires along the structure, away from joints, gears, and wheels; and secure the slack with a twist tie. A popped cable looks exactly like a code bug — tidy wiring saves you from chasing the wrong one.

## Also on the V5 competition team?

This is the **driver-control period** of a match. On V5 you wrap this code in a `drivercontrol` function registered with the `competition` object, and the field switches the robot between autonomous (Ch11) and driver control. The controller code is identical — same `Axis3.position()`, same `ButtonR1.pressing()` — the V5 controller just adds a few buttons (Left/Right, X, Y) the EXP lacks (V5 Controller API: api.vex.com/v5).

## Safety

- A driven robot moves the instant you touch a stick — give it room; keep hands, hair, cables clear of wheels/arms/gears.
- **Unplug** the USB-C cable before driving; drive on the floor or a clear table.
- Drive at a speed you can control — start slow, ready to drop the sticks to stop.
- Power down with the **X button**; store the robot in its cubby.

## The project: build a robot you can drive

Design, build, and program a **remote-controlled robot** — a drive base you steer with the sticks, plus a mechanism you run with buttons. Classic: a **forklift** (tank-drive wheels + a button-raised fork to lift and stack). Or propose your own:

- **Forklift** — drive to a block, raise the fork (R1), carry it, lower it (R2) to stack.
- **Claw bot** — drive around; open/close a gripper with two buttons.
- **Plow / pusher** — a fast, sturdy base that shoves objects into a goal.
- **Arm bot** — a driveable base with a swinging arm that knocks down or sorts targets.

Work as a team with shared, rotating jobs (build / wiring / code). Use the **design process**: understand the task and constraints, sketch, pick the best, build, test, improve. And keep the big question in mind: a driver makes the robot flexible, but a human must be there — when would you rather it ran itself?

## What you'll need

- Computer with VS Code + the VEX extension, and a USB-C cable
- PLTW Gateway EXP kit: Brain, charged battery, the **controller**, two drive motors, and a mechanism motor
- Engineering notebook for sketches, pseudocode, and a daily journal
- The project worksheet (design brief, controls map, reflection)

## Do it

1. **Define the problem** — design brief: what the robot must do, and every constraint (EXP kit only, fits the cubby, which mechanism).
2. **Sketch and choose** — each teammate sketches; compare against criteria; pick the best.
3. **Build the robot** — a sturdy tank-drive base + your mechanism, fitting the cubby; mount and wire both drive motors and the mechanism motor.
4. **Map your controls, then code** — write which stick drives which side and which button does what, then translate to C++ (name devices, `while (true)` loop, drive with sticks, add the button `if`/`else if`/`else`).
5. **Test and refine** — download, unplug, drive; fix one thing at a time (add/widen the dead zone, flip a motor if a side runs backward).
6. **Evaluate** — judge how it drives, and answer: which was harder, driving or automating, and which jobs would you hand back to the robot?

## Check your understanding

1. What is driver control (teleoperation), and how is it different from the autonomous program from Chapter 11?
2. What does `Controller.Axis3.position()` give you? What comes back when the stick is full up, full down, and centered?
3. Explain tank drive: which axis runs the left side, which the right, and how does the robot turn?
4. What is a dead zone, and why does driver control need one?
5. What does `.pressing()` return? Write the `if`/`else if`/`else` that raises a fork while R1 is held, lowers it while R2 is held, and holds otherwise.
6. Give one task you'd rather drive by hand and one you'd rather automate, and say why.
7. Your controller won't drive the robot. How do you **pair** an EXP controller to the Brain, how can you tell they're connected, and what's one battery-related reason a robot goes sluggish mid-run?

## Key terms

driver control · teleoperation · autonomous · controller · pair · Link · charge · joystick · axis · Axis1–Axis4 · position() · tank drive · arcade drive · dead zone · button · pressing() · ButtonR1 · setVelocity · spin · control loop · while (true) · human-in-the-loop

## Sources

PLTW Gateway *Automation & Robotics*, Project 4.1 "Remote Controls": build and program a remote-controlled robot (a forklift or similar) driven with joysticks and buttons, with conclusion questions on driver control vs. autonomous and what you would automate — modernized from legacy Cortex/ROBOTC to **VEX C++ in VS Code** on the EXP Brain. The Controller API is verified against the VEX Library: the `controller` object, the four axes and `position()` (a whole number, −100 to 100), and the buttons' `pressing()` (true/false) — a negative axis value with `spin(forward)` runs a motor in reverse. Tank drive maps the left stick (`Axis3`) to `leftMotor` and the right stick (`Axis2`) to `rightMotor`. The `if`/`else if`/`else` and `while (true)` loop are standard C++ from Chapter 11; the motor commands and `leftMotor`/`rightMotor` setup from Chapter 6.
