import { html, nothing } from '../lib.js';
import { getAllBooks } from '../api/data.js';



const homeTemplate = (books) => html`
<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>

    ${books.length == 0
    ? html`<p class="no-books">No books in database!</p>`
    : html`<ul class="other-books-list">${books.map(bookPreview)}</ul>`}

    <!-- Display ul: with list-items for All books (If any) -->
    <!-- <ul class="other-books-list">
        <li class="otherBooks">
            <h3>A Court of Thorns and Roses</h3>
            <p>Type: Fiction</p>
            <p class="img"><img src="./images/book1.png"></p>
            <a class="button" href="#">Details</a>
        </li>

        <li class="otherBooks">
            <h3>Outlander</h3>
            <p>Type: Other</p>
            <p class="img"><img src="/images/book2.png"></p>
            <a class="button" href="#">Details</a>
        </li>

        <li class="otherBooks">
            <h3>To Kill a Mockingbird</h3>
            <p>Type: Classic</p>
            <p class="img"><img src="/images/book3.png"></p>
            <a class="button" href="#">Details</a>
        </li>
    </ul> -->
    <!-- Display paragraph: If there are no books in the database -->
    <!-- <p class="no-books">No books in database!</p> -->
</section>`;


const bookPreview = (book) => html`
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl}></p>
    <a class="button" href="/details/${book._id}">Details</a>
</li>`;

export async function homePage(ctx) {
    const books = await getAllBooks();
    //console.log(books);
    ctx.render(homeTemplate(books));
}