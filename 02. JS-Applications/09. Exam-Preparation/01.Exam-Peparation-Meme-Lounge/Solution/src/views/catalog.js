import { html } from '../lib.js';
import { getAllItems } from '../api/data.js';
import { getUserData } from '../util.js';

// const myPetsTemplate = (pets, userData) => html`
// <section id="my-books-page" class="my-books">
//     <h1>My Books</h1>

//         ${books.length == 0 
//             ? html`<p class="no-books">No books in database!</p>`
//             : html`<ul class="my-books-list">${books.map(bookPreview)}</ul>`}

// </section>`;

const catalogTemplate = (memes) => html`
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">

        ${memes.length == 0
        ? html`<p class="no-memes">No memes in database.</p>`
        : memes.map(memePreview)}

    </div>
</section>`;

// const bookPreview = (book) => html`
// <li class="otherBooks">
//     <h3>${book.title}</h3>
//     <p>Type: ${book.type}</p>
//     <p class="img"><img src=${book.imageUrl}></p>
//     <a class="button" href="/details/${book._id}">Details</a>
// </li>`;

const memePreview = (meme) => html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${meme.title}</p>
            <img class="meme-image" alt="meme-img" src=${meme.imageUrl}>
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${meme._id}">Details</a>
        </div>
    </div>
</div>`;

export async function catalogPage(ctx) {
    //console.log('in my teathers page')
    const userData = getUserData();
    const memes = await getAllItems();
    //console.log(userData);
    ctx.render(catalogTemplate(memes));
}