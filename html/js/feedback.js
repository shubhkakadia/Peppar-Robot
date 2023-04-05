let selectedValue = 0;

function setValue(value) {
  const name = document.getElementById('floatingInput').value;
  const services = document.getElementById('services').value;
  const comment = document.getElementById('floatingTextarea').value;
  selectedValue = value;
  const data = { name, services, comment, rating: selectedValue };

  window.location.href = "thankyou.html";

  // After 5 seconds, redirect to menu.html
  setTimeout(() => {
    window.location.href = 'menu.html';
  }, 5000);

  console.log(JSON.stringify(data));
  console.log(`Selected value: ${selectedValue}`);
}
