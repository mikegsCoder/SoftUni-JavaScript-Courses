class LibraryCollection {
    constructor(capacity) {
        this.capacity = capacity;
        this.books = [];
    }

    addBook(bookName, bookAuthor) {
        if (this.books.length >= this.capacity) {
            throw new Error(`Not enough space in the collection.`);
        }

        let book = {
            bookName,
            bookAuthor,
            payed: false
        }

        this.books.push(book);

        return `The ${bookName}, with an author ${bookAuthor}, collect.`;
    }

    payBook(bookName) {
        let book = this.books.find(x => x.bookName == bookName);

        if (!book) {
            throw new Error(`${bookName} is not in the collection.`);
        }

        if (book.payed) {
            throw new Error(`${bookName} has already been paid.`);
        }

        book.payed = true;

        return `${bookName} has been successfully paid.`
    }

    removeBook(bookName) {
        let book = this.books.find(x => x.bookName == bookName);

        if (!book) {
            throw new Error(`The book, you're looking for, is not found.`);
        }

        if (!book.payed) {
            throw new Error(`${bookName} need to be paid before removing from the collection.`);
        }

        this.books = this.books.filter(x => x.bookName != bookName);

        return `${bookName} remove from the collection.`;
    }

    getStatistics(bookAuthor) {
        if (!bookAuthor) {
            let result = [];

            result.push(`The book collection has ${this.capacity - this.books.length} empty spots left.`);
            this.books.sort((a, b) => a.bookName.localeCompare(b.bookName));
            this.books.forEach(x => result.push(`${x.bookName} == ${x.bookAuthor} - ${x.payed ? 'Has Paid' : 'Not Paid'}.`));

            return result.join('\n');
        } else {
            if (!this.books.some(x => x.bookAuthor == bookAuthor)) {
                throw new Error(`${bookAuthor} is not in the collection.`);
            } else {
                let result = [];

                let booksToReturn = this.books.filter(x => x.bookAuthor == bookAuthor);

                booksToReturn.forEach(x => result.push(`${x.bookName} == ${bookAuthor} - ${x.payed ? 'Has Paid' : 'Not Paid'}.`));

                return result.join('\n');
            }
        }
    }
}

const library = new LibraryCollection(5)
library.addBook('Don Quixote', 'Miguel de Cervantes');
library.addBook('Don Quixote', 'Miguel de Cervantes');
library.payBook('Don Quixote');
library.addBook('In Search of Lost Time', 'Marcel Proust');
library.addBook('Ulysses', 'James Joyce');
console.log(library.getStatistics());