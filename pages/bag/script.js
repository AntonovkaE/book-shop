console.log('dj')
import {
  createBookContent,
  createButton,
  createTextElement,
} from '../../utils/constance.js';

const bagBooksElements = [];
const main = document.querySelector('main')
const books = document.createElement('ul')
books.classList.add('bagsBook')
let bagBooks = JSON.parse(localStorage.books)
bagBooks.forEach(book => {
  const bookItem = createTextElement('li', 'book');
  createBookContent(book, bookItem);
  const deleteButton = createButton('deleteButton', 'Delete', () => {
    bagBooks = bagBooks.filter(item => item['title'] !== book['title']);
    bookItem.remove()
    localStorage.setItem('books', JSON.stringify(bagBooks))
  })
  deleteButton.classList.add('btn_withBorder')
  bookItem.append(deleteButton)
  bagBooksElements.push(bookItem);
});
bagBooksElements.forEach((book) => books.append(book));

main.append(books);

