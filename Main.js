(function () {

if (!window.geofs?.aircraft?.instance) {
    console.warn("Load aircraft first.");
    return;
}

const name = geofs.aircraft.instance.aircraftRecord.name.toLowerCase();
const TYPE = name.includes("310") ? "A310" : "A300";

console.log("✈ Airbus Study Pack Loaded:", TYPE);

/* GLOBAL AIRBUS OBJECT */
window.Airbus = {
    type: TYPE,
    config: null,
    systems: {},
    ui: {}
};

/* LOAD CONFIG */
Airbus.config = TYPE === "A310"
? { stall:118, spool:1.22 }
: { stall:120, spool:1.35 };

/* -------- INITIALIZERS -------- */

function initSounds() {
    Airbus.systems.wind = new Audio("assets/sounds/wind.mp3");
    Airbus.systems.wind.loop = true;
    Airbus.systems.wind.volume = 0;
    Airbus.systems.wind.play().catch(()=>{});
}

function initCockpit() {
    const box = document.createElement("div");
    box.style = `
        position:fixed;
        bottom:12px; left:12px;
        background:#000; color:#0ff;
        padding:10px; font-family:monospace;
        z-index:9999; border:1px solid #0ff;
    `;
    document.body.appendChild(box);
    Airbus.ui.box = box;
}

function initState() {
    Airbus.systems.lastGround = false;
}

/* -------- UPDATE LOOP -------- */

function update() {

    const v = geofs.animation.values;
    if (!v) return;

    const spd = v.kias || 0;
    const alt = v.altitude || 0;
    const rpm = v.rpm || 0;
    const ground = geofs.aircraft.instance.groundContact;

    /* WIND SOUND */
    Airbus.systems.wind.volume = Math.min(spd / 250, 1);

    /* ENGINE SPOOL */
    const spool = Math.pow(rpm, Airbus.config.spool);

    /* STALL WARNING */
    if (spd < Airbus.config.stall && alt < 1500) {
        Airbus.ui.box.innerHTML = "⚠ STALL";
    } else {
        Airbus.ui.box.innerHTML =
            TYPE + " | SPD " + spd.toFixed(0) +
            " | ALT " + alt.toFixed(0);
    }

    /* TOUCHDOWN */
    if (!Airbus.systems.lastGround && ground) {
        const cr = Math.abs(v.climbrate || 0);
        if (cr > 700) console.log("Hard landing");
    }

    Airbus.systems.lastGround = ground;
}

/* -------- START -------- */

initSounds();
initCockpit();
initState();
setInterval(update, 100);

})();
