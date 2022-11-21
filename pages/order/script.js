import { createTextElement, orderForm, orderInf } from '../../utils/constance.js';

const orderCount = localStorage.count;

let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();
const dateInput = document.getElementById('delivery-date');
const checkboxInputs = Array.from(document.querySelectorAll('.gift-checkbox'));
const count = createTextElement('p', 'order__count', `Total cost: ${orderCount}`);

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
        if (checkboxInputChecked == 2) {
          checkboxInputs.forEach((item) => {
            if (!item.checked) {
              item.disabled = true;
            }
          });
        }
      }
    } else {
      item.checked = false;
      checkboxInputChecked--;
      if (checkboxInputChecked < 2) {
        checkboxInputs.forEach(item => item.disabled = false);
      }
    }
  });
});

const onSubmitForm = () => {
  let gifts = [];
  const { elements } = orderForm;
  const data = Array.from(elements)
    .map((element) => {
      const { name, type } = element;
      const value = (type === 'radio' && element.checked) ? element.id : (element.type !== 'checkbox' && element.type !== 'radio') ? element.value : '';
      if (type === 'checkbox' && element.checked) {
        const content = document.getElementById(`${element.id}-label`).textContent;
        gifts.push(content);
        const giftsString = gifts.join(', ');
        return { name: 'Gifts',
          value: giftsString };
      }
      return { name, value };
    })
    .filter((item) => !!item.name);
  const orderTitle = createTextElement('h2', 'order__title', 'Your order has been placed');
  data.forEach(item => {
    if (item.type === 'checkbox') {
    } else {
      if (item.value) {
        const content = item.type === 'radio' ? `payment: ${item.name}` : `${item.name}: ${item.value}`;
        const inf = createTextElement('p', item.name, content);
        orderInf.append(inf);
      }
    }
  });
  orderInf.prepend(orderTitle);
  orderInf.append(count);
  orderForm.classList.add('hidden');
  document.querySelector('.order-inf').append(orderInf);
  document.querySelector('.order-inf').classList.remove('hidden');
};

orderForm.addEventListener('submit', () => {
  onSubmitForm();
});
