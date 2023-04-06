// let selectedValue = 0;
let fetchData = null;
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

async function setValue(value) {
  const Name = document.getElementById("Name").value;
  const ServiceType = document.getElementById("ServiceType").value;
  const Comments = document.getElementById("Comment").value;

  // validation: if service type is empty dont submit the request.
  if (ServiceType !== "") {
    async function FetchAPI() {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      await fetch("http://192.168.0.115:3000/feedback/get", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          fetchData = JSON.parse(result).response;
        })
        .catch((error) => console.log("error", error));
    }

    function generateID() {
      console.log(fetchData);
      if (!fetchData) {
        ID = (currentYear - 2000) * 10000;
        console.log(ID);
        return ID + 1;
      } else {
        return fetchData.at(-1).ID + 1;
      }
    }

    function generateJSON() {
      const ID = generateID();
      const Conversation = [];
      let Rating = 0;

      let feedbackData = {
        ID,
        Name,
        ServiceType,
        Comments,
        Rating,
        Conversation,
      };

      console.log("feedbackData", feedbackData);
      return feedbackData;
    }

    function post_req() {
      const raw = JSON.stringify(generateJSON());
      console.log(raw);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://192.168.0.115:3000/feedback/register", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    }

    await FetchAPI();
    Rating = value;
    post_req();

    const customAlert = document.createElement("div");
    customAlert.classList.add("custom-alert");
    customAlert.innerHTML = `
    <div class="alert alert-success d-flex align-items-center" role="alert">
      <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
      <div>
        Thank you for your feedback! Redirecting you to the Menu.
      </div>
    </div>
    `;
    document.body.appendChild(customAlert);
    // Set custom alert position to top of page
    customAlert.style.position = "fixed";
    customAlert.style.top = "0";
    customAlert.style.left = "34.5%";
    customAlert.style.opacity = "80%";

    // After 3 seconds, redirect to menu.html
    // setTimeout(() => {
    //   window.location.href ="menu.html";
    // },3000);
  }
}
