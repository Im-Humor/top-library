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

// adds new book object to library at end of array
// and also calls updateCards
function addBookToLibrary(author, title, pages, read) {
    const book1 = new Book(author, title, pages, read);
    myLibrary.push(book1);
    updateCards();
}

// removes existing list of cards (if existant),
// then iterates through myLibrary and adds all
// book cards to the DOM
function updateCards() {
    librarySide.innerHTML="";
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

// on 'add book' button click, button disappears and
// form is added to DOM to accept user input.
// submit button's onclick attribute calls addBookToLibrary function
// to add the form submission information to the form,
// which also updates the visible book cards
function showForm() {
    showButton.style.display = "none";
    const bookForm = document.createElement("form");
    bookForm.classList.add("book-form");

    formFields = ["Author", "Title", "Page count", "Been read?"];

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
    submitButton.innerText = 'Submit';
    submitButton.setAttribute("type", "button");
    submitButton.setAttribute("onclick", `addBookToLibrary(document.getElementById("Author").value, document.getElementById("Title").value,
    document.getElementById("Page count").value, document.getElementById("Been read?").value)`);
    
    bookForm.appendChild(submitButton);

    formSide.appendChild(bookForm);

}

