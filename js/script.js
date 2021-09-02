// all call by id here
const inputField = document.getElementById('input-field');
const searchButton = document.getElementById('search-button')
const bookContainer = document.getElementById('book-container')
const result = document.getElementById('result')
const errorMessage = document.getElementById('error')

const search = () => {

    const inputText = inputField.value;
    if (inputText !== 0) {
        errorMessage.innerHTML = `You searched for <span class = "fw-bold"> ${inputText} </span>, please wait for load...`
    }
    fetch(`https://openlibrary.org/search.json?q=${inputText}`)
        .then(res => res.json())
        .then(data => displayBook(data.docs))

    // clear input data
    inputField.value = '';
    // clear data when again click
    bookContainer.textContent = '';
    result.textContent = '';
};


const displayBook = books => {

    // checking error message
    if (books.length === 0) {
        errorMessage.innerText = 'No result found'
        resultPara.innerHTML = ''
    }


    // slicing books
    const bookSlice = books.slice(0, 25)

    // showing how many results found
    const resultPara = document.createElement('p');
    resultPara.innerHTML = `
        <p class = "fw-light"> ${bookSlice.length} results showing from ${books.length} results <p>
    `
    result.appendChild(resultPara);

    // delete info message when data loaded
    errorMessage.innerHTML = ''

    // 
    bookSlice.forEach(book => {
        console.log(book)
        const bookDiv = document.createElement('div')
        bookDiv.classList.add('col')

        bookDiv.innerHTML = `
        <div class="card h-100">
            <img
            style = "width: 200px; height:300px"
             class = "img-fluid rounded mx-auto d-block" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">By: ${book.author_name}</p>
                <p class="card-text">Publisher: ${book.publisher[0]}</p>
                <p class="card-text">Published: ${book.first_publish_year}</p>
            </div>
        </div>
        `
        bookContainer.appendChild(bookDiv);
    })

}