(function () {

const W = 320;
const H = 260;

/* ---------- CREATE ECAM SCREEN ---------- */

const canvas = document.createElement("canvas");
canvas.width = W;
canvas.height = H;

canvas.style = `
position: fixed;
bottom: 20px;
left: 50%;
transform: translateX(-50%);
background: black;
border: 2px solid #00ffff;
z-index: 9999;
`;

document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

/* ---------- PAGE STATE ---------- */

let page = "ENG"; // ENG, FUEL, WHEEL

document.addEventListener("keydown", (e) => {
    if (e.key === "1") page = "ENG";
    if (e.key === "2") page = "FUEL";
    if (e.key === "3") page = "WHEEL";
});

/* ---------- COLOR HELPERS ---------- */

function green() { ctx.fillStyle = "#00ff88"; }
function amber() { ctx.fillStyle = "#ffbf00"; }
function red() { ctx.fillStyle = "#ff4040"; }
function white() { ctx.fillStyle = "#ffffff"; }

/* ---------- WARNINGS FROM GEOFS ---------- */

function getWarnings(v) {

    const w = [];

    if (v.stallWarning) w.push({ t: "STALL", c: "red" });
    if (v.overSpeed) w.push({ t: "OVERSPEED", c: "amber" });

    if (v.terrainWarning) w.push({ t: "TERRAIN PULL UP", c: "red" });
    if (v.windShear) w.push({ t: "WINDSHEAR", c: "red" });

    if (v.engineFire1) w.push({ t: "ENG 1 FIRE", c: "red" });
    if (v.engineFire2) w.push({ t: "ENG 2 FIRE", c: "red" });

    return w;
}

/* ---------- DRAW ENGINE PAGE ---------- */

function drawENG(v) {

    white();
    ctx.fillText("ENGINE", 130, 20);

    const n1 = Math.round((v.rpm || 0) * 100);

    green();
    ctx.fillText("N1  " + n1 + "%", 40, 80);
    ctx.fillText("N1  " + n1 + "%", 200, 80);

    const egt = Math.round(n1 * 6);

    green();
    ctx.fillText("EGT " + egt + "°C", 40, 120);
    ctx.fillText("EGT " + egt + "°C", 200, 120);
}

/* ---------- DRAW FUEL PAGE ---------- */

function drawFUEL(v) {

    white();
    ctx.fillText("FUEL", 140, 20);

    const fuel = Math.round((v.fuel || 0) * 100);

    green();
    ctx.fillText("TOTAL " + fuel + "%", 100, 100);
}

/* ---------- DRAW WHEEL PAGE ---------- */

function drawWHEEL(v) {

    white();
    ctx.fillText("WHEEL", 135, 20);

    const flaps = Math.round((v.flaps || 0) * 100);
    const gear = geofs.aircraft.instance.groundContact ? "DOWN" : "UP";

    green();
    ctx.fillText("FLAPS " + flaps + "%", 90, 90);

    green();
    ctx.fillText("GEAR " + gear, 110, 130);
}

/* ---------- DRAW WARNINGS ---------- */

function drawWarnings(warnings) {

    let y = H - 60;

    warnings.forEach(w => {

        if (w.c === "red") red();
        else if (w.c === "amber") amber();
        else green();

        ctx.fillText(w.t, 20, y);
        y -= 18;
    });
}

/* ---------- MAIN DRAW LOOP ---------- */

function draw() {

    const v = geofs.animation.values;
    if (!v) return;

    ctx.clearRect(0, 0, W, H);

    ctx.font = "16px monospace";

    /* Page rendering */
    if (page === "ENG") drawENG(v);
    if (page === "FUEL") drawFUEL(v);
    if (page === "WHEEL") drawWHEEL(v);

    /* Warnings */
    const warnings = getWarnings(v);
    drawWarnings(warnings);
}

setInterval(draw, 100);

})();
