/*
- By Jeff R
- Rocket Patrol MODS Project
- Completed April 18th, 2022
- A total of approximately 10 hours and 20 minutes was spent on 
  making and implementing mods for the project.

* [NECESSARY] Track a high score that persists across scenes and display it in the UI 
  (5)

* [EASY] Randomize each spaceship's movement speed at the start of each play 
  (5)
    The regular 3 ships' speeds are randomized per reset (when they are hit),
    while the ship direction is reversed for the special/fast ship on reset.

* [NECESSARY] Display the time remaining (in seconds) on the screen 
  (10) 
    time remaining is displayed in the center of the screen

* PP Implement parallax scrolling 
  (10)

* [EASY] Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points 
  (20)
    the small ship moves 1 unit faster than the standard speed

* Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship 
  (20)

* Implement a new timing/scoring mechanism that adds time to the clock for successful hits 
  (20)
  If a player is able to hit more than 1 ship without missing, their timer is paused 
  for a given period of time, maxing out at 5 seconds pause time though the pause
  times don't stack.
  Mostly handled in AddTimeCheck() in Play.js

* Allow the player to control the Rocket after it's fired 
  (5)
  player can steer the rocket after it's fired, but their control speed is much slower

Finally,
* Create new artwork for all of the in-game assets (rocket, spaceships, explosion) 
  (20)

Total: 115

no collaborators
main resource: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/
*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}
let game = new Phaser.Game(config);

//reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

// set UI sizes //
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

//keep highscore
let highScore = 0;
