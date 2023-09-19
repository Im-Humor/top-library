class Book {
  constructor(author, title, pages, read_status) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read_status = read_status;
    this.book_id = Math.floor(Math.random() * 1000000);
  }
}

//modularize card creation into BookCard class?

libraryInventory = [];

const library = (() => {
  const libraryContainer = document.querySelector(".library-container");
  const refreshLibrary = () => {
    libraryContainer.innerHTML = "";
    for (let x = 0; x < libraryInventory.length; x++) {
      const newCard = document.createElement("div");
      newCard.classList.add("book-card");
      const newCardAuthor = document.createElement("div");
      newCardAuthor.classList.add("book-author");
      newCardAuthor.innerText = libraryInventory[x]["author"];
      const newCardTitle = document.createElement("div");
      newCardTitle.classList.add("book-title");
      newCardTitle.innerText = libraryInventory[x]["title"];
      const newCardPages = document.createElement("div");
      newCardPages.classList.add("book-pages");
      newCardPages.innerText = libraryInventory[x]["pages"];
      const newCardReadStatus = document.createElement("div");
      newCardReadStatus.classList.add("book-read-status");
      newCardReadStatus.innerText = libraryInventory[x]["read_status"];
      const newCardId = document.createElement("div");
      newCardId.classList.add("book-id");
      newCardId.innerText = libraryInventory[x]["book_id"];
      const newCardDeleteButton = document.createElement("button");
      newCardDeleteButton.setAttribute("type", "button");
      newCardDeleteButton.innerText = "delete";

      const deleteFunction = (event) => {
        let objectId =
          event.target.parentNode.querySelector(".book-id").innerText;
        let bookLoc = libraryInventory.findIndex(
          (book) => book.book_id == objectId
        );
        libraryInventory.splice(bookLoc, 1);
        event.target.removeEventListener("click", deleteFunction);
        refreshLibrary();
      };
      newCardDeleteButton.addEventListener("click", deleteFunction);
      newCard.appendChild(newCardAuthor);
      newCard.appendChild(newCardTitle);
      newCard.appendChild(newCardPages);
      newCard.appendChild(newCardReadStatus);
      newCard.appendChild(newCardId);
      newCard.appendChild(newCardDeleteButton);
      libraryContainer.appendChild(newCard);
    }
  };

  return { refreshLibrary };
})();

const bookForm = (() => {
  const submitButton = document.getElementById("submit_button");
  let authorField = document.getElementById("book_author");
  let titleField = document.getElementById("book_title");
  let pagesField = document.getElementById("book_pages");
  let readStatusField = document.getElementById("book_read_status");

  const addToLibrary = (event) => {
    let missingFields = 0;
    [authorField, titleField, pagesField, readStatusField].forEach(
      (element) => {
        if (element.validity.valueMissing) {
          missingFields += 1;
        }
      }
    );
    if (missingFields == 0) {
      let newBook = new Book(
        authorField.value,
        titleField.value,
        pagesField.value,
        readStatusField.value
      );
      libraryInventory.push(newBook);
    } else {
      return;
    }
    library.refreshLibrary();
  };
  return { submitButton, addToLibrary };
})();

bookForm.submitButton.addEventListener("click", bookForm.addToLibrary);

library.refreshLibrary();
