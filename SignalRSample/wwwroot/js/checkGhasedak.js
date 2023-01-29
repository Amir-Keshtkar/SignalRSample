/// <reference path="../lib/microsoft/signalr/dist/browser/signalr.js" />
//Create Connection

//var connectioncGhasedak = new signalR.HubConnectionBuilder()
//    .withUrl("http://localhost:5015/notificationhub").build();

//http://192.168.1.177:8080/Notification/
var connectioncGhasedak = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5015/Notification/"
        , { withCredentials: false }
    )
    .build();


//start connection
function fullfilled() {
    console.log("connection successfully stablished with Ghasedak Hub");
    /*connectioncGhasedak.send();*/

    connectioncGhasedak.invoke('SeenNotifications', [6]).then((value) => {
        console.log("seen notif: " + value);
    });;

    console.log("Vola!");

    //connectioncGhasedak.invoke("LoadNotifications").then((value) => {
    //    console.log("value is: " + value);
    //});
}
function rejected() {
    console.log("connection rejected from Ghasedak hub!");
}

connectioncGhasedak.start().then(fullfilled, rejected);