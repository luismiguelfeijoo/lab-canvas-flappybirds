class Player {
  constructor(ctx, fps/*speedX, speedY, gravitySpeed*/) {
    this.ctx = ctx;
    
    this.width = 49.8;
    this.height = 35.1;

    this.image = new Image();
    this.image.src = "./images/flappy.png";

    //this.speedX = 0;
    //this.speedY = 0;
    this.fps = fps
    this.gravity = 30/fps;
    this.vy = 0;

    this.posX = 100;
    this.posY = 180;
    this.posY0 = 490 - this.height;

    this.setListeners();
  }

  draw(framesCounter) {
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }

  move() {
    
    if(this.posY <= this.posY0) {
      if (this.vy < 10) { // to set max Y velocity
        this.vy += this.gravity
      }
      this.posY += this.vy;
      //this.vy += this.gravity;
      //console.log(this.posY,this.vy,this.gravity)
    } else {
      this.posY = 504 - this.height;
    }
  };

  /*
  newPos() {
    if (this.posY > 0) {
        this.posY += this.vy;
        console.log(this.vy)
    }
    
  }
  */

  setListeners() {
      document.addEventListener("keydown", (e) => {
        if (e.keyCode === 32) {
          this.vy = -10;
          //this.posY -= 20;
        }
      }) 
  }
}
