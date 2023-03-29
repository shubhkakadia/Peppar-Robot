const services = document.getElementById("services");
const navigate = document.getElementById("navigate");
const feedback = document.getElementById("feedback");
const ourteam = document.getElementById("ourteam");
const aboutus = document.getElementById("aboutus");

console.log(services);

services.addEventListener("click", function () {
    console.log("clicked services");
<<<<<<< HEAD
    window.location.href = 'services.html'
=======
    window.location.href = 'C:\\University\\4th Year\\ICT Capstone\\Peppar-Robot\\html\\pages\\services.html'
>>>>>>> 5958bc61434a4a3543a5b99597eb5f73c0d711a8
});

navigate.addEventListener("click", function () {
    console.log("clicked navigate");
    window.location.href = 'navigate.html'
});

feedback.addEventListener("click", function () {
    console.log("clicked feedback");
    window.location.href = 'feedback.html'
});

ourteam.addEventListener("click", function () {
    console.log("clicked ourteam");
    window.location.href = 'ourteam.html'
});

aboutus.addEventListener("click", function () {
    console.log("clicked aboutus");
    window.location.href = 'aboutus.html'
});
