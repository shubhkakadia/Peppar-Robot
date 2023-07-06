import ip from "./ip.json"
RobotUtils.onServices(function (ALLeds, ALTextToSpeech) {
  ALTextToSpeech.say("Tell us more about your experience.");
});

var fetchData = null;
var currentDate = new Date();
var currentYear = currentDate.getYear() + 1900;

function FetchAPI(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `http://${ip.ip}/feedback/get`, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      fetchData = JSON.parse(xhr.responseText).response;
      console.log(fetchData);
      callback();
    }
  };
  xhr.send(null);
}

function setValue(ratingvalue) {
  function handleRating(ratingvalue) {
    RobotUtils.onServices(function (ALLeds, ALTextToSpeech, ALSpeechRecognition) {
      ALLeds.randomEyes(2.0);
      ALSpeechRecognition.pause(true);

      var feedbackText = "";
      switch (ratingvalue) {
        case 1:
          feedbackText =
            "We're sorry to hear that you had a poor experience with us. We take all feedback seriously and would appreciate the opportunity to address your concerns.";
          break;
        case 2:
          feedbackText =
            "Thank you for your feedback. We are sorry that your experience was not up to our usual standards. We will take your comments on board to improve our services.";
          break;
        case 3:
          feedbackText =
            "Thanks for taking the time to share your feedback. We are happy to hear that you had an average experience with us. We will strive to make it a five-star experience next time.";
          break;
        case 4:
          feedbackText =
            "Thank you for your positive review. We're glad you had a great experience with us and appreciate your support. We'll keep working hard to provide exceptional service.";
          break;
        case 5:
          feedbackText =
            "Wow, thank you so much for the amazing review! We are thrilled to hear that you had an exceptional experience with us and appreciate your kind words. We look forward to serving you again soon.";
          break;
      }

      ALTextToSpeech.say(feedbackText);
      ALSpeechRecognition.pause(false);
    });
  }

  var Name = document.getElementById("Name").value;
  var ServiceType = document.getElementById("ServiceType").value;
  var Comments = document.getElementById("Comment").value;

  if (ServiceType !== "") {
    function generateID() {
      var currentDate = new Date();
      var year = currentDate.getFullYear();
      var month = String(currentDate.getMonth() + 1).padStart(2, "0");
      var day = String(currentDate.getDate()).padStart(2, "0");
      var hours = String(currentDate.getHours()).padStart(2, "0");
      var minutes = String(currentDate.getMinutes()).padStart(2, "0");
      var seconds = String(currentDate.getSeconds()).padStart(2, "0");

      return year + month + day + hours + minutes + seconds;
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
      var url = `http://${ip.ip}/feedback/register`;
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

    FetchAPI(function () {
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
    });
  }
}

