const services = document.getElementById("services");
const navigate = document.getElementById("navigate");
const feedback = document.getElementById("feedback");
const ourteam = document.getElementById("ourteam");
const aboutus = document.getElementById("aboutus");
const help = document.getElementById("help");

RobotUtils.onServices(function (ALLeds, ALTextToSpeech) {
  ALTextToSpeech.say("Welcome to the menu.");
});


services.addEventListener("click", function () {
  console.log("clicked services");
  window.location.href = "services.html";
  RobotUtils.onServices(function (ALLeds, ALTextToSpeech, ALSpeechRecognition) {
    ALSpeechRecognition.pause(true);
    ALTextToSpeech.say(
      "Here are the list of services Elizabeth clinic has to offer."
    );
    ALSpeechRecognition.pause(false);
  });
});

navigate.addEventListener("click", function () {
  console.log("clicked navigate");
  window.location.href = "navigate.html";
});

feedback.addEventListener("click", function () {
  console.log("clicked feedback");
  window.location.href = "feedback.html";
});

ourteam.addEventListener("click", function () {
  console.log("clicked ourteam");
  window.location.href = "ourteam.html";
});

aboutus.addEventListener("click", function () {
  console.log("clicked aboutus");
  window.location.href = "aboutus.html";
});

help.addEventListener("click", function () {
  console.log("clicked help");
  window.location.href = "dialog.html";
});
