import {
  booksElements,
  booksList,
  createBookContent,
  createButton,
  createContentPopup,
  createLink,
  createPopup,
  createTextElement,
  header,
  logo,
  mainBlock,
  nav,

} from '../../utils/constance.js';


// const catalogLink = createLink('catalogLink', 'Catalog', '#main')
const bagLink = createLink('bagLink', 'Bag', '../bag/bag.html');

const popup = createPopup();
let bagBooks  = localStorage.books ? JSON.parse(localStorage.books) : [];

let books;
fetch('../../vendor/book.json')
  .then(response => {
    return response.json();
  })
  .then(data => {
    books = data;
    books.forEach((book) => {
      const bookItem = createTextElement('li', 'book');
      createBookContent(book, bookItem);
      const showMoreButton = createButton('showButton', 'Show more', () => {
        createContentPopup(book, popup);
        popup.classList.add('popup_open');
      });
      const addBook = createButton('addBookButton', 'Add to bag', () => {
        const isBookInBag = bagBooks.some((item) => item['title'] === book['title']);
        if (isBookInBag) {
          addBook.classList.add('button_deleteBook');
          bagBooks = bagBooks.filter(item => item['title'] !== book['title']);
          addBook.textContent = "Add to bag";
        } else {
          bagBooks.push(book);
          addBook.classList.remove('button_deleteBook');
          addBook.textContent = "Delete"
        }
        localStorage.setItem('books', JSON.stringify(bagBooks))
      });
      if (bagBooks.some((item) => item['title'] === book['title'])){
        addBook.textContent = 'Delete'
      }
      addBook.classList.add('btn_withBorder')
      bookItem.append(addBook, showMoreButton);
      booksElements.push(bookItem);
    });
    booksElements.forEach((book) => booksList.append(book));
    mainBlock.append(booksList);

  });

header.classList.add('header');
nav.append(bagLink);
nav.classList.add('nav');
logo.classList.add('header__logo');
booksList.classList.add('booksCatalog');

logo.textContent = 'Book shop';

header.prepend(logo, nav);
console.log(logo.innerHTML)

mainBlock.before(header);
mainBlock.append(popup);
console.log(bagBooks)

export {
  bagBooks
}
