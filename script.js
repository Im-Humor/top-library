let myLibrary = [];

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

//I made this a prototype function because the lesson said to
//but I don't use 'this' or anything that allows it to be reusable
// upon review i don't think prototypes use 'this', maybe
Book.prototype.readBook = function(title) {
    newTitle = title.slice(5)
    const objectPos = myLibrary.findIndex(item => item.title == newTitle);
    myLibrary[objectPos].read = Boolean(1 - myLibrary[objectPos].read);
    updateCards();
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

function removeBook(title) {
    newTitle = title.slice(4)
    const objectPos = myLibrary.findIndex(item => item.title == newTitle);
    myLibrary.splice(objectPos, 1);
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
    
        const libFields = ['author', 'title', 'pages', 'read'];
        for (let y = 0; y < libFields.length; y++) {
            let iterField = myLibrary[x][libFields[y]];
            const listItem = document.createElement("li");
            const itemText = document.createTextNode(libFields[y] + ": " + iterField);
            listItem.appendChild(itemText);
            newList.appendChild(listItem);
        }
    
        newCard.appendChild(newList);

        //add delete button to each object's card
        //assign an id to the card of the title
        //add listener to remove event's target by ID
        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("type", "button");
        deleteButton.innerText = "X";
        deleteButton.setAttribute("id", `del-${myLibrary[x].title}`)
        deleteButton.addEventListener("click", event => {
            removeBook(event.target.id);
        })
        newCard.appendChild(deleteButton);

        //lol the below works but adjust to use
        //true / false and remove weird branching
        const readButton = document.createElement("button");
        readButton.setAttribute("type", "button");
        readButton.innerText = "Read?";
        readButton.setAttribute("id", `read-${myLibrary[x].title}`);
        readButton.addEventListener("click", event => {
            myLibrary[x].readBook(event.target.id);
        })
        newCard.appendChild(readButton);

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
    document.getElementById("Page count").value, (document.getElementById("Been read?").value === "true"))`);
    
    bookForm.appendChild(submitButton);

    formSide.appendChild(bookForm);

}

