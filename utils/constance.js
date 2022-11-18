const mainBlock = document.createElement('main')
const header = document.createElement('header');
const nav = document.createElement('nav');


const logo = document.createElement('h1');

const booksList = document.createElement('ul');

header.classList.add('header');
nav.classList.add('nav');
logo.classList.add('header__logo');

logo.textContent = 'Book shop';

const booksElements = [];
const createTextElement = (type, className, textContent = '') => {
  const elem = document.createElement(type);
  elem.classList.add(className);
  elem.textContent = textContent;
  return elem;
};

const createButton = (className, text, func) => {
  const button = document.createElement('button');
  button.classList.add(className);
  button.classList.add('btn')
  button.type = 'button';
  button.onclick = func;
  button.textContent = text;
  return button;
};

const createLink = (className, text, link) => {
  const linkElem = document.createElement('a')
  linkElem.classList.add(className);
  linkElem.textContent = text;
  linkElem.href = link;
  linkElem.classList.add('link')
  return linkElem
}

const createBookContent = (book, bookItem) => {
  const author = createTextElement('p', 'book__author', book['author']);
  const imageLink = document.createElement('img');
  imageLink.classList.add('book__img');
  imageLink.alt = 'book image';
  imageLink.src = book['imageLink'];
  const bookTitle = createTextElement('h3', 'book__title', book['title']);
  const bookPrice = createTextElement('p', 'book__price', book['price']);
  const bookDescription = createTextElement('p', 'book__description', book['description']);
  bookItem.append(imageLink, author, bookTitle, bookPrice);
};

function deletePopupContent () {
  document.querySelector('.popup__heading').remove()
  document.querySelector('.popup__content').remove()
}

function createPopup() {
  const popup = document.createElement('div');
  popup.classList.add('popup');
  const popupHeader = document.createElement('div');
  popupHeader.classList.add('popup__header');
  const closePopup = createButton('popup__close', 'x', () => {
    popup.classList.remove('popup_open');
    deletePopupContent()
  });
  popup.append(popupHeader, closePopup);
  return popup;
}

function createContentPopup(book, popup) {
  const popupHeading = createTextElement('h3', 'popup__heading', book['title']);
  const popupContent = createTextElement('p', 'popup__content', book['description']);
  popup.append(popupHeading, popupContent);
}

const catalogLink = createLink('catalogLink', 'Catalog', '#main')
const bagLink = createLink('bagLink', 'Bag', '../bag/bag.html');
nav.append(bagLink, catalogLink);


export {
  mainBlock, header, nav, logo, catalogLink, bagLink, booksElements, booksList, createLink, createButton, createTextElement, createPopup, createBookContent, createContentPopup
}
