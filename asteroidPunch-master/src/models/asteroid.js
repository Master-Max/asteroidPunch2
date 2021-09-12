class Asteroid {
  constructor(data){
    this.type = 'asteroid';
    this.health = data.health;
    this.flavor = data.flavor;

    this.x = data.x;
    this.y = data.y;
    this.lVelocity = data.lv;
    this.vx = data.vx;
    this.vy = data.vy;

    this.rad = data.rad;

    this.color = "white";

    this.h = data.h;
    this.w = data.w;
    this.abb = data.abb;
    this.abc = data.abc;

    this.xTable = [];
    this.yTable = [];

    this.showBB = false;

    this.setAsteroidShape();
  }

  setAsteroidShape(){
    let tmpXTable = [];
    let tmpYTable = [];

    switch (this.flavor) {
      case 'Pinched':
        tmpXTable=[ 0, 12, 12, 1, -9, -4,-14,-14,-10,  1,  7, 12, 0];
        tmpYTable=[ 1,  3,  5, 9,  9,  5,  5, -2, -9, -6, -9, -4, 1];
        break;
      case 'Jagged':
        tmpXTable=[ -1, -2,  2, 12, 12,  7, -4,-12, -5,-13,-10, -1];
        tmpYTable=[  0,-10,-10, -2,  3,  8,  9,  5,  0, -2, -8,  0];
        break;
      case 'Lumpy':
        tmpXTable=[ 0,6,12,9,13,6,-7,-11,-11,-5,0];
        tmpYTable=[ 6,10,7,0,-7,-10,-10,-7,7,10,6];
        break;
      case 'Cobbled':
        tmpXTable=[0,6,11,5,12,6,-2,-6,-12,-9,-11,-7,0];
        tmpYTable=[7,10,6,4,0,-9,-6,-9,-5,0,5,10,7];
        break;
      default:
    }

    switch (this.health) {
      case 3:
        this.xTable = tmpXTable.map((e) => {return e * 4} )
        this.yTable = tmpYTable.map((e) => {return e * 4} )
        this.abb = {
          x: this.abb.x.map((e) => {return e * 4}),
          y: this.abb.y.map((e) => {return e * 4})
        };
        this.abc = this.abc * 4;
        break;
      case 2:
        this.xTable = tmpXTable.map((e) => {return e * 2} )
        this.yTable = tmpYTable.map((e) => {return e * 2} )
        this.abb = {
          x: this.abb.x.map((e) => {return e * 2}),
          y: this.abb.y.map((e) => {return e * 2})
        };
        this.abc = this.abc * 2;
        break;
      case 1:
        this.xTable = tmpXTable
        this.yTable = tmpYTable
        break;
      default:
        this.xTable = tmpXTable
        this.yTable = tmpYTable
        break;
    }

  }

  getCollisionBox(){
    const tmpX = this.x - this.abb.x[0];
    const tmpY = this.y - this.abb.y[0];
    const tmpWidth = this.abb.x[0] - this.abb.x[2];
    const tmpHeight = this.abb.y[0] - this.abb.y[2];
    const data = {
      x: tmpX,
      y: tmpY,
      w: tmpWidth,
      h: tmpHeight
    };
    return data;
  }

  generateChildAsteroid(){
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

    const vx = ((Math.random() * 2) -1 ) * 0.1;
    const vy = ((Math.random() * 2) -1 ) * 0.1;

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
      abb: asteroidBoundingBox,
      abc: asteroidBoundingCircle,
      health: this.health - 1,
      flavor: flavor,
      x: this.x,
      y: this.y,
      vx: vx,
      vy: vy,
      rad: 0,
      lv: 0.1,
      h: this.h,
      w: this.w
    }

    asteroid = new Asteroid(data);

    return asteroid;
  }

  hitFace(){
    player.addScore(this.health);

    if(this.health - 1 > 0){
      let tmpAsteroid1 = this.generateChildAsteroid();
      let tmpAsteroid2 = this.generateChildAsteroid();
      renderQueue.push(tmpAsteroid1);
      renderQueue.push(tmpAsteroid2);
      asteroidQueue.push(tmpAsteroid1);
      asteroidQueue.push(tmpAsteroid2);
    }
    removeFromRenderQueue(this);
    removeFromAsteroidQueue(this);

    //Add Score To player
    //Remove THIS asteroid
    //spawn two asteroids with -- health at this.x,this.y

  }

  update(delta){
    if(this.x > this.w){
      this.x = 0;
    }
    if(this.y > this.h){
      this.y = 0;
    }
    if(this.y < 0){
      this.y = this.h;
    }
    if(this.x < 0){
      this.x = this.w;
    }


    this.x += this.vx * delta;
    this.y += this.vy * delta;
  }



  draw(ctx, interp){
    // let xTable = [];
    // let yTable = [];
    //
    // switch (this.flavor) {
    //   case 'Pinched':
    //     xTable=[ 0, 12, 12, 1, -9, -4,-14,-14,-10,  1,  7, 12, 0];
    //     yTable=[ 1,  3,  5, 9,  9,  5,  5, -2, -9, -6, -9, -4, 1];
    //     break;
    //   case 'Jagged':
    //     xTable=[ -1, -2,  2, 12, 12,  7, -4,-12, -5,-13,-10, -1];
    //     yTable=[  0,-10,-10, -2,  3,  8,  9,  5,  0, -2, -8,  0];
    //     break;
    //   case 'Lumpy':
    //     xTable=[ 0,6,12,9,13,6,-7,-11,-11,-5,0];
    //     yTable=[ 6,10,7,0,-7,-10,-10,-7,7,10,6];
    //     break;
    //   case 'Cobbled':
    //     xTable=[0,6,11,5,12,6,-2,-6,-12,-9,-11,-7,0];
    //     yTable=[7,10,6,4,0,-9,-6,-9,-5,0,5,10,7];
    //     break;
    //   default:
    //
    // }

    ctx.strokeStyle = this.color;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rad);
    // ctx.scale(1,1);

    ctx.beginPath();

    for(let i = 0; i < this.xTable.length - 1; i++){
      ctx.moveTo(this.xTable[i], (-1 * this.yTable[i]));
      ctx.lineTo(this.xTable[i+1], -1 * this.yTable[i+1]);
      ctx.stroke();
    }

    if(this.showBB){
      for(let i = 0; i<4; i++){
        ctx.moveTo(this.abb.x[i],this.abb.y[i]);
        ctx.lineTo(this.abb.x[i+1],this.abb.y[i+1]);
        ctx.stroke()
      }

      ctx.arc(0, 0, this.abc, 0, 2 * Math.PI);
      ctx.stroke();
    }

    ctx.restore();

  }
}


    // ctx.beginPath();
    //
    // ctx.moveTo(0,-1);
    // ctx.lineTo(12,-3);
    // ctx.stroke();
    //
    // ctx.moveTo(12,-3);
    // ctx.lineTo(12,-5);
    // ctx.stroke();
    //
    // ctx.moveTo(12,-5);
    // ctx.lineTo(1,-9);
    // ctx.stroke();
    //
    // ctx.moveTo(1,-9);
    // ctx.lineTo(-9,-9);
    // ctx.stroke();
    //
    // ctx.moveTo(-9,-9);
    // ctx.lineTo(-4,-5);
    // ctx.stroke();
    //
    // ctx.moveTo(-4,-5);
    // ctx.lineTo(-14,-5);
    // ctx.stroke();
    //
    // ctx.moveTo(-14,-5);
    // ctx.lineTo(-14,2);
    // ctx.stroke();
    //
    // ctx.moveTo(-14,2);
    // ctx.lineTo(-10,9);
    // ctx.stroke();
    //
    // ctx.moveTo(-10,9);
    // ctx.lineTo(1,6);
    // ctx.stroke();
    //
    // ctx.moveTo(1,6);
    // ctx.lineTo(7,9);
    // ctx.stroke();
    //
    // ctx.moveTo(7,9);
    // ctx.lineTo(12,4);
    // ctx.stroke();
    //
    // ctx.moveTo(12,4);
    // ctx.lineTo(0,-1);
    // ctx.stroke();
