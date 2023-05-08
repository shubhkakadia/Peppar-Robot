// session = null
// QiSession(connected, disconnected, location.host)

const dashboard = document.getElementById("dashboard");


dashboard.addEventListener('click', function () {
    console.log("Clicked");
    location.href = 'pages/menu.html'
});

function logout() {
	// Get the admin username and password from the user
	var username = prompt("Enter admin username:");
	var password = prompt("Enter admin password:");

	// Verify the admin credentials before logging out
	if (username === "admin" && password === "admin") {
		// Clear any user session data or cookies
		// Redirect the user to the logout page or homepage
		
        RobotUtils.onServices(function (ALTabletService) {
			ALTabletService.goToHome();
			console.log(ALTabletService);
          });

	} else {
		alert("Incorrect admin username or password!");
	};
   
};

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

