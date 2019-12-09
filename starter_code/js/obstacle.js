class Obstacle {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = 50;
    this.height = 400;

    this.gameWidth = width;
    this.gameHeight = height;

    this.imgB = new Image();
    this.imgB.src = "./images/obstacle_bottom.png"
    this.imgT = new Image();
    this.imgT.src = "./images/obstacle_top.png"

    this.posY = Math.floor(Math.random() * 320) - 380 //-100;//max 200 //random between -300 and 320
    this.posX = 450;
    this.vx = 2;
  }

  draw() {
    this.ctx.drawImage(this.imgT, this.posX, this.posY, this.width, this.height);
    this.ctx.drawImage(this.imgB, this.posX, this.posY + 550, this.width, this.height);
    //console.log("drawing obstacle")
  }

  move() {
   this.posX -= this.vx;
  }
}