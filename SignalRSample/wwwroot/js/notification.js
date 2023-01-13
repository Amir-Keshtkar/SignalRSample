/// <reference path="../lib/microsoft/signalr/dist/browser/signalr.js" />
//Create Connection
var connectionNotification = new signalR.HubConnectionBuilder()
    .withUrl("/Hubs/Notification").build();

var sendButton = document.getElementById("sendButton");
sendButton.disabled = true;

sendButton.addEventListener("click", function (event) {
    var message = document.getElementById("notificationInput");
    connectionNotification.send("SendMessage", message.value).then(function () {
        message.value = "";
    });
    event.preventDefault();
});

connectionNotification.on("LoadNotifications", (notifications, count) => {
    document.getElementById("messageList").innerHTML = "";
    var notificationCounter = document.getElementById("notificationCounter");
    notificationCounter.innerHTML = "<span>(" + count + ")</span>";

    for (var i = 0; i < notifications.length; i++) {
        var li = document.createElement("li");
        li.textContent = notifications[i];
        document.getElementById("messageList").appendChild(li);
    }
});


//start connection
function fullfilled() {
    sendButton.disabled = false;
    connectionNotification.send("LoadMessages");
    console.log("connection successfully stablished with server Notification Hub");
}
function rejected() {
    console.log("connection rejected from Notification hub!");
}

connectionNotification.start().then(fullfilled, rejected);