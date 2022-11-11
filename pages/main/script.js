import {
  mainBlock, header, nav, logo, bagBooks, booksElements, booksList, createLink, createButton, createPopup, createBookContent, createTextElement, createContentPopup
} from '../../utils/constance.js'

// const catalogLink = createLink('catalogLink', 'Catalog', '#main')
const bagLink = createLink('bagLink', 'Bag', '../bag.html')

const popup = createPopup();

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
        bagBooks.push(book);
      });
      bookItem.append(showMoreButton, addBook);
      booksElements.push(bookItem);
    });
    booksElements.forEach((book) => booksList.append(book));
    mainBlock.append(booksList);

  });

header.classList.add('header');
nav.append( bagLink)
nav.classList.add('nav');
logo.classList.add('header__logo');
booksList.classList.add('booksCatalog');

logo.textContent = 'Book shop';

header.prepend(logo, nav,);

mainBlock.before(header);
mainBlock.append(popup);





