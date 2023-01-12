/// <reference path="../lib/microsoft/signalr/dist/browser/signalr.js" />
//Create Connection
var connectionUserCount = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Information)
    .withUrl("/Hubs/User", signalR.HttpTransportType.WebSocket).build();

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
    connectionUserCount.invoke("NewWindowsLoaded", "Amiri").then((value)=> console.log(value));
}

//start connection
function fullfilled() {
    //do something on start
    console.log("connection successfully stablished with server userHub");
    newWindowLoadedOnClient();
}
function rejected() {
    //rejected logs
    console.log("connection rejected from userHub!");
}

connectionUserCount.start().then(fullfilled, rejected);