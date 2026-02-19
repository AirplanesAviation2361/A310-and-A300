(function () {

const size = 300;

/* ---------- CREATE CANVAS ---------- */

const canvas = document.createElement("canvas");
canvas.width = size;
canvas.height = size;

canvas.style = `
position: fixed;
bottom: 20px;
right: 340px;
background: black;
border: 2px solid #00ffff;
z-index: 9999;
`;

document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");


/* ---------- DRAW COMPASS ROSE ---------- */

function drawCompassRose(heading) {

    ctx.save();

    ctx.translate(size / 2, size / 2);
    ctx.rotate(-heading);

    ctx.strokeStyle = "#00ffff";
    ctx.lineWidth = 2;

    // outer circle
    ctx.beginPath();
    ctx.arc(0, 0, 120, 0, Math.PI * 2);
    ctx.stroke();

    // tick marks every 30°
    for (let i = 0; i < 360; i += 30) {
        const rad = i * Math.PI / 180;

        const x1 = Math.sin(rad) * 100;
        const y1 = -Math.cos(rad) * 100;

        const x2 = Math.sin(rad) * 120;
        const y2 = -Math.cos(rad) * 120;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    ctx.restore();
}


/* ---------- DRAW AIRCRAFT SYMBOL ---------- */

function drawAircraftSymbol() {

    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(size / 2 - 20, size / 2);
    ctx.lineTo(size / 2 + 20, size / 2);
    ctx.moveTo(size / 2, size / 2 - 20);
    ctx.lineTo(size / 2, size / 2 + 20);
    ctx.stroke();
}


/* ---------- DRAW TEXT INFO ---------- */

function drawInfo(speed, altitude) {

    ctx.fillStyle = "#00ffff";
    ctx.font = "16px monospace";

    ctx.fillText("SPD " + speed.toFixed(0), 10, 20);
    ctx.fillText("ALT " + altitude.toFixed(0), size - 100, 20);
}


/* ---------- MAIN DRAW LOOP ---------- */

function draw() {

    const v = geofs.animation.values;
    if (!v) return;

    const heading = v.heading || 0;
    const speed = v.kias || 0;
    const altitude = v.altitude || 0;

    ctx.clearRect(0, 0, size, size);

    drawCompassRose(heading * Math.PI / 180);
    drawAircraftSymbol();
    drawInfo(speed, altitude);
}

setInterval(draw, 50);

})();
