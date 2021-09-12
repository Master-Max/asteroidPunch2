/****************************************
* Draw Array
*****************************************/
const renderQueue = [];
function removeFromRenderQueue(obj){
  const index = renderQueue.indexOf(obj);
  renderQueue.splice(index, 1);
}

const tmpQueue = [];
/****************************************
* Collision Array
*****************************************/
const collisionQueue = [];
function removeFromCollisionQueue(obj){
  const index = collisionQueue.indexOf(obj);
  collisionQueue.splice(index,1);
}

const asteroidQueue = [];
function removeFromAsteroidQueue(obj){
  const index = asteroidQueue.indexOf(obj);
  asteroidQueue.splice(index,1);
}



/****************************************
*Dev Buttons
*****************************************/
const startButton = document.getElementById('start-btn');
const stopButton = document.getElementById('stop-btn');


/****************************************
*Player Stuff
*****************************************/
let player;

/****************************************
* Game Stuff
*****************************************/
let currentLevel = 1;
let currentSpawnNumber = 4;
let isGameRunning = false;
let nextLevel = 2;
let nextSpawnNumber = 6;



// Test Stuff

//const canvasDiv = document.getElementById('canvas-div');
