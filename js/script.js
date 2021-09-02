// all call by id here
const inputField = document.getElementById('input-field');
const searchButton = document.getElementById('search-button')
const bookContainer = document.getElementById('book-container')
const result = document.getElementById('result')
const errorMessage = document.getElementById('error')

const search = () => {
    const inputText = inputField.value;
    fetch(`https://openlibrary.org/search.json?q=${inputText}`)
        .then(res => res.json())
        .then(data => displayBook(data.docs))
};

const displayBook = books => {

    // checking error message
    if (books.length === 0) {
        errorMessage.innerText = 'No result found'
        resultPara.innerHTML = ''
    }

    // slicing books
    const bookSlice = books.slice(0, 20)

    // showing how many results found
    const resultPara = document.createElement('p');
    resultPara.innerHTML = `
        <p> ${bookSlice.length} result found <p>
    `
    result.appendChild(resultPara);

    bookSlice.forEach(book => {
        console.log(book)
        const bookDiv = document.createElement('div')
        bookDiv.classList.add('col')

        bookDiv.innerHTML = `
        <div class="card h-100">
            <img class = "img-fluid" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">By: ${book.author_name}</p>
                <p class="card-text">Published: ${book.first_publish_year}</p>
            </div>
        </div>
        `
        bookContainer.appendChild(bookDiv);
    })

}