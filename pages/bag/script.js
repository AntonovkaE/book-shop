import {
  header,
  logo,
  nav,
  createBookContent,
  createButton, createLink,
  createTextElement, bagLink, catalogLink
} from '../../utils/constance.js';

const bagBooksElements = [];

bagLink.classList.add('link_active')
catalogLink.href = '../main/index.html'
bagLink.href = '#main'

const emptyBagDiv = createTextElement('div', 'emptyBag', 'Your bag is empty')
const main = document.querySelector('main')
const books = document.createElement('ul')
books.classList.add('booksCatalog')
let bagBooks = localStorage.books ? JSON.parse(localStorage.books) : [];
const orderButton = createLink('btn', 'Order', '../order/order.html')

function isBagEmpty (bagBooks) {
  if (!bagBooks.length) {
    orderButton.classList.add('btn_hidden')
    emptyBagDiv.classList.remove('emptyBag_hidden')
  }
  console.log(bagBooks)
}
bagBooks.forEach(book => {
  const bookItem = createTextElement('li', 'book');
  createBookContent(book, bookItem);
  const deleteButton = createButton('deleteButton', 'Delete', () => {
    bagBooks = bagBooks.filter(item => item['title'] !== book['title']);
    bookItem.remove()
    localStorage.setItem('books', JSON.stringify(bagBooks))
    isBagEmpty(bagBooks)
  })
  deleteButton.classList.add('btn_withBorder')
  deleteButton.classList.add('btn_delete');
  bookItem.append(deleteButton)
  bagBooksElements.push(bookItem);
});

isBagEmpty(bagBooks)
bagBooksElements.forEach((book) => books.append(book));
main.append(emptyBagDiv)

main.append(books);
nav.append(bagLink, catalogLink);
header.prepend(logo)
header.append(nav)
main.prepend(header)



emptyBagDiv.classList.add('emptyBag_hidden')


orderButton.classList.add('btn_withBorder')
main.append(orderButton)
