javascript:(function(){

if(!window.geofs || !geofs.aircraft || !geofs.aircraft.instance){
    alert("Load aircraft first");
    return;
}

const TYPE = geofs.aircraft.instance.aircraftRecord.name.includes("310")
    ? "A310" : "A300";

console.log("Airbus Study Systems Loaded:", TYPE);

/* Wind noise */
const wind = new Audio("wind.mp3");
wind.loop = true;
wind.volume = 0;
wind.play().catch(()=>{});

/* Ground rumble */
const rumble = new Audio("rumble.mp3");
rumble.loop = true;
rumble.volume = 0;
rumble.play().catch(()=>{});

let lastGround = false;

setInterval(()=>{

    const v = geofs.animation.values;
    const speed = v.kias || 0;
    const alt = v.altitude || 0;
    const rpm = v.rpm || 0;
    const onGround = geofs.aircraft.instance.groundContact;

    /* Wind volume */
    wind.volume = Math.min(speed / 250, 1);

    /* Ground rumble */
    rumble.volume = onGround && speed > 20 ? 0.6 : 0;

    /* Engine spool realism */
    const spool = TYPE === "A300"
        ? Math.pow(rpm,1.35)
        : Math.pow(rpm,1.22);

    /* Simple stall warning */
    if(speed < 115 && alt < 1500){
        console.log("STALL WARNING");
    }

    /* Touchdown detection */
    if(!lastGround && onGround){
        const cr = Math.abs(v.climbrate||0);
        if(cr > 700){
            console.log("HARD LANDING");
        }
    }

    lastGround = onGround;

},100);

})();
