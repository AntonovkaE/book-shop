let today = new Date ()
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();
const dateInput = document.getElementById('delivery-date')

today = yyyy + '-' + mm + '-' + (+dd + 1);
dateInput.min = today;
dateInput.value = today;
