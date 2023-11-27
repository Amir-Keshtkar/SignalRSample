/// <reference path="../lib/microsoft/signalr/dist/browser/signalr.js" />
//Create Connection

//var connectioncGhasedak = new signalR.HubConnectionBuilder()
//    .withUrl("http://localhost:5015/notificationhub").build();

//http://192.168.1.177:8080/Notification/

var getBearerToken = () => "eyJhbGciOiJSUzI1NiIsImtpZCI6IkJCQ0VDMTA0QzA4NzQ0RjhGRTk5RjBFQ0VFM0FFOTQxIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE3MDAzOTQ1MDQsImV4cCI6MTcwMDM5ODEwNCwiaXNzIjoiaHR0cDovLzE3OC4yMTYuMjQ5LjEwODo4MDAwIiwiY2xpZW50X2lkIjoiVXNlcnMiLCJzdWIiOiIxIiwiYXV0aF90aW1lIjoxNzAwMzk0NTA0LCJpZHAiOiJsb2NhbCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMSIsImZ1bGxOYW1lIjoi2LPZiNm-2LEg2KfYr9mF24zZhiIsImZpcnN0TmFtZSI6Itiz2YjZvtixIiwibGFzdE5hbWUiOiLYp9iv2YXbjNmGIiwicGFyZW50SWQiOiIwIiwicm9sZVR5cGUiOlsiQWRtaW4iLCJVc2VyIl0sInJvbGVOYW1lcyI6WyJTdXBlckFkbWluIiwiQWRtaW4iLCJQYXJlbnQiXSwianRpIjoiQTE1QUQ3RTlFNEYwNjZFODkyQzQ1NTNBQkE1RUIwNzQiLCJpYXQiOjE3MDAzOTQ1MDQsInNjb3BlIjpbIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJjdXN0b20iXX0.qUkhk7brKcUkvOfV4wW4M_GAr1IqYn9xEkgV3hY2IyVF3y5Bn0D-tjZFqJEGvl7EziiOcRmL7TzGTVCHlY_2Kal449ER7edeloFXtzo5t5LFTQNZI9x3KaR3VUg6EoAsBp3XWd7mhvDEyO9yW7rhb01hTSoaQLu1Fw4uPGoIRWSZWtQMkjOvFkowZrCUClk6vKK8p2YSZgRvEwn3DKW8xzX8XFw5d2Y61jQdLdaBRXhrJ_ApAJ5Jfl83GliiWthauZRtv8G9NOzDV2vM9MMkBUjBVF-2ZvL9CGuBy4K7Or2BQMxO1zPM4Vgle87LwS2opgZgvETg5faxCojJ6JqBRA";

let connection = new signalR.HubConnectionBuilder()
    .withUrl(
        //"http://test.ghasedak.me:5015/Notification",
        "http://test.ghasedak.me:7000/Notification/Notification",
        //"http://sms.ghasedak.me:7000/Notification/Notification",
        {
            //accessTokenFactory: "How you doin???",
            withCredentials: true,
            //accessTokenFactory = () => "hello world"
        });
var connectioncGhasedak;
function login() {
    //const url = "http://gateway.ghasedak.me/Users/api/v1/Authenticate/Login2"
    const url = 'http://test.ghasedak.me:7000/Users/api/v1/Authenticate/Login2';
    const data = {
        userName: 'amir',
        password: '@Amir1378',
        captchaText: 'string',
        captchaToken: 'string',
        captchaInput: 0
    };

    const options = {
        method: 'POST',
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/json',
            'Cookie': document.cookie // Retrieve cookies from the cookie storage
        },
        body: JSON.stringify(data),
        credentials: 'include' // Include cookies in the request
    };

    fetch(url, options)
        .then(response => {
            return response.text();
        })
        .then(result => console.log(result))
        .catch(error => console.error('Error:', error));
}

function getUserProfile() {
    //const userProfileUrl = 'http://gateway.ghasedak.me/Users/api/v1/User/GetUserProfile';
    const userProfileUrl = 'http://test.ghasedak.me:7000/Users/api/v1/User/GetUserProfile';

    const getUserProfileOptions = {
        method: 'GET',
        headers: {
            'Accept': 'text/plain',
            //'Cookie': document.cookie // Retrieve cookies from the cookie storage
        },
        credentials: 'include'
    };

    fetch(userProfileUrl, getUserProfileOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.error('Error:', error));
}
//start connection
function generateCaptcha() {
    fetch(
        'http://sms.ghasedak.me:8000/api/v1/Authenticate/GenerateCaptcha',
        //'http://test.ghasedak.me:5001/api/v1/Authenticate/GenerateCaptcha',
        {
            method: 'GET',
            headers: {
                'Accept': 'text/plain',
                //'Access-Control-Allow-Origin': "*",
            },
            credentials: 'include'
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log(data); // Captcha data received
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

}
function fullfilled() {
    console.log("Weeeeeeeeeeeeeeeeee connection successfully stablished with Ghasedak Hub ");
    connectioncGhasedak.on("NewNotification", (e) => console.log(e));
    /*connectioncGhasedak.send();*/

    connectioncGhasedak.invoke("LoadNotifications").then((value) => {
        let ids = [];
        for (let i = 0; i < value.notifications.length; i++) {
            let n = value.notifications[i];
            console.log("seen notif: " + n.id);
            ids[i] = n.id;
        }
        console.log(ids);

        connectioncGhasedak.invoke("SeenNotifications", ids).then((r) => {
            console.log(r);
        });


    });

    console.log("Vola!");

    //connectioncGhasedak.invoke("LoadNotifications").then((value) => {
    //    console.log("value is: " + value);
    //});
}
function rejected() {
    console.log("connection rejected from Ghasedak hub!");
}

function send() {

    //login();
    getUserProfile();
    //generateCaptcha();

    //loginToken = document.cookie;
    console.log("token:" + document.cookie);
    connectioncGhasedak = connection.build();
    connectioncGhasedak.start().then(fullfilled, rejected);

}