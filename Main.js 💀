(function(){

if(!window.geofs || !geofs.aircraft || !geofs.aircraft.instance){
    console.warn("GeoFS not ready.");
    return;
}

console.log("✈ Airbus Study-Level Main Initializing...");

/* ---------------- DETECT AIRCRAFT ---------------- */

const aircraftName = geofs.aircraft.instance.aircraftRecord.name.toLowerCase();
const TYPE = aircraftName.includes("310") ? "A310" : "A300";

console.log("Detected:", TYPE);

/* ---------------- GLOBAL STATE ---------------- */

const Airbus = {
    type: TYPE,
    config: {},
    systems: {},
    ui: {},
    sounds: {}
};

/* ---------------- CONFIG LOAD ---------------- */

Airbus.config = TYPE === "A310" ? {
    mass: 142000,
    stallSpeed: 118,
    spoolFactor: 1.22
} : {
    mass: 165000,
    stallSpeed: 120,
    spoolFactor: 1.35
};

/* ---------------- INIT FUNCTIONS ---------------- */

function initSounds(){
    console.log("Initializing sounds...");
    Airbus.sounds.wind = new Audio("wind.mp3");
    Airbus.sounds.wind.loop = true;
    Airbus.sounds.wind.volume = 0;
    Airbus.sounds.wind.play().catch(()=>{});
}

function initUI(){
    console.log("Initializing cockpit UI...");
    const panel = document.createElement("div");
    panel.id = "airbus-status";
    panel.style = `
        position:fixed;
        bottom:10px;
        left:10px;
        background:black;
        color:#00ffff;
        padding:8px;
        font-family:monospace;
        font-size:12px;
        z-index:9999;
    `;
    panel.innerHTML = "Airbus Systems Ready";
    document.body.appendChild(panel);
    Airbus.ui.panel = panel;
}

function initSystems(){
    console.log("Initializing systems...");
    Airbus.systems.lastGround = false;
}

/* ---------------- UPDATE LOOP ---------------- */

function update(){

    const v = geofs.animation.values;
    if(!v) return;

    const speed = v.kias || 0;
    const alt = v.altitude || 0;
    const rpm = v.rpm || 0;
    const onGround = geofs.aircraft.instance.groundContact;

    /* Wind noise */
    Airbus.sounds.wind.volume = Math.min(speed / 250, 1);

    /* Engine spool simulation */
    const spool = Math.pow(rpm, Airbus.config.spoolFactor);

    /* Stall detection */
    if(speed < Airbus.config.stallSpeed && alt < 1500){
        Airbus.ui.panel.innerHTML = "⚠ STALL WARNING";
    } else {
        Airbus.ui.panel.innerHTML = TYPE + " | SPD: " + speed.toFixed(0);
    }

    /* Touchdown detection */
    if(!Airbus.systems.lastGround && onGround){
        const cr = Math.abs(v.climbrate || 0);
        if(cr > 700){
            console.log("Hard landing detected.");
        }
    }

    Airbus.systems.lastGround = onGround;
}

/* ---------------- START SYSTEM ---------------- */

initSounds();
initUI();
initSystems();

setInterval(update, 100);

console.log("✈ Airbus Study-Level System Active");

})();
