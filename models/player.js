class Player {
  constructor(data){
    this.type = 'player';
    this.name = data.name;
    this.health = data.health;
    this.score = data.score;

    this.x = data.x;
    this.y = data.y;
    this.lVelocity = data.lv;
    this.vx = 0.0;
    this.vy = 0.0;
    this.rad = data.r; // Rotation
    this.aVelocity = data.av;
    this.turnL = false;
    this.turnR = false;

    this.burning = false;
    this.firing = false;

    this.alive = true;

    this.color = "white";

    this.h = data.h;
    this.w = data.w;

    this.ammo = data.ammo;

    this.respawnTimer = 0;
    this.respawning = false;
    this.timer = 0;
  }

  takeDamage(){
    // makeTmpAnim();
    this.respawnTimer = 3000;
    this.respawning = true;
    this.health -= 1;
    this.color = 'red';
  }

  checkContact(){
    asteroidQueue.forEach((obj) => {
      let tmpCords = obj.getCollisionBox();

      if(this.x > tmpCords.x && this.x < tmpCords.x + tmpCords.w &&
        this.y > tmpCords.y && this.y < tmpCords.y + tmpCords.h){
          obj.hitFace();
          this.takeDamage();
        }
    })
  }

  addScore(s){
    this.score += s;
  }

  turnLeft(b){
    this.turnL = b;
  }

  turnRight(b){
    this.turnR = b;
  }

  burnEngine(b){
    this.burning = b;
  }

  fireCannon(b){
    this.firing = b;
  }

  takeShot(){
    this.ammo -= 1;

    const burnOutTime = 700;
    const size = 5;

    let tmpVX = 0;
    let tmpVY = 0;
    let tmpLV = 0.75;

    tmpVX = this.vx + (tmpLV * (1 * Math.sin(this.rad)));
    tmpVY = this.vy + (tmpLV * (-1 * Math.cos(this.rad)));

    let tmpX = this.x;
    let tmpY = this.y;

    const data = {
      x: tmpX,
      y: tmpY,
      bot: burnOutTime,
      size: size,
      vx: tmpVX,
      vy: tmpVY,
      color: 'white',
      h: this.h,
      w: this.w
    }

    const ball = new Cannonball(data);
    renderQueue.push(ball);
    this.firing = false;
  }

  respawn(delta){
    this.timer += delta
    this.vx = 0;
    this.vy = 0;
    // makeTmpAnim();
    if(this.timer > this.respawnTimer){
      this.color = 'white';
      this.respawning = false;
      this.timer = 0;
    }else if(this.timer >= this.respawnTimer / 2){
      this.rad = 0.0;
    }else{

    }
  }

  update(delta){
    // The Bounding Box
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

    if(!this.respawning){
      if(this.turnR){
        this.rad += this.aVelocity * delta;
      }
      else if(this.turnL){
        this.rad -= this.aVelocity * delta;
      }

      let slowdown = true;

      if(this.burning){
        this.vy -= (this.lVelocity * delta) * Math.cos(this.rad);
        this.vx += (this.lVelocity * delta) * Math.sin(this.rad);
      }
      else if(slowdown){ // Slowdown Feature, eventually the craft stops
        if(this.vx != 0){
          if(this.vx > 0){
            this.vx -= (this.vx * 0.001) * delta;
          }
          else if(this.vx < 0){
            this.vx -= (this.vx * 0.001) * delta;
          }
        }
        if(this.vy != 0){
          if(this.vy > 0){
            this.vy -= (this.vy * 0.001) * delta;
          }
          else if(this.vy < 0){
            this.vy -= (this.vy * 0.001) * delta;
          }
        }
      }

      if(this.firing){
        if(this.ammo > 0){
          console.log('firing: ' + this.ammo)
          this.takeShot();
        }
      }

      this.x += this.vx * delta;
      this.y += this.vy * delta;

      this.checkContact();
    }else{
      this.respawn(delta)
    }


  }

  draw(ctx, interp){
    ctx.strokeStyle = this.color;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rad);

    ctx.beginPath();
    //Left Side
    ctx.moveTo(0, -15);
    ctx.lineTo(-8, 5);
    ctx.stroke();

    //Right Side
    ctx.moveTo(0, -15);
    ctx.lineTo(8, 5);
    ctx.stroke();

    //Bottom
    ctx.moveTo(-8, 5);
    ctx.lineTo(8, 5);
    ctx.stroke();

    //Left Fin
    ctx.moveTo(-8, 5);
    ctx.lineTo(-10, 10);
    ctx.stroke();

    //Right Fin
    ctx.moveTo(8, 5);
    ctx.lineTo(10, 10);
    ctx.stroke();

    //Exhaust
    if(this.burning){
      ctx.moveTo(-4, 5);
      ctx.lineTo(0, 15);
      ctx.stroke();

      ctx.moveTo(4, 5);
      ctx.lineTo(0, 15);
      ctx.stroke();
    }

    ctx.restore();
  }
}


  // draw(ctx, interp){
  //   //ctx.fillStyle = this.color;
  //   ctx.strokeStyle = this.color;
  //   ctx.beginPath();
  //   //Left Side
  //   ctx.moveTo(this.x, this.y - 15);
  //   ctx.lineTo(this.x - 8, this.y + 5);
  //   ctx.stroke();
  //
  //   //Right Side
  //   ctx.moveTo(this.x, this.y - 15);
  //   ctx.lineTo(this.x + 8, this.y + 5);
  //   ctx.stroke();
  //
  //   //Bottom0.7
  //   ctx.moveTo(this.x - 8, this.y + 5);
  //   ctx.lineTo(this.x + 8, this.y + 5);
  //   ctx.stroke();
  //this.x
  //   //Left Finthis.y
  //   ctx.moveTo(this.x - 8, this.y + 5);
  //   ctx.lineTo(this.x -10, this.y + 10);
  //   ctx.stroke();
  //
  //   //Right Fin
  //   ctx.moveTo(this.x + 8, this.y + 5);
  //   ctx.lineTo(this.x + 10, this.y + 10);
  //   ctx.stroke();
  // }
