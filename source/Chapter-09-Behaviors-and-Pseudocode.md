# Chapter 9 · Behaviors & Pseudocode

**Unit 3 · Programming & automation · Activity 3.2**

**What you'll learn:** how to turn a goal into instructions a robot can follow. You'll meet **behaviors** — the things a robot does — and the most useful skill in programming: **breaking a complex behavior down** into simple ones, and those into basic single commands. Then you'll write **pseudocode**: a plain-language plan, in order, before exact syntax. You'll see a few lines of that plan become real **VEX C++** (including what curly braces `{ }` are for), and how the "sense, decide, act" loop from Chapter 8 appears the moment you write an `if` or a `while`. You write real code on the robot starting in Chapter 10.

## From building robots to telling them what to do

For two units you built robot *bodies*. A body that can't be told what to do is just a sculpture. Unit 3 makes the robot **act** — and acting starts with a plan, not the keyboard.

The split in every challenge: **you, the programmer**, work out exactly what the robot should do and write it down. **The robot** carries out your instructions exactly, in order, with no common sense to fill gaps. If your plan is wrong, the robot does the wrong thing perfectly. The thinking *before* you code is where challenges are won.

## Behaviors: anything your robot does

A **behavior** is anything the robot does — from turning on one motor to solving a maze. Three sizes:

- **Basic behaviors** — single commands, the smallest things the robot understands directly ("spin motor 1 forward," "stop the motors"). ~one line of code each.
- **Simple behaviors** — small useful tasks made of a few basic ones ("drive forward for two seconds," "turn right"). The sweet spot.
- **Complex behaviors** — big jobs ("drive through the maze," "sort parts by color"). They look complicated but have one helpful property.

## The big idea: break it down

That property: **a complex behavior can always be broken into simpler behaviors, and those into basic ones.** Keep splitting until every piece is something you know how to write. This is **decomposition** — the most important skill in the unit.

*(Central diagram: a tree. COMPLEX "Solve the maze" → SIMPLE "drive to the wall ahead / turn toward the open path / repeat until the exit" → the first simple behavior breaks into BASIC "spin both motors forward / watch the distance sensor / stop near the wall." In that exact order, the basic steps are your pseudocode.)*

Read it top-down: "solve the maze" → simple behaviors → split one ("drive to the wall ahead") into basic commands (spin motors forward, watch the distance sensor, stop near the wall) — now every line is directly doable. Each simple behavior breaks down the same way. You already do this with "brush my teeth" (wet brush, add toothpaste, scrub top, scrub bottom, rinse, put away). Decomposition is doing it **on purpose**, for a robot.

## The other direction: building up

Decomposition runs one way — big into smaller pieces. Its partner runs the *other* way: take a handful of small steps, give them **one name**, and from then on think and work with that single name instead of the steps inside it. That move is **abstraction**, and you've been using it all along.

"Brush my teeth" is the proof. It stands for a dozen small steps, but when you plan your morning you don't list all twelve — you say "brush my teeth" and move on. The name **hides the details** so you can think in bigger steps. Decomposition pries the name open; abstraction is what let you use the name in the first place.

The two are partners: break a job **down** until each piece is doable, then wrap the useful pieces back **up** under names so the big plan stays short. You'll meet abstraction twice more in code — a **function** is a name for a group of steps (Chapter 12), and an **object** like a smart drivetrain is a name for a bundle of parts *and* the things you can tell it to do (Chapter 13). Same idea every time: bundle the small stuff under one trustworthy name.

Read the decomposition tree both ways: top-down is decomposition (split into smaller behaviors); bottom-up is abstraction (a few basic commands become one named behavior, and a few of those become one bigger name). A programmer moves both directions — down to work out the steps, up to name them so the plan stays simple.

## You and the robot have different jobs

The robot follows your plan **literally**, so the plan must be **complete and in order**. Leave out "stop the motors" and it drives into the wall and keeps pushing; swap two steps and it turns before it moves. The robot won't fix it — that's your job, and the cheapest place to catch gaps is a plain-language plan before any code.

## Pseudocode: the plan before the code

**Pseudocode** ("fake code") is a shorthand mixing a little programming structure with plain English. Rules:

- Write the **behavior/outcome** of each step, not perfect syntax.
- List steps in the **same order** they'll run.
- Keep it **reasonable** — close enough that translating to code is mechanical.

It lets you find logic mistakes **on paper** (cheap) instead of on the robot (slow), and it's portable — the same plan fits almost any language.

## From plan to C++

The "drive to the wall" behavior as pseudocode (curly braces `{ }` mark a block):

```
/*
  behavior: drive to the wall ahead, then stop
  {
      spin both drive motors forward
      while the distance sensor reads more than 200 mm
      {
          keep rolling (just wait a moment, then check again)
      }
      stop both drive motors
  }
*/
```

The same plan as real **VEX C++** (what you'll write in VS Code) — it lines up nearly line-for-line, and the braces now do their real job (grouping the statements that belong to the `while` loop):

```cpp
// behavior: drive to the wall ahead, then stop
leftMotor.spin(forward);
rightMotor.spin(forward);

while (distance.objectDistance(mm) > 200) {
    wait(20, msec);
}

leftMotor.stop();
rightMotor.stop();
```

You don't need every symbol yet (that's Chapter 10). The point: a good plan makes the code almost write itself, and the structure you planned *is* the structure of the code.

**You've seen this loop:** read the sensor → decide (is it > 200 mm?) → act (roll or stop). That's the **sense → compare → adjust** feedback loop from Chapter 8. Every `if`/`while` is a feedback loop in disguise.

## Also on the V5 competition team?

Behaviors and pseudocode work in any language and on any platform, and a V5 programmer writes the same **VEX C++ in VS Code**. The only difference is the hardware (a 21-port V5 Brain vs. your 10-port EXP Brain). The plan transfers 1:1.

## Putting it together

Don't type the whole plan and hope. Add one behavior, send it to the robot, test it, then add the next. A program grown one tested piece at a time is far easier to fix.

## What you'll need

- Engineering notebook and a pencil
- The behavior-and-pseudocode worksheet
- (Optional) your Chapter 8 robot, to picture the behaviors
- No computer or code yet — this chapter is planning

## Do it

1. **Break down the maze** — take one complex behavior to simple, then one simple to basic single commands.
2. **Decompose the challenge task** — "when a pushbutton is pressed, the robot drives as fast as possible for 20 feet (~10 s), then stops": fill a three-column chart (complex / simple / basic).
3. **Write the pseudocode** — basic behaviors, in order, in the `/* { } */` template; mark blocks with curly braces.
4. **Decompose an everyday behavior** — five+ smaller behaviors inside "brushing my teeth."
5. **Test your plan on a human** — a partner follows your pseudocode *literally*; if they end up somewhere unintended, fix the gap.

## Check your understanding

1. List at least five smaller behaviors inside "brushing my teeth."
2. Why is it useful to think of a program as basic, simple, and complex behaviors?
3. What does a pair of curly braces `{ }` mark in a C++ program?
4. What is the role of a programmer, and how does it differ from the robot's role?
5. Write this as pseudocode: "drive forward until the distance sensor reads less than 150 mm, then stop." Which part is the sensing, the deciding, and the acting?
6. Decomposition breaks a behavior down. What is abstraction, and how is "brush my teeth" an example of it?

## Key terms

behavior · basic behavior · simple behavior · complex behavior · decomposition · abstraction · building up · breaking down · program · programmer · pseudocode · syntax · code block · curly braces · sequence · VEX C++ · VEXcode · if · while

## Sources

PLTW Gateway *Automation & Robotics*, Activity 3.2 "Robot Behaviors and Writing Pseudocode": the three behavior types, decomposition, programmer-and-robot roles, and pseudocode as informal in-order planning — modernized from ROBOTC to **VEX C++ in VS Code**. The C++ commands (`spin(forward)`, `stop()`, `wait`, distance `objectDistance` in mm) are verified against the VEXcode EXP C++ API (api.vex.com) and the VEX Library Distance Sensor article. The "sense → decide → act" loop carries over from Chapter 8.
