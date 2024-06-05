class Book {
    constructor(id, title, author, genre, borrowed, publication_year) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.borrowed = borrowed;
        this.publication_year = publication_year;
    }
}

module.exports = Book;
