// all call by id here
const inputField = document.getElementById('input-field');
const searchButton = document.getElementById('search-button')
const bookContainer = document.getElementById('book-container')
const result = document.getElementById('result')
const errorMessage = document.getElementById('error')

// catch input data when button clicked
const search = () => {

    // info message for user wait when button clicked
    const inputText = inputField.value;
    if (inputText !== 0) {
        errorMessage.innerHTML = `You searched for <span class = "fw-bold"> ${inputText} </span>, please wait for load...`
    }

    // fetching data from API
    fetch(`https://openlibrary.org/search.json?q=${inputText}`)
        .then(res => res.json())
        .then(data => displayBook(data.docs))

    // clear input data when search button clicked
    inputField.value = '';
    // clear body data when click on search button
    bookContainer.textContent = '';
    result.textContent = '';
};

// showing data after search button clicked
const displayBook = books => {

    // checking error message
    if (books.length === 0) {
        errorMessage.innerText = 'No result found'
        return errorMessage;
    }

    // slicing books
    const bookSlice = books.slice(0, 25)

    // showing how many results found
    const resultPara = document.createElement('p');
    resultPara.innerHTML = `
        <p class = "fw-light"> ${bookSlice.length} results found <p>
    `
    result.appendChild(resultPara);

    // delete info message when data loaded
    errorMessage.innerHTML = ''

    // adding loaded book details with forEach in body
    bookSlice.forEach(book => {
        // console.log(book)
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