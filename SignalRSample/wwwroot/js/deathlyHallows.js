/// <reference path="../lib/microsoft/signalr/dist/browser/signalr.js" />
//Create Connection
var connectionDeathlyHallows = new signalR.HubConnectionBuilder()
    .withUrl("/Hubs/DeathlyHallows").build();

var cloakCount = document.getElementById("cloakCounter");
var stoneCount = document.getElementById("stoneCounter");
var wandCount = document.getElementById("wandCounter");

//Connect to methos that hub invokes aka receive notifications from hub
connectionDeathlyHallows.on("UpdateDeathlyHallowsCount", (cloak, stone, wand) => {
    cloakCount.innerHTML = cloak.toString();
    stoneCount.innerHTML = stone.toString();
    wandCount.innerHTML = wand.toString();
});

//invoke hub methods aka send notification to hub

//start connection
function fullfilled() {
    connectionDeathlyHallows.invoke("GetStatucRace").then((raceCounter) => {
        cloakCount.innerHTML = raceCounter.cloak.toString();
        stoneCount.innerHTML = raceCounter.stone.toString();
        wandCount.innerHTML = raceCounter.wand.toString();
    });
    console.log("connection successfully stablished with server DeathlyHallowsHub");
}
function rejected() {
    console.log("connection rejected from DeathlyHallows hub!");
}

connectionDeathlyHallows.start().then(fullfilled, rejected);