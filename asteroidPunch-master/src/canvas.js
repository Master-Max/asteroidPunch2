/****************************************
* DOM Variables
*****************************************/
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

// let creep = new Creep(0, 375, 0.08, 750, 0); // Test Entity

const fpsDisplay = document.getElementById('fps-display');

/****************************************
* Main Loop Variables
*****************************************/
let delta = 0;
let tickrate = 1000 / 60;

let lastFrameTimeMs = 0;

let fps = 60;
let fpsAlpha = 0.9;
let fpsUpdateInterval = 1000;
let lastFpsUpdate = 0;
let framesSinceLastFpsUpdate = 0;
let numUpdateSteps = 0;

let running = false;
let started = false;

let rafHandle;
/****************************************
* Main Loop Stuff
*****************************************/


let areThereAsteroids = false;

function update(delta) {
  // creep.lastX = creep.x;
  // creep.x += creep.velocity * delta;
  // if(creep.x >= creep.limit || creep.x <player= 0){
  //   creep.velocity = -creep.velocity;
  // }

  //Investigate disapearing asteroids??? and players :/

  // if(asteroidQueue.length <= 0){
  //   startNextLevel();
  // }
  //
  // for(let i = 0; i < renderQueue.length; i++){
  //   let areThereAsteroids = false;
  //   if(renderQueue[i].type == 'asteroid'){
  //     areThereAsteroids = true;
  //   }
  // }

  renderQueue.forEach((obj) => {
    let tmpType = obj.type;
    // if(tmpType == 'asteroid'){
    //   areThereAsteroids = true;
    // }
    // if(!areThereAsteroids){
    //   areThereAsteroids = true;
    //   startNextLevel();
    // }
    if(tmpType == 'player'){
      if(renderQueue.length == 1){
        startNextLevel();
      }
    }
    // console.log(tmpType);

    obj.update(delta);
  })
}



/****************************************
* Graphics Stuff
*****************************************/
function draw(interp) {
  ctx.clearRect(0, 0, width, height);

  // ctx.fillStyle = '#CDCDCD';
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);

  // ctx.font = '48px serif';
  // ctx.strokeText('HELLO WORLD', 10, 50);

  // player.draw(ctx, interp);

  renderQueue.forEach((obj) => {
    if (typeof obj.drawSprite === "function"){
      obj.drawSprite(ctx, interp); // FIX playerTHIS
    } else {
      obj.draw(ctx, interp);
    }
  })

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(player.score, 75, 80);

  let tmpHealthText = '';
  for(let i = 0; i < player.health ; i++){
    tmpHealthText = tmpHealthText + 'A';
  }
  // tmpHealthText = "\u200F" + tmpHealthText + "\u200F";

  // ctx.fillText("Health: " + player.health, canvas.width - 105 ,50);
  ctx.fillText(tmpHealthText, 75, 100);

}

function animate(timestamp) {
  rafHandle = requestAnimationFrame(animate);

  delta += timestamp - lastFrameTimeMs;
  lastFrameTimeMs = timestamp;

  begin(timestamp, delta);

  if (timestamp > lastFpsUpdate + fpsUpdateInterval) {
    fps = fpsAlpha * framesSinceLastFpsUpdate * 1000  / (timestamp - lastFpsUpdate) + (1 - fpsAlpha) * fps;

    lastFpsUpdate = timestamp;
    framesSinceLastFpsUpdate = 0;
  }
  framesSinceLastFpsUpdate++;

  // Update, unlinked to framerate
  numUpdateSteps = 0;
  while(delta >= tickrate) {
    update(tickrate);
    delta -= tickrate;
    // Sanity check, breaks if spiral of death starts
    if (++numUpdateSteps >= 240) { // Adds to numUpdateSteps while checking
      panic();
      break;
    }
  }

  draw(delta / tickrate);

  //end(fps); // Doesn't Do Anything Yet

}

/****************************************
* Systems Stuff
*****************************************/
function panic() {// Sets delta to 0, Ignoring leftover time
  console.log(`PANIC:\nDelta: ${delta}`);
  delta = 0;
}


function begin(timestamp, delta) {// Currently Empty
  // if(player.alive){
  //   if(!!currentRound){
  //     if(currentRound.completed()){makeTmpPlayer();
  //       player.surviveRound();
  //
  //       if(currentRound.isLastRound){
  //         console.log("You Win!!!");
  //         stop();
  //         setTimeout(renderWinPage, 2000);
  //       }
  //     }makeTmpPlayer();
  //     if(currentRound.started && !currentRound.finished){// while currentRound still generating creeps
  //       currentRound.update(timestamp);
  //     }
  //   }
  // } else {
  //   console.log("You Lose!!!");
  //   stop();
  //   //setTimeout(renderLosePage, 2000);
  // }

}

function stop() {
  running = false;
  started = false;
  cancelAnimationFrame(rafHandle);
}

function start() {
  if (!started) {
    started = true;

    rafHandle = requestAnimationFrame((timestamp) => {
      draw(1); // initial draw
      running = true;
      // Resetting Time Tracking Vars
      lastFrameTimeMs = timestamp;
      lastFpsUpdate = timestamp;
      framesSinceLastFpsUpdate = 0;
      // Starting the main loop
      rafHandle = requestAnimationFrame(animate);
    });
  }
}

/****************************************
* Event Listeners
*****************************************/
canvas.addEventListener('click', (e) => {
  // debugger;
  console.log("Where Am I Clicking?");
  const x = e.clientX - e.target.offsetLeft;
  const y = e.clientY - e.target.offsetTop;
  console.log(`X: ${e.clientX} | Y: ${e.clientY}`)
  // console.log(`X: ${e.target.offsetParent.offsetLeft} | Y: ${e.target.offsetParent.offsetTop}`)
  console.log(`X: ${e.target.offsetLeft} | Y: ${e.target.offsetTop}`)
  console.log(`X: ${x} | Y: ${y}`)
})
