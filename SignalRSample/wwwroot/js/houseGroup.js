/// <reference path="../lib/microsoft/signalr/dist/browser/signalr.js" />

let lbl_houseJoined = document.getElementById("lbl_houseJoined");

let btn_un_gryffindor = document.getElementById("btn_un_gryffindor");
let btn_un_slytherin = document.getElementById("btn_un_slytherin");
let btn_un_hufflepuff = document.getElementById("btn_un_hufflepuff");
let btn_un_ravenclaw = document.getElementById("btn_un_ravenclaw");

let btn_gryffindor = document.getElementById("btn_gryffindor");
let btn_slytherin = document.getElementById("btn_slytherin");
let btn_hufflepuff = document.getElementById("btn_hufflepuff");
let btn_ravenclaw = document.getElementById("btn_ravenclaw");

let trigger_gryffindor = document.getElementById("trigger_gryffindor");
let trigger_slytherin = document.getElementById("trigger_slytherin");
let trigger_hufflepuff = document.getElementById("trigger_hufflepuff");
let trigger_ravenclaw = document.getElementById("trigger_ravenclaw");

//Create Connection
var connectionHouseGroup = new signalR.HubConnectionBuilder()
    .withUrl("/Hubs/HouseGroup").build();

//Connect to methos that hub invokes aka receive notifications from hub
btn_gryffindor.addEventListener("click", function (event) {
    connectionHouseGroup.send("JoinHouse", "Gryffindor");
    event.preventDefault();
})
btn_hufflepuff.addEventListener("click", function (event) {
    connectionHouseGroup.send("JoinHouse", "Hufflepuff");
    event.preventDefault();
})
btn_ravenclaw.addEventListener("click", function (event) {
    connectionHouseGroup.send("JoinHouse", "Ravenclaw");
    event.preventDefault();
})
btn_slytherin.addEventListener("click", function (event) {
    connectionHouseGroup.send("JoinHouse", "Slytherin");
    event.preventDefault();
})

btn_un_gryffindor.addEventListener("click", function (event) {
    connectionHouseGroup.send("LeaveHouse", "Gryffindor");
    event.preventDefault();
})
btn_un_hufflepuff.addEventListener("click", function (event) {
    connectionHouseGroup.send("LeaveHouse", "Hufflepuff");
    event.preventDefault();
})
btn_un_ravenclaw.addEventListener("click", function (event) {
    connectionHouseGroup.send("LeaveHouse", "Ravenclaw");
    event.preventDefault();
})
btn_un_slytherin.addEventListener("click", function (event) {
    connectionHouseGroup.send("LeaveHouse", "Slytherin");
    event.preventDefault();
})

trigger_gryffindor.addEventListener("click", function (event) {
    connectionHouseGroup.send("TriggerHouseNotify", "Gryffindor");
    event.preventDefault();
})
trigger_hufflepuff.addEventListener("click", function (event) {
    connectionHouseGroup.send("TriggerHouseNotify", "Hufflepuff");
    event.preventDefault();
})
trigger_ravenclaw.addEventListener("click", function (event) {
    connectionHouseGroup.send("TriggerHouseNotify", "Ravenclaw");
    event.preventDefault();
})
trigger_slytherin.addEventListener("click", function (event) {
    connectionHouseGroup.send("TriggerHouseNotify", "Slytherin");
    event.preventDefault();
})

connectionHouseGroup.on("notificationTriggered", (houseName) => {
    toastr.success(`a Notification triggered for ${houseName} has been launched.`);
});

connectionHouseGroup.on("newMemberAddedToGroup", (houseName) => {
    toastr.success(`new Member Subscribed to ${houseName}`);
});

connectionHouseGroup.on("MemeberRemovedFromGroup", (houseName) => {
    toastr.warning(`a Member Unsubscribed from ${houseName}`);
});

connectionHouseGroup.on("subscriptionStatus", (strGroupsJoined, houseName, hasSubscribed) => {
    lbl_houseJoined.innerText = strGroupsJoined;
    if (hasSubscribed) {
        switch (houseName) {
            case 'Gryffindor':
                btn_gryffindor.style.display = "none";
                btn_un_gryffindor.style.display = "";
                break;
            case 'Hufflepuff':
                btn_hufflepuff.style.display = "none";
                btn_un_hufflepuff.style.display = "";
                break;
            case 'Ravenclaw':
                btn_ravenclaw.style.display = "none";
                btn_un_ravenclaw.style.display = "";
                break;
            case 'Slytherin':
                btn_slytherin.style.display = "none";
                btn_un_slytherin.style.display = "";
                break;
        }
        toastr.success(`You have Subscribed Successfully from ${houseName}`);
    } else {
        switch (houseName) {
            case 'Gryffindor':
                btn_gryffindor.style.display = "";
                btn_un_gryffindor.style.display = "none";
                break;
            case 'Hufflepuff':
                btn_hufflepuff.style.display = "";
                btn_un_hufflepuff.style.display = "none";
                break;
            case 'Ravenclaw':
                btn_ravenclaw.style.display = "";
                btn_un_ravenclaw.style.display = "none";
                break;
            case 'Slytherin':
                btn_slytherin.style.display = "";
                btn_un_slytherin.style.display = "none";
                break;
        }
        toastr.success(`You have UnSubscribed Successfully from ${houseName}`);
    }
});

//invoke hub methods aka send notification to hub 

//start connection
function fullfilled() {
    console.log("connection successfully stablished with server houseGroupHub");
    //do something on start
}
function rejected() {
    //rejected logs
    console.log("connection rejected from houseGroupHub!");
}

connectionHouseGroup.start().then(fullfilled, rejected);