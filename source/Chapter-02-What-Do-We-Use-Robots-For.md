# Chapter 2 — What Do We Use Robots For?
*Unit 1 · Robots in our world*

**What you'll learn:** what actually makes a machine a *robot*, the five parts every robotic system shares (and where each one lives on your EXP robot), how engineers describe a robot's reach and senses, and how to research one class of robot and teach it to the class.

---

## What counts as a robot?

A washing machine spins, a toaster heats, a drone flies — but which of them are *robots*? The most useful test is a loop: a robot **senses** its surroundings, **decides** what to do using a program, and **acts** on the physical world — then senses the result and goes around again. A toaster acts but never senses; it runs its timer whether or not your toast is on fire. A robot vacuum, on the other hand, detects a wall, decides to turn, drives a new direction, and checks again. That sense → decide → act loop is the heart of every robot you'll study — and every robot you'll build in this course.

Closely related is **automation**: making a process run with little or no human help. Not everything automated is a robot (a lawn-sprinkler timer is automation with no sensing), and not every robot is fully automatic — many are **teleoperated**, meaning a human drives them from a distance, the way surgeons guide a surgical robot or you'll drive your EXP robot with a controller in the Driver Control chapter. Between "human drives everything" and "robot decides everything" is a whole spectrum, and most real robots live somewhere in the middle.

---

## The three Ds: dirty, dangerous, and dull

Robots earned their place in the world by taking the jobs people *shouldn't* have to do. Engineers call them the **three Ds**:

- **Dirty** — work in places too contaminated or unpleasant for people. Some of the first robotic manipulators were built in the 1940s so workers could handle radioactive materials from behind shielding.
- **Dangerous** — bomb disposal, deep-sea and volcano exploration, search through collapsed buildings, and other places where sending a machine risks no one's life.
- **Dull** — repetitive work like welding the same seam or moving the same part thousands of times a day. The first industrial robot, installed on an auto assembly line in the early 1960s, did exactly this: it picked up an object and set it down in a new location, over and over, perfectly.

From those beginnings — and an explosion of robotic innovation in Japan in the 1970s — robots became permanent members of the industrial workforce: parts handling, welding, painting. Today the list is much longer: robots assist in surgery, vacuum floors and mow lawns, carry shelves around warehouses, deliver packages by air, and explore other planets where no human has yet stood. In this chapter your team picks *one* class of robot, digs into how it really works, and teaches the rest of the class about it.

---

## The five parts of a robotic system

Underneath the huge variety — a welding arm, a Mars rover, a robot vacuum — every robotic system has the same five main parts:

1. **Controller** — the robot's brain: a computer that runs the show and tells every other part what to do.
2. **Program** — the instructions the controller follows. Without a program, the controller is a brain with no thoughts.
3. **Manipulator** — the parts that provide movement, often resembling a human arm or torso: the joints, links, and the drivetrain or base they ride on.
4. **End effector** — the robot's "hand," mounted at the end of the manipulator: a gripper, a welding torch, a suction cup, a scalpel holder, a scoop.
5. **Power supply** — the energy source. Electric batteries are the most common, but industrial robots may run on *hydraulic* (pressurized fluid) or *pneumatic* (compressed air) power for heavy lifting.

Here's the payoff: **the robot on your desk has all five.** The **EXP Brain** is the controller; the **C++ program** you'll write in VS Code is the program; the chassis, motors, and arm you bolt together are the manipulator; the claw at the end is the end effector; and the **EXP Battery** that clicks into the Brain is the power supply. When you research a million-dollar industrial robot this week, you're looking at a scaled-up version of the machine you'll build this semester.

> **Watch the word "controller" — it means two different things.** In a *robotic system*, the controller is the robot's onboard brain. But in VEX, the **EXP Controller** is the handheld remote you drive with. On your robot, the robotic-system "controller" is the **EXP Brain**; the handheld Controller is just one way of sending it input. Keep the two straight and the vocabulary in this unit will never trip you.

> **📚 Learn more — VEX Library**
> - [Building with VEX EXP](https://kb.vex.com/hc/en-us/articles/15034994190228-Building-with-VEX-EXP) — tour the EXP Brain, Battery, and Controller and see how they connect
> - [Wirelessly Pairing an EXP Controller to an EXP Brain](https://kb.vex.com/hc/en-us/articles/4414780904468-Wirelessly-Pairing-an-EXP-Controller-to-an-EXP-Brain) — how the handheld Controller talks to the Brain

---

## Reach: degrees of freedom and the work envelope

Hold your arm out and count the ways it can move: your shoulder swings forward/back, side to side, and rotates; your elbow bends; your wrist tilts, waves, and twists. Each independent direction of movement is a **degree of freedom**, and your arm has seven — which is why you can reach the same doorknob from a dozen different angles.

Robot arms are described the same way. Each flexible joint adds a degree of freedom, and most industrial robot arms have at least six, enough to put their end effector in any position *and* any orientation within reach. More degrees of freedom means more flexibility — and a harder programming problem, since the program must coordinate every joint.

The space a robot's arm can actually reach is called its **work envelope** — an invisible bubble around the robot, with a size and shape set by the length of its links and its degrees of freedom. The work envelope matters for two big reasons: a part placed outside the envelope simply cannot be touched, and a *person* standing inside the envelope of a fast industrial arm is in danger, which is why factory robots often work inside cages or behind light curtains. When you research your robot, find its work envelope: where can it reach, and what's kept out of that space?

---

## Senses: how a robot knows what's around it

Remember the loop — sense, decide, act. The "sense" step comes from **sensors**, devices that turn something physical (touch, distance, light, rotation) into a signal the controller can read. The kinds you'll meet over and over, in research and in your own kit:

- **Touch** — a switch that closes on contact. Industrial robots use them as safety stops; your EXP kit's **Bumper Switch** is exactly this, telling your program the robot has hit something.
- **Distance** — measuring how far away an object is, with sound, laser light, or radar. Self-driving cars carry dozens of these; your kit's **Distance Sensor** uses a safe pulse of laser light, the same principle as the lidar on an autonomous vehicle.
- **Light and color** — cameras and color sensors that recognize objects. Your kit's **Optical Sensor** reports whether an object is near and what color it is.
- **Motion and balance** — accelerometers and gyroscopes that track turning and tilting, the way your inner ear keeps you balanced. Your kit's **Inertial Sensor** does this, and it's how a robot can turn *exactly* 90°.
- **Rotation (angle)** — a sensor on a moving joint that reports how far it has turned. Your kit's **Potentiometer V2** measures the angle of an arm or dial (0 to ~330°) through a 3-Wire port; you'll use it, and calibrate it, in Chapter 11.

So when your research asks "what sensors does this robot use, and how?" — you're asking how the robot closes its sense → decide → act loop. A robot with rich sensing can work in a messy, changing world; a robot with none can only repeat motions blindly and hope the world hasn't moved.

> **📚 Learn more — VEX Library**
> - [Using Bumper Switch with VEX EXP](https://kb.vex.com/hc/en-us/articles/4415784141716-Using-Bumper-Switch-with-VEX-EXP) — how a touch sensor completes a circuit, and where to mount one
> - [Using Distance Sensor with VEX EXP](https://kb.vex.com/hc/en-us/articles/4415763007380-Using-Distance-Sensor-with-VEX-EXP) — your kit's laser distance sensor
> - [Using the Potentiometer V2 with VEX EXP](https://kb.vex.com/hc/en-us/articles/36994045337748-Using-the-Potentiometer-V2-with-VEX-EXP) — the rotation/angle sensor for arms and dials
> - [Overview of the VEX V5 Sensors](https://kb.vex.com/hc/en-us/articles/4401967256596-Overview-of-the-VEX-V5-Sensors) — **Heads-up:** this is the V5/competition page, with sensors beyond your EXP kit (GPS, Rotation, Vision). Great for seeing where the sensor family goes next — especially if you also build on the V5 competition team.

---

## How is a robot taught its task?

Your research will also ask *how the robot learns its job*. There are three main answers, and many robots combine them:

- **It's programmed.** A person writes step-by-step instructions in code — exactly what you'll do in C++ later this course. Most robots, including yours, work this way.
- **It's shown.** A worker physically guides the arm through a motion, or steps it through positions with a handheld **teach pendant**, and the robot records and replays the path. Common on factory floors.
- **It learns.** Newer robots use machine learning: instead of being told every step, they're trained on examples or by trial and error — how a self-driving car gets better at recognizing pedestrians.

---

## Robots and us: benefits, costs, and open questions

Every robot in your research replaced, extended, or protected some human function — and that always cuts more than one way. The benefits are real: robots take over the three Ds, work without fatigue, achieve precision no hand can match, and reach places no person can survive. The costs are real too: a welding robot means fewer welders on that line; an autonomous vehicle raises the question of who's responsible when it fails; a robot in the home collects data about the people living there.

At the same time, robots *create* work that didn't exist before — somebody has to design, build, program, install, inspect, and repair every one of them. (This course is, quite literally, the first step toward those careers.) Whether automation helps or harms a particular community depends on which jobs it touches and what new ones people there can reach — which is why your research asks about your robot's **societal impact**, not just its specs. There isn't one right answer to "should we give up control to a machine?" — but there are stronger and weaker arguments, and the strong ones weigh both sides honestly. That's the standard for your presentation and for the conclusion questions.

---

## Your research project

Your teacher will divide the class into teams and assign each team one robot category: **industrial, medical, automated vehicles, household, military, toys, exploratory, rescue,** or **assistive** robots. Your team picks one *specific* robot in that category and becomes the class experts on it. Your presentation must answer all nine questions:

1. What task does the robot perform, and what human function does it simulate, replace, or extend?
2. Where is it used, and what is its work envelope — how many degrees of freedom or flexible joints does it have?
3. Is its end effector multi-functional? If so, what else can it do?
4. How is the robot taught to perform its task?
5. What sensors does it have, and how does it use them?
6. What are the advantages and disadvantages of using a robot for this task?
7. What impact has it had — or could it have — on the people it serves?
8. What jobs and careers does this robot create?
9. How might this robot be altered to do more, or different, tasks in the future?

Include sketches, photos, or video of the robot in action. After the presentations, each student writes a paragraph summarizing what they learned across *all* the robots — so take notes while your classmates present.

> ### 🔍 Research tips: find sources worth trusting
> Start with the people closest to the robot: the **manufacturer's own site** for specs (degrees of freedom, payload, sensors), and **NASA/JPL** pages for exploratory robots — they publish real engineering details, not rumors. A short **video of the robot working** is worth a hundred words in your presentation; pick examples that are current (warehouse robots, surgical robots, delivery drones, vacuum and lawn robots, Mars rovers), not just famous. And keep a list of every source you use — your audience should be able to check anything you claim.

> **How you'll be graded.** The rubric scores four things: **content** (accurate, answers every research question), **organization** (a logical order where information is easy to find), **delivery** (on topic, audible, eye contact), and **cooperation & teamwork** (everyone listens, contributes, and compromises). A beautiful presentation that skips three research questions loses to a plain one that nails all nine.

---

## What you'll need

- Engineering notebook and pencil
- Computer with internet access and presentation software
- Reference books or articles on robotics

## Do it

1. **Form teams and claim a category.** Your teacher assigns each team a robot category from the list above.
2. **Choose a specific robot and research it** against all nine questions. Split the questions among teammates, but review everything together — anyone on the team should be able to answer any question.
3. **Build a short presentation** with sketches, photos, or video of the robot in action.
4. **Present, listen, and summarize.** Present to the class; while others present, take notes; then write your paragraph summarizing what you learned across all the robots.

## Check your understanding

1. Name the five main parts of a robotic system, and identify where each one is on your EXP robot.
2. In your own words, what is a work envelope, and why does it matter for safety around an industrial robot?
3. Which robot do you think will have the most significant impact on humans, and why?
4. What concerns do you have about the increasing use of robots in society?
5. What do you think about giving up control to a machine?

## Key terms

robot · automation · teleoperation · sense → decide → act · the three Ds · robotic system · controller · program · manipulator · end effector · power supply · degree of freedom · work envelope · sensor · teach pendant · societal impact

**Sources (VEX Library, kb.vex.com):** Building with VEX EXP; Wirelessly Pairing an EXP Controller to an EXP Brain; Using Bumper Switch with VEX EXP; Using Distance Sensor with VEX EXP; Overview of the VEX V5 Sensors.
