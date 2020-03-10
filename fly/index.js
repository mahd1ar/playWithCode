

let bgcolor = "#111"
let fgcolor;
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
    
    strokeWeight(4)
    stroke("#fff")
    point(x,y)
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
        
        let x = - this.w / 2 - map((mouseY - height / 2), 0, height / 2, -5, 5)
        let y = -this.h / 2 + map((mouseX - width / 2), 0, width / 2, -7, 7)
        radialGradient(
            x,
            y,
            this.w,
            this.h,
            fgcolor[this.color][0],
            fgcolor[this.color][1],

        )


        pop()

    }
}


function setup() {
    frameRate(24)
    createCanvas(innerWidth, innerHeight)
    fgcolor = [
        [color(249, 70, 101, 0.1), color(118, 25, 49, 1.9)],
        [color(41, 54, 195, 0.9), color(9, 22, 112, 1.9)],
        [color(56, 8, 90,0.6), color(143, 36, 205, 0.9)],
    ];
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {

            let wAndH = random(1, 100)
            let fb = new FlyingBox(random(0, width),
                random(height - 300, height - 200),
                wAndH,
                wAndH,
                (Math.random() * 1.5).toFixed(2),
                (Math.random() / 40).toFixed(3));

            flyboxArry.push(fb)
        }, 100 * i);
    }
}

function draw() {
    background(bgcolor);
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

