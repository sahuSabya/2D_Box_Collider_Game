let canvas = document.getElementById("myCanvas")
let ctx = canvas.getContext("2d")

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
let e1 = new Enemy(1);
let e2 = new Enemy(2);
e1.x=120;
e2.x=240;

function drawBox(box){
    ctx.fillStyle = box.color;
    ctx.fillRect(box.x, box.y, box.size, box.size);
}

drawBox(player);
drawBox(e1);
drawBox(e2);

// setInterval(()=>{
//     ctx.clearRect(0, 0, 500, 500);
//     e1.y += e1.speed;
//     e2.y += e2.speed;
//     drawBox(e1);
//     drawBox(e2);
// }, 200);

//for smooth animation update
function updateGame(){
    window.requestAnimationFrame(()=>{
        ctx.clearRect(0, 0, 500, 500);
        e1.move();
        e2.move();
        drawBox(e1);
        drawBox(e2);
        updateGame();
    });
}

updateGame();