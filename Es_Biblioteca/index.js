//Vettori gestione dati
var books = [];
var users = [];
var loans = [];
//login
document.getElementById('login-form').onsubmit = function() {
    var email = document.getElementById('email').value;
    if (email !== "") {
        users.push(email);
        alert('Accesso effettuato!');
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('menu').style.display = 'block';
    }
    return false;
}
document.getElementById('menu').children[0].onclick = function() {
    document.getElementById('inserisci-libro').style.display = 'block';
    document.getElementById('prendi-libro').style.display = 'none';
}
document.getElementById('menu').children[1].onclick = function() {
    document.getElementById('inserisci-libro').style.display = 'none';
    document.getElementById('prendi-libro').style.display = 'block';
}
//inserimento libro
document.getElementById('inserisci-libro-form').onsubmit = function() {
    var title = document.getElementById('title').value;
    var genre = document.getElementById('genre').value;
    var publicationDate = new Date(document.getElementById('publication-date').value);

    books.push({ title: title, genre: genre, publicationDate: publicationDate });
    updateBookList();
    alert('Libro inserito con successo!');
    return false;
}
function updateBookList() {
    var bookTitleSelect = document.getElementById('book-title');
    bookTitleSelect.innerHTML = '';

    for (var i = 0; i < books.length; i++) {
        var book = books[i];
        var option = document.createElement('option');
        option.value = book.title;
        option.text = book.title + " (" + book.genre + ", " + book.publicationDate.toDateString() + ")";
        bookTitleSelect.add(option);
    }
}
//Gestione del prestito di un libro
document.getElementById('prendi-libro-form').onsubmit = function() {
    var bookTitle = document.getElementById('book-title').value;
    var email = users[users.length - 1];
    var loanDate = new Date();
    var returnDate = new Date(loanDate);
    returnDate.setDate(loanDate.getDate() + 14);
    loans.push({ bookTitle: bookTitle, email: email, loanDate: loanDate, returnDate: returnDate });
    alert('Libro preso in prestito con successo!');
    return false;
}
//Ordinamenti Libri
document.getElementById('prendi-libro').children[2].children[0].onclick = function() {
    books.sort(function(a, b) {
        return a.publicationDate - b.publicationDate;
    });
    updateBookList();
}
document.getElementById('prendi-libro').children[2].children[1].onclick = function() {
    books.sort(function(a, b) {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
    });
    updateBookList();
}
document.getElementById('prendi-libro').children[2].children[2].onclick = function() {
    books.sort(function(a, b) {
        if (a.genre < b.genre) return -1;
        if (a.genre > b.genre) return 1;
        return 0;
    });
    updateBookList();
}