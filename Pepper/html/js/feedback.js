
RobotUtils.onServices(function (ALLeds, ALTextToSpeech) {
  ALTextToSpeech.say("Tell us more about your experience.");
});

// utilityFunction();

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
  switch (ratingvalue) {
    case 1:
      RobotUtils.onServices(function (ALLeds, ALTextToSpeech, ALSpeechRecognition) {
        ALLeds.randomEyes(2.0);
        ALSpeechRecognition.pause(true);

        ALTextToSpeech.say(
          "We're sorry to hear that you had a poor experience with us. We take all feedback seriously and would appreciate the opportunity to address your concerns."
        );
        ALSpeechRecognition.pause(false);
      });
      break;

    case 2:
      RobotUtils.onServices(function (ALLeds, ALTextToSpeech, ALSpeechRecognition) {
        ALLeds.randomEyes(2.0);
        ALSpeechRecognition.pause(true);

        ALTextToSpeech.say(
          "Thank you for your feedback. We are sorry that your experience was not up to our usual standards. We will take your comments on board to improve our services."
        );
        ALSpeechRecognition.pause(false);
      });
      break;

    case 3:
      RobotUtils.onServices(function (ALLeds, ALTextToSpeech, ALSpeechRecognition) {
        ALLeds.randomEyes(2.0);
        ALSpeechRecognition.pause(true);

        ALTextToSpeech.say(
          "Thanks for taking the time to share your feedback. We are happy to hear that you had an average experience with us. We will strive to make it a five-star experience next time."
        );
        ALSpeechRecognition.pause(false);
      });
      break;

    case 4:
      RobotUtils.onServices(function (ALLeds, ALTextToSpeech, ALSpeechRecognition) {
        ALLeds.randomEyes(2.0);
        ALSpeechRecognition.pause(true);

        ALTextToSpeech.say(
          "Thank you for your positive review. We're glad you had a great experience with us and appreciate your support. We'll keep working hard to provide exceptional service."
        );
        ALSpeechRecognition.pause(false);
      });
      break;

    case 5:
      RobotUtils.onServices(function (ALLeds, ALTextToSpeech, ALSpeechRecognition) {
        ALLeds.randomEyes(2.0);
        ALSpeechRecognition.pause(true);

        ALTextToSpeech.say(
          "Wow, thank you so much for the amazing review! We are thrilled to hear that you had an exceptional experience with us and appreciate your kind words. We look forward to serving you again soon."
        );
        ALSpeechRecognition.pause(false);
      });
      break;
  }

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

    setTimeout(function () {
      window.location.href = "menu.html";
    }, 3000);
  }
}
