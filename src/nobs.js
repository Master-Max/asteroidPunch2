startButton.addEventListener('click', () => {
  makeTmpPlayer();
  // makeTmpAsteroid();
  // makeTmpAsteroid();
  // makeTmpAsteroid();
  start();
  // console.log("Have I Won: 1");
})


stopButton.addEventListener('click', () => {
  stop();
})

function startNextLevel(){
  for(let i = 0; i < currentSpawnNumber; i++){
    makeTmpAsteroid();
  }

  currentLevel += 1;
  currentSpawnNumber += 2;

}



/****************************************
* Asteroid Making
*****************************************/
function genAsteroidStats() {
  let ranX = Math.random() * (height);
  let ranY = Math.random() * (width);
  if(ranX > (width/2) - 50 || ranX < (width/2) + 50){
    ranX +=5;
  }
  if(ranY > (height/2) - 50 || ranY < (height/2) + 50){
    ranY +=5;
  }
  // ranRad = Math.random() * (Math.PI * 2);
  ranRad = 0;

  let coords = [ranX, ranY, ranRad];
  let flavor = '';

  switch(Math.floor(Math.random() * 4)){
    case 0:
      flavor = 'Pinched';
      break;
    case 1:
      flavor = 'Jagged';
      break;
    case 2:
      flavor = 'Lumpy';
      break;
    case 3:
      flavor = 'Cobbled';
      break;
    default:
  }

  let vx = ((Math.random() * 2) -1 ) * 0.1;
  let vy = ((Math.random() * 2) -1 ) * 0.1;

  const stats = {
    coords:coords,
    flavor:flavor,
    vx:vx,
    vy:vy
  }

  return stats;
}

function makeTmpAsteroid() {
  let h = height;
  let w = width;
  stats = genAsteroidStats();
  //console.log(stats);
  const asteroidBoundingBox = {
    x:[
      10,10,-10,-10,10
    ],
    y:[
      10,-10,-10,10,10
    ]
  }

  const asteroidBoundingCircle = 15;

  const data = {
    abc: asteroidBoundingCircle,
    abb: asteroidBoundingBox,
    vx:stats.vx,
    vy:stats.vy,
    health:3,
    flavor:stats.flavor,
    x:stats.coords[0],
    y:stats.coords[1],
    lv:0.1,
    rad:stats.coords[2],
    h:height,
    w:width
  };
  //const data = {health:3, flavor:'Cobbled', x:100, y:100, lv:0.1, rad:0, h:height, w:width};
  asteroid = new Asteroid(data);
  renderQueue.push(asteroid);
  asteroidQueue.push(asteroid);
}


/****************************************
* Player Making
*****************************************/
function makeTmpPlayer() {
  let h = height;
  let w = width;
  const data = {
    name: "",
    health:3,
    score:0,
    x:width/2,
    y:height/2,
    lv:0.0005,
    r:0.0,
    av:0.003,
    h:h,
    w:w,
    ammo:3
  };
  player = new Player(data);
  renderQueue.push(player);
}


/****************************************
* Animation Making
*****************************************/


function makeTmpAnim() {
  let h = height;
  let w = width;

  const tmpX = [-5  ,   5,-1.5];
  const tmpY = [-2.5,-2.5, 6.5];

  const tmpXTab = [0,-10, 0, 10, -8, 8];
  const tmpYTab = [-15,10,-15,10,5,5];

  let tmpVx = [0,0,0];
  let tmpVy = [0,0,0];

  tmpVx = tmpVx.map((n) => {return n = Math.random()});

  tmpVy = tmpVy.map((n) => {return n = Math.random()});

  const data = {
    x: [0,0,0],
    y: [0,0,0],
    xTable: tmpXTab,
    yTable: tmpYTab,
    r: [0,0,0],
    h: height,
    w: width,
    vXTable: tmpVx,
    vYTable: tmpVy
  }

  anim = new Animtest(data);
  renderQueue.push(anim);
}


/****************************************
* Controls
*****************************************/

document.addEventListener('keydown', downKey);

function downKey(e) {
  // console.log('DW' + e.code);
  switch(e.code){
    case 'KeyA':
      player.turnLeft(true);
      break;
    case 'KeyS':
      player.turnRight(true);
      break;
    case 'KeyD':
      player.burnEngine(true);
      break;
    case 'KeyF':
      player.fireCannon(true);
    default:

  }
}

document.addEventListener('keyup', upKey);

function upKey(e) {
  // console.log('UP' + e.code);
  switch(e.code){
    case 'KeyA':
      player.turnLeft(false);
      break;
    case 'KeyS':
      player.turnRight(false);
      break;
    case 'KeyD':
      player.burnEngine(false);
      break;
    default:

  }
}
