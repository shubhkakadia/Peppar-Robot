const utilityFunction = function (callback) {
  console.log(RobotUtils);
  RobotUtils.onServices(function (ALLeds, ALTextToSpeech) {
    ALLeds.randomEyes(2.0);
    ALTextToSpeech.say("I will take over the world");
  });
};

utilityFunction();

var fetchData = null;
var currentDate = new Date();
var currentYear = currentDate.getYear() + 1900;
function FetchAPI() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://192.168.0.115:3000/feedback/get", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      fetchData = JSON.parse(xhr.responseText).response;
      console.log(fetchData);
      // fetchData = fetchData.response;
    }
  };
  xhr.send(null);
}
FetchAPI();
function setValue(ratingvalue) {
  // switch(ratingvalue){
  //   case 1:
  // }

  var Name = document.getElementById("Name").value;
  var ServiceType = document.getElementById("ServiceType").value;
  var Comments = document.getElementById("Comment").value;
  if (ServiceType !== "") {
    function generateID() {
      console.log(fetchData);
      if (fetchData.length < 1) {
        ID = (currentYear - 2000) * 10000;
        console.log(ID);
        return ID + 1;
      } else {
        return fetchData[fetchData.length - 1].ID + 1;
      }
    }
    function generateJSON() {
      var ID = generateID();
      var Conversation = [];
      var feedbackData = {
        ID: ID,
        Name: Name,
        ServiceType: ServiceType,
        Comments: Comments,
        Rating: ratingvalue,
        Conversation: Conversation,
      };
      console.log("feedbackData", feedbackData);
      return feedbackData;
    }
    function post_req() {
      var xhr = new XMLHttpRequest();
      var url = "http://192.168.0.115:3000/feedback/register";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          console.log(xhr.responseText);
        }
      };
      var data = JSON.stringify(generateJSON());
      xhr.send(data);
    }
    FetchAPI();
    post_req();
    var customAlert = document.createElement("div");
    customAlert.className = "custom-alert";
    customAlert.innerHTML =
      '<div class="alert alert-success d-flex align-items-center" role="alert">' +
      '<svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>' +
      "<div>" +
      "Thank you for your feedback! Redirecting you to the Menu." +
      "</div>" +
      "</div>";
    document.body.appendChild(customAlert);
    // Set custom alert position to top of page
    customAlert.style.position = "fixed";
    customAlert.style.top = "0";
    customAlert.style.left = "34.5%";
    customAlert.style.opacity = "80%";

    // +var tts = new ALProxy("ALTextToSpeech", "192.168.0.160", 9559); // replace "your-pepper-robot-ip-address" with the IP address of your Pepper robot

    // session.say("Thank you for your feedback");

    // sayThankYou();
    RobotUtils.onServices(function (ALLeds, ALTextToSpeech) {
      ALLeds.randomEyes(2.0);
      ALTextToSpeech.say("hello got the message");
      
    });
    setTimeout(function () {
      window.location.href = "menu.html";
    }, 3000);
  }
}
