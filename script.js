let canvas = document.getElementById("myCanvas")
let ctx = canvas.getContext("2d")

let gameOn = true;

let playerSpeed = 2;

class Box{
    constructor(size, color){
        this.size = size;
        this.color = color;
        this.x = 0;
        this.y = 0;
    }
}

class Player extends Box{
    constructor(){
        super(50, "blue"); //calls the parent's constructor method
        this.x = 0;
        this.y = 225;
        this.speed = 0;
    }

    move(){
            this.x+=this.speed;
    }
}

class Enemy extends Box{
    constructor(speed){
        super(50, "red");
        this.speed = speed;
    }

    move(){
        this.y+=this.speed;
        //bounce back from the walls
        if(this.y+this.size>500){
            //reverse the speed
            this.speed = -(Math.abs(this.speed));
        }
        if(this.y<0){
            this.speed = Math.abs(this.speed);
        }
    }
}

let player = new Player();
let e1 = new Enemy(4);
let e2 = new Enemy(8);
let e3 = new Enemy(12);
e1.x=100;
e2.x=233;
e3.x=366;

function isCollided(box1, box2){
    if(Math.abs(box1.x - box2.x) <= 50 && Math.abs(box1.y - box2.y) <= 50){
        return true;
    }
    else{
        return false;
    }
}

function drawBox(box){
    ctx.fillStyle = box.color;
    ctx.fillRect(box.x, box.y, box.size, box.size);
}

canvas.addEventListener('mousedown', ()=>{
    // console.log("mousedown");
    player.speed = playerSpeed;
});

canvas.addEventListener('mouseup', ()=>{
    // console.log("mouseup");
    player.speed = 0;
});

function gameLoop(){
    if(!gameOn){
        return;
    }
    ctx.clearRect(0, 0, 500, 500);
    e1.move();
    e2.move();
    e3.move();
    player.move();
    drawBox(player);
    drawBox(e1);
    drawBox(e2);
    drawBox(e3);
    window.requestAnimationFrame(gameLoop);
    if(isCollided(e1, player) || isCollided(e2, player) || isCollided(e3, player)){
        gameOn = false;
        window.alert("Game Over");
    }
}

gameLoop();