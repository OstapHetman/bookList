// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI() {

}

// Prototype Add Book To List
UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
}

// Show Alert
UI.prototype.showAlert = function(msg, className) {
    // Create div
    const div = document.createElement('div');
    // Add class
    div.className = `alert ${className}`;
    // Add Text
    div.appendChild(document.createTextNode(msg));
    // Get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    // Insert alert
    container.insertBefore(div, form);

    // Timeout after 2s
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 2000);
}

// Delete books
UI.prototype.deleteBook = function(target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

// Clear fields
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Event Listener for Add Book
document.getElementById('book-form').addEventListener('submit', function(e) {
    // Get Form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    // Instantiate book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if (title === '' || author === '' || isbn === '') {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Add book to list
        ui.addBookToList(book);

        // Show success
        ui.showAlert('Book Added', 'success');

        // Clear fields
        ui.clearFields();
    }
    e.preventDefault();
});

// Event Listener for Delete
document.getElementById('book-list').addEventListener('click',
    function(e) {
        // Instantiate UI
        const ui = new UI();

        // Delete Book
        ui.deleteBook(e.target);

        // Show Alert
        ui.showAlert('Book Removed', 'success')

        e.preventDefault();
    });