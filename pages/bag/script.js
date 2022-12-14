import {
  bagLink,
  catalogLink,
  createBookContent,
  createButton,
  createLink,
  createTextElement,
  header,
  logo,
  nav,
} from '../../utils/constance.js';

const bagBooksElements = [];
const mainContent = new DocumentFragment();

const count = document.createElement('p');
let countValue = 0;

bagLink.classList.add('link_active');
catalogLink.href = '../main/index.html';
bagLink.href = '#main';

const emptyBagDiv = createTextElement('div', 'emptyBag', 'Your bag is empty');
const main = document.querySelector('main');
const books = document.createElement('ul');
books.classList.add('bagBooks');
let bagBooks = localStorage.books ? JSON.parse(localStorage.books) : [];
const orderButton = createLink('btn', 'Order', '../order/order.html');

function isBagEmpty(bagBooks) {
  if (!bagBooks.length) {
    orderButton.classList.add('link_hidden');
    emptyBagDiv.classList.remove('emptyBag_hidden');
  } else {
    orderButton.classList.remove('link_hidden');
    emptyBagDiv.classList.add('emptyBag_hidden');
  }
}

bagBooks.forEach(book => {
  const bookItem = createTextElement('li', 'book');
  createBookContent(book, bookItem);
  countValue = countValue + book.price;
  localStorage.setItem('count', String(countValue));
  const deleteButton = createButton('deleteButton', 'Delete', () => {
    bagBooks = bagBooks.filter(item => item['title'] !== book['title']);
    bookItem.remove();
    localStorage.setItem('books', JSON.stringify(bagBooks));
    isBagEmpty(bagBooks);
    countValue = countValue - book.price;
    localStorage.setItem('count', String(countValue));
    count.textContent = countValue;
  });

  deleteButton.classList.add('btn_withBorder');
  deleteButton.classList.add('btn_delete');
  bookItem.append(deleteButton);
  bagBooksElements.push(bookItem);
});

count.textContent = countValue;
count.classList.add('count');

bagBooksElements.forEach((book) => books.append(book));
main.append(emptyBagDiv);

main.append(books);
nav.append(bagLink, catalogLink);
header.prepend(logo);
header.append(nav);
main.prepend(header);

emptyBagDiv.classList.add('emptyBag_hidden');
main.append(count);

orderButton.classList.add('btn_withBorder');
main.append(orderButton);
mainContent.append(header, main);
document.querySelector('body').append(mainContent);
isBagEmpty(bagBooks);
