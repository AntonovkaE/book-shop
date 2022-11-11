const mainBlock = document.querySelector('main');
const header = document.createElement('header');
const logo = document.createElement('h1');

const booksList = document.createElement('ul');
const booksElements = [];
const createButton = (className, text, func) => {
  const button = document.createElement('button');
  button.classList.add(className);
  button.type = 'button';
  button.onclick = func;
  button.textContent = text;
  return button;
};

const createTextElement = (type, className, textContent = '') => {
  const elem = document.createElement(type);
  elem.classList.add(className);
  elem.textContent = textContent;
  return elem;
};

let books;
fetch('../assets/book.json')
  .then(response => {
    return response.json();
  })
  .then(data => {
    books = data;
    books.forEach((book) => {
      const bookItem = createTextElement('li', 'book');
      const author = createTextElement('p', 'book__author', book['author']);
      const imageLink = document.createElement('img');
      imageLink.classList.add('book__img');
      imageLink.alt = 'book image';
      imageLink.src = book['imageLink'];
      const bookTitle = createTextElement('h3', 'book__title', book['title']);
      const bookPrice = createTextElement('p', 'book__price', book['price']);
      const bookDescription = createTextElement('p', 'book__description', book['description']);

      const showMoreButton = createButton('showButton', 'Show more', () => {
        //  открыть попап
      });
      const addBook = createButton('addBookButton', 'Add to bag', () => {
        //  добавить в корзину
      });
      bookItem.append(author, imageLink, bookTitle, bookPrice, bookDescription, showMoreButton, addBook);
      booksElements.push(bookItem);
    });
    booksElements.forEach((book) => booksList.append(book));
    mainBlock.append(booksList);

  });
header.classList.add('header');
logo.classList.add('header__logo');
booksList.classList.add('booksCatalog');

logo.textContent = 'Book shop';
header.prepend(logo);

mainBlock.before(header);



