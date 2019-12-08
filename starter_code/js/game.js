const Game = {
    canvas: undefined,
    ctx: undefined, //cambiar request animation frame
    width: undefined,
    height: undefined,
    framesCounter:0,
    playerKeys:{
        SPACE: 32
    },
    score:0,
    fps: 60,

    init: function(){
        this.canvas = document.getElementById('game-board');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.getAttribute("width");
        this.height = this.canvas.getAttribute("height");
        this.start()
    },

    start: function(){
        let past = 0;
        let delta = 0;
        let fps = 0;
        let proof = -100;
        function refresh(timestamp) {
            delta = timestamp - past;
            past = timestamp;
            fps = 1000/delta;
            //console.log(fps)
            //Game.fps = 1000/delta
            Game.clear();
            Game.drawAll();
            Game.moveAll();
            let secondsCounter = Math.floor(timestamp/2000)
            if (secondsCounter === proof + 1) {Game.generateObstacles()}
            proof = secondsCounter;
            //console.log(Math.floor(timestamp/2000) )
            //if (Math.floor(timestamp % 10) === 0) {Game.generateObstacles()}
            Game.clearObstacles();
            window.requestAnimationFrame(refresh)
        }
        //recordar borrar los obstaculos 
        window.requestAnimationFrame(refresh);
        this.reset(); //como usar los fps?
    },

    reset: function(fps){
        console.log()
        this.background = new Background(this.ctx,this.width*2,this.height);
        this.player = new Player(this.ctx,Game.fps) //added game fps
        this.obstacles = [];
        //scoreBoard.init()
    },

    clear: function() {
        this.ctx.clearRect(0,0,this.width,this.height);
    },

    drawAll: function() {
        this.background.draw();
        this.player.draw(/*this.framesCounter*/)
        this.obstacles.forEach(obstacle => obstacle.draw())
        //ScoreBoard.init(this.ctx,this.score);
    },

    moveAll: function() {
        this.background.move();
        this.player.move();
        this.obstacles.forEach(obstacle => obstacle.move())
    },

    generateObstacles: function() {
        this.obstacles.push(new Obstacle(this.ctx, this.width, this.height))
        console.log("generating")
    },

    clearObstacles: function() {
        this.obstacles = this.obstacles.filter(obstacle => (obstacle.posX >= -50))
      }
}

