// Update this line in your script.js
const API_URL = 'http://localhost:5555/books';

// Rest of your JavaScript code remains the same
//const API_URL = 'http://localhost:5555/books';

// Function to fetch all books
async function fetchBooks() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        displayBooks(data.data);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

// Function to display books
function displayBooks(books) {
    const bookList = document.getElementById('books');
    bookList.innerHTML = '';
    books.forEach(book => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${book.title}</strong> by ${book.author} (${book.publisherYear})
            <button class="delete-btn" data-id="${book._id}">Delete</button>
        `;
        bookList.appendChild(li);
    });
}

// Function to add a new book
async function addBook(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const publisherYear = document.getElementById('publisherYear').value;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, author, publisherYear }),
        });
        if (response.ok) {
            fetchBooks();
            document.getElementById('add-book-form').reset();
        }
    } catch (error) {
        console.error('Error adding book:', error);
    }
}

// Function to delete a book
async function deleteBook(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            fetchBooks();
        }
    } catch (error) {
        console.error('Error deleting book:', error);
    }
}

// Event listeners
document.getElementById('add-book-form').addEventListener('submit', addBook);
document.getElementById('books').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        deleteBook(e.target.dataset.id);
    }
});

// Initial fetch of books
fetchBooks();