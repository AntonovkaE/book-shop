import {
  bagLink,
  booksElements,
  booksList,
  catalogLink,
  createBookContent,
  createButton,
  createContentPopup,
  createPopup,
  createTextElement,
  header,
  logo,
  mainBlock,
  nav,
} from '../../utils/constance.js';

const mainContent = new DocumentFragment();
const popup = createPopup();
let bagBooks = localStorage.books ? JSON.parse(localStorage.books) : [];
catalogLink.classList.add('link_active');
catalogLink.href = '#main';
bagLink.href = '../bag/bag.html';

const addBook = (book, addBookButton) => {
  const isBookInBag = bagBooks.some((item) => item['title'] === book['title']);
  if (isBookInBag) {
    addBookButton.classList.remove('btn_delete');
    bagBooks = bagBooks.filter(item => item['title'] !== book['title']);
    addBookButton.textContent = 'Add to bag';
  } else {
    bagBooks.push(book);
    addBookButton.classList.add('btn_delete');
    addBookButton.textContent = 'Delete';
  }
  localStorage.setItem('books', JSON.stringify(bagBooks));
};

let books;
fetch('../../vendor/book.json')
  .then(response => {
    return response.json();
  })
  .then(data => {
    books = data;
    books.forEach((book) => {
      const bookItem = createTextElement('li', 'book');
      bookItem.id = book['id'];
      bookItem.draggable = true;
      bookItem.ondragstart = (evt) => {
        evt.dataTransfer.setData('book', JSON.stringify(book));
      };
      createBookContent(book, bookItem);
      const showMoreButton = createButton('showButton', 'Show more', () => {
        createContentPopup(book, popup);
        popup.classList.add('popup_open');
      });
      const addBookButton = createButton('addBookButton', 'Add to bag', () => addBook(book, addBookButton));
      if (bagBooks.some((item) => item['title'] === book['title'])) {
        addBookButton.textContent = 'Delete';
      }
      addBookButton.classList.add('btn_withBorder');
      bookItem.append(addBookButton, showMoreButton);
      booksElements.push(bookItem);
    });

    booksElements.forEach((book) => booksList.append(book));
    mainBlock.append(booksList);

  });

bagLink.ondrop = (evt) => {
  evt.preventDefault();
  const data = JSON.parse(evt.dataTransfer.getData('book'));
  const addButton = document.getElementById(`${data['id']}`).querySelector('.addBookButton');
  addBook(data, addButton);
};
bagLink.ondragover = (evt) => {
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy';
};

booksList.classList.add('booksCatalog');

header.prepend(logo, nav);

mainBlock.before(header);
mainBlock.append(popup);

mainContent.prepend(header);
mainContent.append(mainBlock);
document.querySelector('body').append(mainContent)

export {
  bagBooks,
};
