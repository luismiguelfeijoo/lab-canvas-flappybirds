class Player {
  constructor(ctx /*speedX, speedY, gravitySpeed*/) {
    this.ctx = ctx;
    this.width = 49.8;
    this.height = 35.1;
    this.image = new Image();
    this.image.src = "./images/flappy.png";
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = -0.9;
    this.posX = 100;
    this.posY = 180;
    //this.gravitySpeed = 1
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
    //this.gravitySpeed = this.gravity
    
    this.gravity ++;
    
    this.newPos();
    console.log("movePlayer")
  };

  newPos() {
    if (this.posY > 0) {
        this.posY -= this.gravity;
    }
    
  }

  setListeners() {
      document.addEventListener("keydown", (e) => {
        if (e.keyCode === 32) {
            this.move()
            console.log("hola")
        }
      }) 
      console.log("setlist")
  }
}
