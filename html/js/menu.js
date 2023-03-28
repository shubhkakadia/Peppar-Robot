const services = document.getElementById("services");
const navigate = document.getElementById("navigate");
const feedback = document.getElementById("feedback");
const ourteam = document.getElementById("ourteam");
const aboutus = document.getElementById("aboutus");

console.log(services);

services.addEventListener("click", function () {
    console.log("clicked services");
    window.location.href = '/html/pages/services.html'
});

navigate.addEventListener("click", function () {
    console.log("clicked navigate");
    window.location.href = '/html/pages/navigate.html'
});

feedback.addEventListener("click", function () {
    console.log("clicked feedback");
    window.location.href = '/html/pages/feedback.html'
});

ourteam.addEventListener("click", function () {
    console.log("clicked ourteam");
    window.location.href = '/html/pages/services.html'
});

aboutus.addEventListener("click", function () {
    console.log("clicked aboutus");
    window.location.href = '/html/pages/services.html'
});
