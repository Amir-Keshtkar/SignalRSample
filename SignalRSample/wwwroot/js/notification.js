/// <reference path="../lib/microsoft/signalr/dist/browser/signalr.js" />
//Create Connection
//var connectionNotification = new signalR.HubConnectionBuilder()
//    .withUrl("/Hubs/Notification").build();

var connectionNotification = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5015/Notification",
        {
            withCredentials: false,
            accessTokenFactory: () => "eyJhbGciOiJSUzI1NiIsImtpZCI6IkYyMTA0QUIwODJBN0I1NzJGNDIyQzg5QzM1MkY2ODE4IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2NzUwMDExMjEsImV4cCI6MTY3NTAwNDcyMSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAxIiwiY2xpZW50X2lkIjoiY29udGFjdCIsInN1YiI6IjMiLCJhdXRoX3RpbWUiOjE2NzUwMDExMjAsImlkcCI6ImxvY2FsIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIzIiwicm9sZVR5cGUiOiJVc2VyIiwianRpIjoiODAzMjc0RDgzMTE1NzlCRjY2RDEwMEZDNTRFMDcyQjAiLCJpYXQiOjE2NzUwMDExMjEsInNjb3BlIjpbIm9wZW5pZCIsInJvbGVzIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbImN1c3RvbSJdfQ.NaP4MxCaxtGk4NUZyrmRd-j6D9oVhtmTILKwEVdVfXAn5KCYG33mOITs8-nXtL_GNcEkBFP91IaQ7FVAK6utVhyu3aVnnN11YeEu_-_siQ8PASzdoHtuXTL7G7Rms0LMPDo4pNnTC9XOsxhjr2L_bEBpzB-RgJmBxKgsL4WfjdVO_8ruegh_t3ec22DTTc1jsCWMyKsKRNxVNEqFlAXJFa7hzu1Nakn6r54-sMqdAeV0C0_BOiIc_JQQNz-Db4a4e32wNuSnEcKMGTAeWUL_NsPWHmZWz0OMggGcWM4zR6P3JczyTrXbqfkQ2mMUCNlBZtQTHMSBiL4mUSWTY3LEcg"
        })
    .build();

//var connectionNotification = new signalR.HubConnectionBuilder()
//    .withUrl("http://178.216.249.108:8015/Notification/", options => {
//        withCredentials = false;
//        //accessTokenFactory = () => "eyJhbGciOiJSUzI1NiIsImtpZCI6IjVEMssssjc0OTY1RDc4QUJDMkM2NURFNkZCNkQ1NjE1NzlGIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2NzQ5OTgyMjIsImV4cCI6MTY3NTAwMTgyMiwiaXNzIjoiaHR0cDovLzE3OC4yMTYuMjQ5LjEwODo4MDAwIiwiY2xpZW50X2lkIjoiY29udGFjdCIsInN1YiI6IjEiLCJhdXRoX3RpbWUiOjE2NzQ5OTgyMjIsImlkcCI6ImxvY2FsIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIxIiwicm9sZVR5cGUiOiJBZG1pbiIsInJvbGVzIjoiQWRtaW4iLCJqdGkiOiIyRUU2OEU1ODgzMEY3N0Q5NzlCMERFODMwQUJDNDY3RiIsImlhdCI6MTY3NDk5ODIyMiwic2NvcGUiOlsib3BlbmlkIiwicm9sZXMiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsiY3VzdG9tIl19.IpZzjTM85PE5jnbVG8teoGraay6pmyq7bH5yfWYJ5GyKmAX8mq1dxqcVqeEY_8gqeTAFWB4wyyUKk-AsF5BsD3o0aPOulL-HR-x1CUjONJVOdP-H-5FZz7l70KY5IzXIBSeABUZMKl4UwDCBE4Or7p_HFIE7-fan19WkJP6TGP3MD84rAmTkswt9z_uoEKXxucZCpemmiwHcBRj8n7H7zo-QB5t4p_s2vwBb_SImySZKE4tqhGN9uO9jyK1Ujb-bLXmT1OOY7a3sG11kE3Pv2I-Oh_Up8OKAZNJVr17tRtgnQ6edc16-UmoZmyK5SuqXTXKzHsQVTV4HlwywLpJ9fg";
//    })
//    .build();

var sendButton = document.getElementById("sendButton");
sendButton.disabled = true;

sendButton.addEventListener("click", function (event) {
    var message = document.getElementById("notificationInput");
    connectionNotification.send("SendMessage", message.value).then(function () {
        message.value = "";
    });
    event.preventDefault();
});

connectionNotification.on("LoadMessages", (notifications, count) => {
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