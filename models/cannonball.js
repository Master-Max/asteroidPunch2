class Cannonball {
  constructor(data){
      this.type = 'cannonball';

      this.h = data.h;
      this.w = data.w;
      this.x = data.x;
      this.y = data.y;
      this.vx = data.vx;
      this.vy = data.vy;
      this.alive = true;
      this.color = data.color;
      this.startingX = data.x;
      this.startingY = data.y;
      this.burnOutTime = data.bot;
      this.size = data.size;
      this.timer = 0;
  }


  // checkContact(){
  //   // console.log("Checking Contact")
  //
  //   asteroidQueue.forEach((obj) => {
  //     // console.log(obj)
  //     let tmpCords = obj.getCollisionBox();
  //     // console.log(tmpCords);
  //     if(tmpCords.x < (this.x - this.size/2) + this.size &&
  //       tmpCords.x + tmpCords.w > (this.x - this.size/2) &&
  //       tmpCords.y < (this.y - this.size/2) + this.size &&
  //       tmpCords.y + tmpCords.h > (this.y - this.size/2)){
  //       // obj.color = "red";
  //       console.log('hit')
  //     }
  //   })
  // }

  checkContact2(){
    // console.log('New ROUND:')
    asteroidQueue.forEach((obj) => {
      let tmpCords = obj.getCollisionBox();
      // console.log(tmpCords);
      // console.log(tmpCords);
      // console.log('X: ' + this.x + '\nY: ' + this.y);
      if(this.x > tmpCords.x && this.x < tmpCords.x + tmpCords.w &&
        this.y > tmpCords.y && this.y < tmpCords.y + tmpCords.h){
          console.log('****************HIT****************');
          obj.hitFace();
          removeFromRenderQueue(this);
          player.ammo += 1;
        }
    })
  }


  update(delta){

    // this.checkContact();

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

    this.timer += delta;
    if( this.timer > this.burnOutTime ){
      // this.color = 'red';
      removeFromRenderQueue(this)
      player.ammo += 1;
    }

    this.checkContact2();

    // const tmpDist = Math.pow((this.startingX - this.x) , 2) + Math.pow((this.startingY - this.y), 2);
    // const tmpBOD = Math.pow(this.burnOutDist, 2)
    // if(tmpDist > tmpBOD){
    //   this.color = 'red';
    // }

  }

  draw(ctx, interp){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - (this.size/2), this.y - (this.size/2), this.size, this.size);

  }

}

/*

Okay so my current problem is that I can probably ehhh yeah hold on
lets see if first I can even spawn the cannonballs where I want
them to spawn.

*/
