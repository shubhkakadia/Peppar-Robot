const children = document.getElementById("children");
const NDISHealth = document.getElementById("NDISHealth");
const healthyAging = document.getElementById("healthyAging");
const podiatry = document.getElementById("podiatry");
const speechPathology = document.getElementById("speechPathology");
const ChildOccupationalTherapy = document.getElementById("ChildOccupationalTherapy");

// RobotUtils.onServices(function (ALLeds, ALTextToSpeech, ALSpeechRecognition) {
//   ALSpeechRecognition.pause(true);
//   ALTextToSpeech.say(
//     "Welcome to the menu."
//   );
//   ALSpeechRecognition.pause(false);
// });

children.addEventListener("click", function () {
  console.log("clicked children");
  window.location.href = "childrensHealth.html";
});

NDISHealth.addEventListener("click", function () {
  console.log("clicked NDISHealth");
  window.location.href = "NDIS.html";
});

healthyAging.addEventListener("click", function () {
  console.log("clicked healthyAging");
  window.location.href = "healthyAging.html";
});

rehab.addEventListener("click", function () {
  console.log("clicked rehab");
  window.location.href = "rehab.html";
});

sports.addEventListener("click", function () {
  console.log("clicked sports");
  window.location.href = "sports.html";
});

