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

    over: false,
    request: 0,

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
        let count = 2.7;
        function refresh(timestamp) {
            delta = timestamp - past;
            past = timestamp;
            fps = 1000/delta;
            Game.clear();
            Game.drawAll();
            Game.moveAll();
            let secondsCounter = Math.floor(timestamp/2000)
            if (secondsCounter === proof + 1) {Game.generateObstacles()}
            if ((timestamp/2000) >= count) {
                Game.score ++;
                count += 1;
            }
            proof = secondsCounter;
            //if (Math.floor(timestamp % 10) === 0) {Game.generateObstacles()}
            Game.clearObstacles();
            if(Game.isCollision()) {Game.gameOver()};
            if (!Game.over) {window.requestAnimationFrame(refresh)}
        }
        //recordar borrar los obstaculos 
        this.request = window.requestAnimationFrame(refresh);
        this.reset(); //como usar los fps?
    },

    reset: function(fps){
        console.log()
        this.background = new Background(this.ctx,this.width*2,this.height);
        this.player = new Player(this.ctx,Game.fps) //added game fps
        this.obstacles = [];
        ScoreBoard.init(this.ctx, this.score)
    },

    clear: function() {
        this.ctx.clearRect(0,0,this.width,this.height);
    },

    drawAll: function() {
        this.background.draw();
        this.player.draw(/*this.framesCounter*/)
        this.obstacles.forEach(obstacle => obstacle.draw())
        ScoreBoard.draw(this.score)
    },

    moveAll: function() {
        this.background.move();
        this.player.move();
        this.obstacles.forEach(obstacle => obstacle.move())
    },

    generateObstacles: function() {
        this.obstacles.push(new Obstacle(this.ctx, this.width, this.height))
    },

    clearObstacles: function() {
        this.obstacles = this.obstacles.filter(obstacle => (obstacle.posX >= -50))
    },

    isCollision: function() {
       // return this.obstacles.some(obs => (this.player.posX + this.player.width > obs.posX && obs.posX + obs.width > this.player.posX ))
        if (this.player.posY  + this.player.height >= 504) {this.gameOver()}
        return this.obstacles.some(obs => (this.player.posX + this.player.width > obs.posX && obs.posX + obs.width > this.player.posX && (this.player.posY + this.player.height > obs.posY + 550 || this.player.posY < obs.posY + 400 )))
    },

    gameOver: function() {
        //console.log("over")
        this.over = true;
        //window.cancelAnimationFrame(Game.request);
    }
}

