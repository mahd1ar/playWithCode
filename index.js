let gravx = 'begin'
let gravy = 'begin'
let gravz = 'begin'

let bgcolor = "#fff"
let fgcolor = ["#cdfaf6", '#ebd9fd', '#ffeab8', '#ffe0ef']

if (window.DeviceMotionEvent == undefined) {
    //No accelerometer is present. Use buttons. 
    ab = "NO";

}
else {
    window.addEventListener("devicemotion", accelerometerUpdate, true);
}



function accelerometerUpdate(event) {
    var aX = event.accelerationIncludingGravity.x * 10;
    var aY = event.accelerationIncludingGravity.y * 10;
    var aZ = event.accelerationIncludingGravity.z * 10;


    // return Math.floor(aZ)
    gravx = Math.floor(aX);
    gravy = Math.floor(aY);
    gravz = Math.floor(aZ);
}



var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;


var engine;
var world;
var bodies;
let boxes = [];
let graound;

class Box {
    constructor(x, y, w, h) {
        this.w = w
        this.h = h
        this.body = Bodies.rectangle(x, y, w, h, { friction: 0.05, restitution: 0.8 })
        this.color = fgcolor[Math.floor(random(0, 4))]
        
        World.add(world, this.body)
    }

    show() {
        let pos = this.body.position;
        let angle = this.body.angle;

        push()
        translate(pos.x, pos.y)
        rotate(angle*PI/180)
        fill(this.color);
        rect(0, 0, this.w, this.h)
        pop()
    }
}

function setup() {
    canvas = createCanvas(innerWidth, innerHeight);


    // create an engine
    engine = Engine.create();
    world = engine.world;
if(window.navigator.platform.match(/win/i)== null){
console.log(999)
    setInterval(() => {
        world.gravity.y = map(gravy, -90, 90, -1, 1)
        world.gravity.x = map(gravx, 70, -70, -1, 1)
    }, 20);
}
 

Engine.run(engine);


    ground = Bodies.rectangle(width / 2, height, width, 40, { isStatic: true })
    World.add(world, ground)
    ground = Bodies.rectangle(width / 2, -40, width, 40, { isStatic: true })
    World.add(world, ground)
    ground = Bodies.rectangle(-40, height / 2, 40, height, { isStatic: true })
    World.add(world, ground)
    ground = Bodies.rectangle(width, height / 2, 40, height, { isStatic: true })
    World.add(world, ground)

}

function draw() {
    background(bgcolor);
    stroke(255);
    boxes.forEach(e => {
        e.show()
    })
    textSize(32);
    fill(179)
    text(gravx, 10, 30);
    text(gravy, 10, 60);
    text(gravz, 10, 90);

}

function mouseDragged() {
    boxes.push(new Box(mouseX, mouseY, 30, 30))
}