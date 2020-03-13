const X_AXIS = 1
const Y_AXIS = 2

let bgcolor = "#0a0026"
let fgcolor;
let b1
let b2


function randomint(min, max) {
    return Math.floor(Math.random() * max) + min
}
function radialGradient(x, y, w, h, inner, outer) {
    noStroke();
    for (let i = Math.max(w, h); i > 0; i--) {
        const step = i / Math.max(w, h);
        const colour = lerpColor(inner, outer, step);
        fill(colour);
        ellipse(x, y, step * w, step * h);
    }

    strokeWeight(3)
    stroke("#fff")
    // image(bluebeam, x,y,50,100 );
    point(x, y)
}

flyboxArry = [];
class FlyingBox {
    constructor(x, y, w, h, yRatio, angleRatio) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.yRatio = yRatio;
        this.angleRatio = angleRatio;
        this.color = randomint(0, fgcolor.length)
        // this.angel = (2 * 3.14) / Math.ceil(Math.random()*10)
        this.angel = 1//(2 * 3.14) / Math.ceil(Math.random()*10)
    }
    draw() {
        this.angel += +this.angleRatio;
        this.y -= +this.yRatio;

        push()

        fill(170);
        strokeWeight(10);
        translate(this.x, this.y);

        rotate(this.angel)

        strokeWeight(1);

        let x = - this.w / 2 - map((mouseY - height / 2), 0, height / 2, -3, 3)
        let y = -this.h / 2 + map((mouseX - width / 2), 0, width / 2, -3, 3)
        radialGradient(
            x,
            y,
            this.w,
            this.h,
            fgcolor[this.color][0],
            fgcolor[this.color][1],
        )
        pop()
        // console.log(flyboxArry[0].y)

        if (this.y < -10) {
            this.remove()
        }

    }
    remove() {
        flyboxArry.splice(flyboxArry.indexOf(this), 1)
        console.log(flyboxArry.length)
    }
}

function preload() {
    // window.bluebeam = loadImage('./beam.svg');
}

function setup() {
    angleMode(DEGREES);
    frameRate(24)
    b1 = color(48,60,184);
    b2 = color(1,17,28);
    
   var canvas =  createCanvas(innerWidth, innerHeight)

    fgcolor = [
        [color(249, 70, 101, 0.1), color(118, 25, 49, 1.9)],
        [color(41, 54, 195, 0.9), color(9, 22, 112, 1.9)],
        [color(175, 61, 255, 2), color(175, 61, 255, 0.2)],
    ];
    for (let i = 0; i < 70; i++) {
        setTimeout(() => {

            let wAndH = random(10, 40)
            let fb = new FlyingBox(random(0, width),
                random(height, height - 550),
                wAndH,
                wAndH,
                (Math.random() * 1.5).toFixed(2),
                (Math.random() / 40).toFixed(3));

            flyboxArry.push(fb)
        }, 100 * i);
    }
}

function draw() {
    clear()
    background(`rgba(1,1,1,0)`);
    // background(0)
    // setGradient(0, 0,  height,width , b2, b1, X_AXIS);
    flyboxArry.forEach(element => {
        element.draw();
    });
    
    push();
    textSize(15)
    textAlign(LEFT, BOTTOM);
    fill(120)
    text("created by mahdiyar anari", 0, height - 7);
    pop();
    
}

