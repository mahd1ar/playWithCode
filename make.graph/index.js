let pg, canvas_WIDTH = innerWidth, canvas_HEIGHT = innerHeight;

let canvasCenter = { cx: canvas_WIDTH / 2, cy: canvas_HEIGHT / 2 }
let off_X = off_Y = null;
let fx = 'sin(x)*3', startx = 0
let prv_val, prv_n_val = null

$('#submit').click(function (e) {
    e.preventDefault();
    let val = $('input').val()

    fx = val.replace(/(\d+)(x|\(.*\))/gi, '$1*$2')
    console.log(fx)
    fx = fx.replace(/(\(.*\))?(x)?(\d{0,})?\^(\d{1,})/gi, 'pow($1$2$3,$4)')
    fx = fx.replace('X', 'x')
    console.log(fx)


    canvas_reset()
});

// $("#input").keypress(function (e) {
// if (e.key.match(/[a-wyzA-WYZ]/g)) {
//     Toastify({
//         text: "از این کاراکتر نمیتوان استفاده کرد",
//         duration: 3000,
//         destination: "https://github.com/apvarun/toastify-js",
//         newWindow: true,
//         close: true,
//         gravity: "top", // `top` or `bottom`
//         position: 'left', // `left`, `center` or `right`

//         backgroundColor: "linear-gradient(to right, ##FF5F6D, ##FFC371)",
//         stopOnFocus: true, // Prevents dismissing of toast on hover
//         // onClick: function(){} // Callback after click
//     }).showToast();
//     e.preventDefault()

//     return 1;
// }

// });



function canvas_reset() {
    prv_val = prv_n_val = null;
    startx = 0.01;
    pg.background(255);
    setup()
    canvasCenter = { cx: canvas_WIDTH / 2, cy: canvas_HEIGHT / 2 }
    loop()

}

function setup() {
    frameRate(60)
    let canvas = createCanvas(canvas_WIDTH, canvas_HEIGHT);

    // grid
    stroke('#eee')
    for (let i = innerWidth / 2; i < innerWidth; i += 20) {
        line(i, 0, i, innerHeight)
        line(innerWidth - i, 0, innerWidth - i, innerHeight)

    }
    for (let j = innerHeight / 2; j < innerHeight; j += 20) {
        line(0, j, innerWidth, j)
        line(0, innerHeight - j, innerWidth, innerHeight - j)
    }
    pg = createGraphics(canvas_WIDTH, canvas_HEIGHT)
}


function draw() {
    let { cx, cy } = canvasCenter;

    translate(cx, cy);

    pg.push()
    pg.translate(cx, cy)
    //  R, G, B 
    //33, 230, 193 ===> 39, 142, 165
    pg.stroke(
        map(prv_val && prv_val.x || startx, 0, cx, 100, 250),
        map(prv_val && prv_val.y || startx, 0, cy, 100, 250),
        map(startx, 0, cx, 200, 110),
    );



    pg.strokeWeight(1);

    let start_nx = -startx
    // +
    pg.beginShape()
    let v;
    try {
        v = createVector(startx * 20, -eval(fx.replace(/x/gi, startx)) * 20)
    } catch (error) {
        Toastify({
            text: error,
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: 'left', // `left`, `center` or `right`
            backgroundColor: "linear-gradient(to right, ##FF5F6D, ##FFC371)",
            stopOnFocus: true, // Prevents dismissing of toast on hover
        }).showToast();

        noLoop()

    }
    prv_val && pg.vertex(prv_val.x, prv_val.y)
    prv_val = v
    pg.vertex(prv_val.x, prv_val.y)
    pg.endShape()

    // -
    pg.beginShape()
    let nv = createVector(start_nx * 20, -eval(fx.replace(/x/g, start_nx)) * 20)
    prv_n_val && pg.vertex(prv_n_val.x, prv_n_val.y)
    prv_n_val = nv
    pg.vertex(prv_n_val.x, prv_n_val.y)
    pg.endShape()

    pg.pop()

    image(pg, -cx, -cy)

    // console.log(v.y)
    if ((-cy > v.y || v.y > cy || -cx > v.x || v.x > cx) && (-cy > nv.y || nv.y > cy || -cx > nv.x || nv.x > cx)) {
        noLoop()
    } else {

        startx += 0.2
    }

    stroke('#278ea5');
    line(-cx, 0, cx, 0);
    line(0, -cy, 0, cy);
}

// function mouseDragged() {
//     if (!off_X && !off_Y) {
//         off_X = -canvasCenter.cx + mouseX;
//         off_Y = -canvasCenter.cy + mouseY;
//     }

//     canvasCenter.cx = mouseX - off_X;
//     canvasCenter.cy = mouseY - off_Y;
// }


// function mouseReleased() {
//     off_X = off_Y = null
// }

