#include "vex.h"
using namespace vex;

// ---- Your devices (already set up for you) -------------------
//   Plug your motor into Smart Port 1 on the Brain.
//   (Need more motors or a sensor later? Add a line here — the
//    "Code it" box in the chapter will tell you what to add.)
motor leftMotor = motor(PORT1);
// --------------------------------------------------------------

int main() {
  vexcodeInit();   // gets the robot ready — leave this here

  // ===== WRITE YOUR CODE BELOW THIS LINE =====
  leftMotor.spin(forward);
  wait(2, seconds);
  leftMotor.stop();
  // ===== WRITE YOUR CODE ABOVE THIS LINE =====
}
