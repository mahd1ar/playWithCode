// p5.disableFriendlyErrors = false;
let canvas_width = innerWidth
let canvas_hieght = innerHeight
function preload() {

}

function setup() {
    // frameRate(15)
    createCanvas(canvas_width, canvas_hieght);
    angleMode(DEGREES);

}

function draw() {
    // translate(mouseX-750, mouseY-450)
    background('rgba(14,21,58,0.1)');
    noStroke();
    translate(canvas_width / 2, canvas_hieght / 2);



    stars && stars.forEach(e => {
        e.show()
    })
}

let stars = [];

class star {
    constructor() {
        this.x = Math.random() * canvas_width - (canvas_width / 2);
        this.y = Math.random() * innerHeight - (canvas_hieght / 2);
        this.radius = 2;
    }

    show() {
        fill(255)

        // rotate(millis()/6000);
        rotate(millis() / 8000);
        ellipse(this.x, this.y, this.radius)
    }


}

for (let i = 0; i < 110; i++) {
    let x = new star();
    stars.push(x)
}