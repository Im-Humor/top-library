let myLibrary = [];

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

const librarySide = document.querySelector(".library-side");
const formSide = document.querySelector(".form-side")
const showButton = document.querySelector("#book-button")

function addBookToLibrary() {
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
}

function showForm() {
    showButton.style.display = "none";
    const bookForm = document.createElement("form")
    bookForm.classList.add("book-form")

    formFields = ["Author", "Title", "Page count", "Been read?"]

    for (let x = 0; x < formFields.length; x++) {
        const formLabel = document.createElement("label");
        formLabel.textContent = formFields[x];
        formLabel.setAttribute("for", x);
        bookForm.appendChild(formLabel);
        const formInput = document.createElement("input");
        formInput.setAttribute("type", "text");
        formInput.setAttribute("name", formFields[x]);
        formInput.setAttribute("id", formFields[x]);
        bookForm.appendChild(formInput);
    }

    const submitButton = document.createElement("button");
    submitButton.textContent("Submit");
    submitButton.setAttribute("type", "button");
    submitButton.setAttribute("onclick", "")

    

    formSide.appendChild(bookForm)

}






//I think I'll use this when submitting a new book?
//const book1 = new Book(author, title, pages, read)
//myLibrary.push(book1)