javascript:(async function () {

const base = "https://raw.githubusercontent.com/AirplanesAviation2361/A310-and-A300/main/";

async function load(file) {
    return new Promise((resolve) => {
        const s = document.createElement("script");
        s.src = base + file;
        s.onload = resolve;
        document.body.appendChild(s);
    });
}

if (!window.geofs?.aircraft?.instance) {
    alert("Load into GeoFS first.");
    return;
}

console.log("✈ Installing Airbus Study Pack...");

await load("main.js");

console.log(" Airbus Study Pack Loaded");

})();
