session = null
QiSession(connected, disconnected, location.host)

document.addEventListener('click', function () {
    console.log("Clicked");
<<<<<<< HEAD
    window.location.href = 'pages/menu.html'
});
=======
    location.href = '../pages/menu.html'
});

function connected(s) {
    console.log("Session Connected");
    session = s;
}

function disconnected() {
    console.log("Session Disconnected");
}

function launchDashboard(){
    session.services('ALMemory').then(function (memory){
        memory.raiseEvent("clickedDashboard", true)
    })
}

>>>>>>> 5958bc61434a4a3543a5b99597eb5f73c0d711a8
