import { html } from '../lib.js';
import { getMyItems } from '../api/data.js';
import { getUserData } from '../util.js';

// const myPetsTemplate = (pets, userData) => html`
// <section id="my-books-page" class="my-books">
//     <h1>My Books</h1>

//         ${books.length == 0 
//             ? html`<p class="no-books">No books in database!</p>`
//             : html`<ul class="my-books-list">${books.map(bookPreview)}</ul>`}

// </section>`;

const profileTemplate = (memes, userData) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/${userData.gender}.png">
        <div class="user-content">
            <p>Username: ${userData.username}</p>
            <p>Email: ${userData.email}</p>
            <p>My memes count: ${memes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">

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
<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
    <a class="button" href="/details/${meme._id}">Details</a>
</div>`;

export async function profilePage(ctx) {
    const userData = getUserData();
    const memes = await getMyItems(userData.id);
    
    ctx.render(profileTemplate(memes, userData));
}