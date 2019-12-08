class Obstacle {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = 50;
    this.height = 300;

    this.gameWidth = width;
    this.gameHeight = height;

    this.imgB = new Image();
    this.imgB.src = "./images/obstacle_bottom.png"
    this.imgT = new Image();
    this.imgT.src = "./images/obstacle_top.png"

    this.posY = Math.floor(Math.random() * 320) - 300 //-100;//max 200
    this.posX = 450;
    this.vx = 2;
  }

  draw() {
    this.ctx.drawImage(this.imgT, this.posX, this.posY, this.width, this.height);
    this.ctx.drawImage(this.imgB, this.posX, this.posY + 450, this.width, this.height + 100);
    //console.log("drawing obstacle")
  }

  move() {
   this.posX -= this.vx;
  }
}