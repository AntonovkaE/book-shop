let today = new Date ()
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();
const dateInput = document.getElementById('delivery-date')
const checkboxInputs = Array.from(document.querySelectorAll('.gift-checkbox'))

today = yyyy + '-' + mm + '-' + (+dd + 1);
dateInput.min = today;
dateInput.value = today;

let checkboxInputChecked = 0;
checkboxInputs.forEach(item => {
  item.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      if (checkboxInputChecked < 2) {
        item.checked = true;
        checkboxInputChecked++;
        if (checkboxInputChecked == 2 ) {
          checkboxInputs.forEach((item) => {
            if (!item.checked) {
              item.disabled = true
            }
          })
        }
      }
    } else {
      item.checked = false;
      checkboxInputChecked--;
      if (checkboxInputChecked < 2) {
        checkboxInputs.forEach(item => item.disabled = false)
      }

    }
  })
})

