# Chapter 8 · Robots as Technological Systems

**Unit 3 · Programming & automation · Activity 3.1 (Unit 3 opener)**

**What you'll learn:** how engineers think about *any* machine — as a **system** with an input, a process, and an output. You'll meet the basic **system model** (desired result → process → actual result), the **seven technological resources** every system uses, and the idea that separates a machine that runs blind from one that corrects itself: **feedback**. Then you'll see your VEX robot as exactly this kind of system — **sensors = input, the Brain = process, motors = output** — and prove it by wiring a motor and a sensor and watching them live on the Brain's screen. **No code yet** (that starts in Chapter 9). This is the mental model the rest of the course is built on.

## Everything around you is a system

A **system** is a group of interrelated parts that work together to reach a goal. A space shuttle is a system; so is the cell phone in your pocket. A **technological system** is one that uses technology to produce its result. The power of the idea: every system, huge or tiny, can be understood with the same three-part model.

## The basic system model: input → process → output

- **Input — the *desired* result.** What you *want* to happen; the goal you set. (Press "2:00" on the microwave; decide to drive 30 mph.)
- **Process — the action part.** The system combines its resources and does the work to respond to the input.
- **Output — the *actual* result.** What actually happened. (The food is warm; the car is moving.)

So the model reads **desired result → process → actual result**. The hinge of the whole chapter: the *desired* result and the *actual* result are **not always the same**.

*(Central diagram: the three boxes — INPUT/PROCESS/OUTPUT — dual-labeled with the robot's Sensors / Brain / Motors, with a feedback loop curving from output back to input.)*

## The seven technological resources

Inside the Process, a system draws on **seven resources** (with one way each already shows up on your robot):

- **People** — design, build, run, service the system. *(Robot: you.)*
- **Information** — knowledge, data, instructions. *(Robot: your plan; soon your code and sensor readings.)*
- **Materials** — raw (ore, wood) → processed (lumber, leather) → manufactured (glass, paper, metal) → synthetic (plastics). *(Robot: the EXP structure, shafts, gears.)*
- **Tools & Machines** — a tool becomes a machine when you add a power source. *(Robot: the Brain, motors, your laptop.)*
- **Energy** — the power that makes it go. *(Robot: the EXP battery.)*
- **Capital** — money, credit, or property invested. *(Robot: what the kit costs.)*
- **Time** — everything takes time; too much or too little ruins the result. *(Robot: class periods; how long a movement takes.)*

Naming the resources is a habit: when a system fails, ask **which resource is short**.

## Does it watch the result? Open-loop vs. closed-loop

- **Open-loop** — no way to check or adjust itself. A microwave heats for the set time with no idea whether the food got hot; it **can't tell and can't correct**. A train on a hill, a wood stove, a basic washer/dryer — they run **blind**: input → process → output, done.
- **Closed-loop** — senses its actual result, compares it to the desired result, and **adjusts**, over and over. A thermostat, cruise control, a bike rider. The piece that makes the difference is the **feedback loop**: a *sensor* reports the actual result back to the start so the system corrects itself.

**Inside a feedback loop** (cruise control set to 30, drifting to 50 downhill):

- **Monitor** — a sensor measures the actual result (speedometer reads 50).
- **Comparator** — compares actual to desired (50 > 30).
- **Controller** — makes the correction (ease off the gas).

The cycle **sense → compare → adjust** is the most important idea in this unit.

## Your robot is a technological system

It maps onto the model exactly (the second label in every box of the diagram):

- **Sensors are the input** — a Distance Sensor, Optical Sensor, or bumper switch measures the world (or the robot itself) and reports to the Brain.
- **The Brain is the process** — it takes sensor readings plus your instructions, decides, and sends commands out.
- **Motors are the output** — they turn decisions into real-world motion.

**Feedback** ties it into a closed loop. A robot with no sensors is open-loop — drives for a set time and hopes, like the microwave. Add a sensor and code ("if distance < 200 mm, stop") and it senses its actual result and corrects — closed-loop. **That's automation**, and it's where Unit 3 heads. You don't write the code yet — first prove input → process → output is real, by hand.

## Also on the V5 competition team?

The systems thinking is platform-independent — a V5 robot is the same model with the same feedback need. Only the hardware differs: the **EXP Brain has 10 Smart Ports** and an EXP battery; the **V5 Brain has 21 Smart Ports**, a bigger touchscreen, and its own V5 battery. Different brains, ports, and batteries that don't mix — which keeps the two programs in their own pools.

## Lab setup & ground rules

1. **Use your classroom kit's EXP electronics** — the EXP Brain, an EXP Smart Motor, an EXP sensor, EXP Smart Cables. Don't borrow the separate competition team's V5 brain/battery/sensors (different ports and battery; they won't talk to EXP gear anyway).
2. **Charged battery, gentle cables** — start with a charged EXP battery on the Brain; seat each Smart Cable until it clicks; remove it by pressing the release tab, never by yanking the wire.

## Safety

- Keep fingers, hair, and loose clothing clear of the motor's spinning shaft and anything on it.
- Handle the Brain and battery gently; keep cables clear of the table edge.
- Seat cables until they click; remove via the release tab; power down by holding **X**.

## What you'll need

- A VEX EXP Brain and a charged EXP battery
- One EXP Smart Motor
- One EXP sensor — a Distance Sensor is ideal; an Optical Sensor or bumper switch also works
- Two EXP Smart Cables
- Engineering notebook (no laptop or code this time)

## Do it

1. **Power on** the Brain (Check button).
2. **Wire the output** — Smart Motor into any Smart Port; press until it clicks. (Output.)
3. **Wire the input** — sensor into any other Smart Port, same way. (Input.)
4. **Open the Devices screen** — left/right to highlight **Devices**, press **Check**. Both devices appear by port; the Brain auto-detected them, no code.
5. **Watch the input live** — select the sensor; move your hand toward/away from the Distance Sensor and watch the reading change in real time.
6. **Make the output report on itself** — select the motor; turn its shaft by hand and watch the angle change. The built-in **encoder** means the motor is also sensing its own motion — a preview of feedback.
7. **Write it up** — sketch input → process → output for this setup, label each physical part, and add one sentence on where feedback would come from.
8. **Power down** — hold **X** until the screen goes dark.

## Check your understanding

1. In your own words, name the three parts of the basic system model and what each does.
2. Pick a technological system you use daily; give one example of each of the seven resources.
3. What's the difference between an open-loop and a closed-loop system? One example of each.
4. On your VEX robot, which part is the input, the process, and the output?
5. Why does feedback require a sensor? Name one thing a robot could sense to close the loop, and what it would do with it.
6. Turning the motor by hand changed its angle on the Devices screen. Explain how that makes the motor a kind of sensor, not just an output.

## Key terms

system · technological system · system model · input · process · output · desired result · actual result · technological resources · open-loop system · closed-loop system · feedback · feedback loop · sensor · Brain · motor · Smart Port · encoder · automation

## Sources

PLTW Gateway *Automation & Robotics*, Activity 3.1 "Technological Systems": the basic system model, the seven technological resources, and open- vs. closed-loop systems (monitor/comparator/controller). VEX Library (kb.vex.com): EXP Brain has 10 Smart Ports for motors and sensors; the on-board Devices screen shows live readings with no code; seat Smart Cables until they click; Distance Sensor range 20–2000 mm (Connecting Devices to Smart Ports on the EXP Brain; Using the Devices Screen on the EXP Brain; Navigating the EXP Brain Screen; Using the Distance Sensor with VEX EXP). The EXP Smart Motor's fixed 200 RPM / 0.5 N·m spec and built-in encoder carry over from Chapter 3.
