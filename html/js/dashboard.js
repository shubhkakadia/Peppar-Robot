session = null
QiSession(connected, disconnected, location.host)

document.addEventListener('click', function () {
    console.log("Clicked");
    location.href = 'pages/menu.html'
});

// function connected(s) {
//     console.log("Session Connected");
//     session = s;
// }

// function disconnected() {
//     console.log("Session Disconnected");
// }

// function launchDashboard(){
//     session.services('ALMemory').then(function (memory){
//         memory.raiseEvent("clickedDashboard", true)
//     })
// }

