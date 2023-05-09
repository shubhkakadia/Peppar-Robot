session = null
QiSession(connected, disconnected, location.host)

const dashboard = document.getElementById("dashboard");


dashboard.addEventListener('click', function () {
    console.log("Clicked");
    location.href = 'pages/menu.html'
});


function connected(s) {
    console.log("Session connected");
    session = s;
    //If you want to subscribe so some events (to send info pepper->tablet) call the function here
}

function disconnected(error) {
    console.log("Session disconnected");
}

function logout() {
	
	// Get the admin username and password from the user
	var password = prompt("Enter admin password:");

	// // Verify the admin credentials before logging out
	if (password === "admin") {
		session.service("ALMemory").then(function (memory) {
			memory.raiseEvent("clickedExit", true);
		});
		// Clear any user session data or cookies

		// RobotUtils.onServices(function (ALBehaviorManager) {
		// 	session.service("ALBehaviorManager").then(function (ALBehaviorManager) {
		// 		ALBehaviorManager.stopAllBehaviors();
		// 		console.log(ALBehaviorManager);

		// 		session.service("ALSystem").then(function (ALSystem) {
		// 			ALSystem.exit();
		// 		});
		// 	});
		// });
		
		// RobotUtils.subscribeToALMemoryEvent("clickedExit", true);

		

        // RobotUtils.onServices(function (ALMemory, ALBehaviorManager) {
		// 	console.log(ALMemory)
		// 	ALMemory.raiseEvent("clickedExit", true)
		// 	// ALBehaviorManager.stopAllBehaviors()
		// 	// console.log(ALBehaviorManager);
		// 	// ALSystem.exit();
		// 	// console.log(ALSystem);
        //   });

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

