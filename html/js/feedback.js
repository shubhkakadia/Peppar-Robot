let selectedValue = 0;

function setValue(value) {
  const name = document.getElementById('floatingInput').value;
  const services = document.getElementById('services').value;
  const comment = document.getElementById('floatingTextarea').value;
  selectedValue = value;
  const data = { name, services, comment, rating: selectedValue };
  console.log(JSON.stringify(data));
  console.log(`Selected value: ${selectedValue}`);

  alert("Thank you for your feedback!");

  // After 5 seconds, redirect to menu.html
  setTimeout(() => {
    window.location.href ="menu.html";
  },3000);
}
