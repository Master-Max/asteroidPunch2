class Animtest {
  constructor(data){
    this.x = data.x;
    this.y = data.y;
    this.xTable= data.xTable;
    this.yTable= data.yTable;
    this.rad = data.r;
    this.h = data.h;
    this.w = data.w;
    this.color = "white";
    // this.xTable = data.xTable;
    // this.yTable = data.yTable;
    this.vXTable = data.vXTable;
    this.vYTable = data.vYTable;

    this.rads = this.rad.map((n) => {return n = Math.random()});
  }

  update(delta){

    // i need like only three things each piece has a Rotation
    for(let i = 0; i < this.x.length; i++){
      this.x[i] += this.vXTable[i];
      this.y[i] += this.vYTable[i];
      this.rad[i] += this.rads[i];
    }


  }

  draw(ctx, interp){

    let count = 0;

    ctx.strokeStyle = this.color;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rad[0]);
    ctx.beginPath();
    ctx.moveTo(this.xTable[0],this.yTable[0]);
    ctx.moveTo(this.xTable[1],this.yTable[1]);
    ctx.closePath();
    ctx.restore();


    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rad[1]);
    ctx.beginPath();
    ctx.moveTo(this.xTable[2],this.yTable[2]);
    ctx.moveTo(this.xTable[3],this.yTable[3]);
    ctx.closePath()
    ctx.restore();


    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rad[2]);
    ctx.beginPath();
    ctx.moveTo(this.xTable[4],this.yTable[4]);
    ctx.moveTo(this.xTable[5],this.yTable[5]);
    ctx.closePath()
    ctx.restore();

  }

}
