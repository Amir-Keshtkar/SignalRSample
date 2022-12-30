/// <reference path="../lib/microsoft/signalr/dist/browser/signalr.js" />
//Create Connection
var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/Hub/UserHub", signalR.HttpTransportType.WebSocket).build();

//Connect to methos that hub invokes aka receive notifications from hub
connectionUserCount.on("UpdateTotalViews", (value) => {
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerHTML = value.toString();
});
connectionUserCount.on("UpdateTotalUsers", (value) => {
    var newCountSpan = document.getElementById("totalUsersCounter");
    newCountSpan.innerHTML = value.toString();
});

//invoke hub methods aka send notification to hub
function newWindowLoadedOnClient() {
    connectionUserCount.send("NewWindowsLoaded");
}

//start connection
function fullfilled() {
    console.log("connection successfully stablished with server hub");
    newWindowLoadedOnClient();
}
function rejected() {
    console.log("connection rejected!");
}

connectionUserCount.start().then(fullfilled, rejected);