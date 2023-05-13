const exercisePhysiology = document.getElementById("exercisePhysiology");
const occupationalTherapy = document.getElementById("occupationalTherapy");
const physiotherapy = document.getElementById("physiotherapy");
const podiatry = document.getElementById("podiatry");
const speechPathology = document.getElementById("speechPathology");

// RobotUtils.onServices(function (ALLeds, ALTextToSpeech, ALSpeechRecognition) {
//   ALSpeechRecognition.pause(true);
//   ALTextToSpeech.say(
//     "Welcome to the menu."
//   );
//   ALSpeechRecognition.pause(false);
// });

exercisePhysiology.addEventListener("click", function () {
  console.log("clicked exercisePhysiology");
  window.location.href = "exercisePhysiology.html";
});

occupationalTherapy.addEventListener("click", function () {
  console.log("clicked occupationalTherapy");
  window.location.href = "navigate.html";
});

physiotherapy.addEventListener("click", function () {
  console.log("clicked physiotherapy");
  window.location.href = "feedback.html";
});

podiatry.addEventListener("click", function () {
  console.log("clicked podiatry");
  window.location.href = "ourteam.html";
});

speechPathology.addEventListener("click", function () {
  console.log("clicked speechPathology");
  window.location.href = "aboutus.html";
});

