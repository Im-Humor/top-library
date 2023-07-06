let myLibrary = [];

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(author, title, pages, read) {
    const book1 = new Book(author, title, pages, read)
    myLibrary.push(book1)
}

librarySide = document.querySelector(".library-side");

addBookToLibrary("JK Rowling", "Harry Potter", 300, 0);
addBookToLibrary("Dune Man", "Dune", 1000, 0);


for (let x = 0; x < myLibrary.length; x++) {
    const newCard = document.createElement("div");
    newCard.classList.add('card');

    const newList = document.createElement("ul");

    for (let y in myLibrary[x]) {
        if (myLibrary[x][y] == 0) {
            myLibrary[x][y] = "No"
        }
        else if (myLibrary[x][y] == 1) {
            myLibrary[x][y] = "Yes"
        }
        const listItem = document.createElement("li");
        const itemText = document.createTextNode(y + ": " + myLibrary[x][y]);
        listItem.appendChild(itemText);
        newList.appendChild(listItem);
    }

    newCard.appendChild(newList);

    librarySide.appendChild(newCard);
}

