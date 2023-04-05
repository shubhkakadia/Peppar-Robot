let selectedValue = 0;

function setValue(value) {
  const name = document.getElementById('floatingInput').value;
  const services = document.getElementById('services').value;
  const comment = document.getElementById('floatingTextarea').value;
  selectedValue = value;
  const data = { name, services, comment, rating: selectedValue };
  console.log(JSON.stringify(data));
  console.log(`Selected value: ${selectedValue}`);

  const customAlert = document.createElement('div');
  customAlert.classList.add('custom-alert');
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
  customAlert.style.position = 'fixed';
  customAlert.style.top = '0';
  customAlert.style.left = '34.5%';
  customAlert.style.opacity = '80%';

  // After 5 seconds, redirect to menu.html
  setTimeout(() => {
    window.location.href ="menu.html";
  },3000);
}
