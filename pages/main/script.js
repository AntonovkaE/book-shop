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
  catalogLink,
  bagLink
} from '../../utils/constance.js';


const popup = createPopup();
let bagBooks  = localStorage.books ? JSON.parse(localStorage.books) : [];
catalogLink.classList.add('link_active')
catalogLink.href = '#main'
bagLink.href = '../bag/bag.html'
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
          addBook.classList.remove('btn_delete');
          bagBooks = bagBooks.filter(item => item['title'] !== book['title']);
          addBook.textContent = "Add to bag";
        } else {
          bagBooks.push(book);
          addBook.classList.add('btn_delete');
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


booksList.classList.add('booksCatalog');

header.prepend(logo, nav);

mainBlock.before(header);
mainBlock.append(popup);

export {
  bagBooks
}
