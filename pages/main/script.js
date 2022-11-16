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

const addBook = (book, addBookButton) => {
  const isBookInBag = bagBooks.some((item) => item['title'] === book['title']);
  if (isBookInBag) {
    addBookButton.classList.remove('btn_delete');
    bagBooks = bagBooks.filter(item => item['title'] !== book['title']);
    addBookButton.textContent = "Add to bag";
  } else {
    bagBooks.push(book);
    addBookButton.classList.add('btn_delete');
    addBookButton.textContent = "Delete"
  }
  localStorage.setItem('books', JSON.stringify(bagBooks))
}

let books;
fetch('../../vendor/book.json')
  .then(response => {
    return response.json();
  })
  .then(data => {
    books = data;
    books.forEach((book) => {
      const bookItem = createTextElement('li', 'book');
      bookItem.id = book['id']
      bookItem.draggable = true;
      bookItem.ondragstart = (evt) => {
        evt.dataTransfer.setData("book", JSON.stringify(book));
        // const canvas = document.createElement("img");
        // canvas.src = book['imageLink']
        // canvas.style.width = '30px';
        // canvas.style.height = '40px';
        // console.log(canvas)
        //
        // evt.dataTransfer.setData('text/plain', 'Data to Drag');
        // evt.dataTransfer.setDragImage(canvas, 25, 25);
      }
      // bookItem.ondrag = (evt) => {
      //   console.log(evt)
      // }
      // bookItem.ondragend = (evt) => {
      //   console.log('ondragend')
      // }
      // bookItem.ondragenter = (evt) => {
      //   console.log('ondragenter')
      // }
      // bookItem.ondragleave = (evt) => {
      //   console.log('ondragleave')
      // }

      // bookItem.ondragstart = (evt) => {
      //   console.log(evt.target)
      //
      //   evt.dataTransfer.effectAllowed = "move";
      // }
      createBookContent(book, bookItem);
      const showMoreButton = createButton('showButton', 'Show more', () => {
        createContentPopup(book, popup);
        popup.classList.add('popup_open');
      });
      const addBookButton = createButton('addBookButton', 'Add to bag', () => addBook(book, addBookButton));
      if (bagBooks.some((item) => item['title'] === book['title'])){
        addBookButton.textContent = 'Delete'
      }
      addBookButton.classList.add('btn_withBorder')
      bookItem.append(addBookButton, showMoreButton);
      booksElements.push(bookItem);
    });


    booksElements.forEach((book) => booksList.append(book));
    mainBlock.append(booksList);

  });
// booksList.addEventListener(`dragstart`, (evt) => {
//   evt.dataTransfer.dropEffect = "copy";
//   evt.target.classList.add(`selected`)
// })
// booksList.addEventListener(`dragend`, (evt) => {
//   evt.target.classList.remove(`selected`)
// });
// booksList.addEventListener(`dragover`, (evt) => {
//   evt.preventDefault();
//   const activeElement = booksList.querySelector('.selected');
//   const currentElement = evt.target;
//   const isMoveable = activeElement !== currentElement && currentElement.classList.contains('book');
//   if (!isMoveable) {
//     return;
//   }
// })

bagLink.ondrop = (evt) => {
  evt.preventDefault();
  const data = JSON.parse(evt.dataTransfer.getData("book"));
  const addButton = document.getElementById(`${data['id']}`).querySelector('.addBookButton')
  addBook(data, addButton)
};
bagLink.ondragover = (evt) => {
  evt.preventDefault();
  evt.dataTransfer.dropEffect = "copy"
}

booksList.classList.add('booksCatalog');

header.prepend(logo, nav);

mainBlock.before(header);
mainBlock.append(popup);

export {
  bagBooks
}
