import { html, nothing } from '../lib.js';
import { deleteItem, getItemById } from '../api/data.js';
import { getUserData } from '../util.js';

// const detailsTemplate = (theater, isOwner, onDelete, likes, showLikeButton, onLike) => html`
// <section id="detailsPage">
//     <div id="detailsBox">
//         <div class="detailsInfo">
//             <h1>Title: ${theater.title}</h1>
//             <div>
//                 <img src=${theater.imageUrl}>
//             </div>
//         </div>

//         <div class="details">
//             <h3>Theater Description</h3>
//             <p>${theater.description}</p>
//             <h4>Date: ${theater.date}</h4>
//             <h4>Author: ${theater.author}</h4>
//             <div class="buttons">

//                 ${theaterControlsTemplate(theater, isOwner, onDelete)}
//                 ${likeControlTemplate(showLikeButton, onLike)}

//             </div>
//             <p class="likes">Likes: ${likes}</p>
//         </div>
//     </div>
// </section>`;

const detailsTemplate = (meme, isOwner, onDelete) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${meme.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>${meme.description}</p>

            ${memeControlTemplate(meme, isOwner, onDelete)}

            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
            <!-- <a class="button warning" href="#">Edit</a>
            <button class="button danger">Delete</button> -->

        </div>
    </div>
</section>`;

// const petControlsTemplate = (pet, isOwner, onDelete) => {
//     if (isOwner) {
//         return html`
//             <a class="button" href="/edit/${pet._id}">Edit</a>
//             <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>`

//         // <a @click=${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
//         // <a class="btn-edit" href="/edit/${theater._id}">Edit</a>`;
//     } else {
//         return null;
//     }
// };

const memeControlTemplate = (meme, isOwner, onDelete) => {
    if (isOwner) {
        return html`
            <a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button @click=${onDelete} class="button danger" href="javascript:void(0)">Delete</button>`

        // <a @click=${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
        // <a class="btn-edit" href="/edit/${theater._id}">Edit</a>`;
    } else {
        return nothing;
    }
};

// const likeControlTemplate = (showLikeButton, onLike) => {
//     if (showLikeButton) {
//         return html`<a @click=${onLike} class="btn-like" href="javascript:void(0)">Like</a>`;
//         // return html`<a @click=${onLike} class="btn-like" href="javascript:void(0)">Like</a>`;
//     } else {
//         return nothing;
//     }
// };

export async function detailsPage(ctx) {
    const userData = getUserData();
    // const [theater, likes, hasLike] = await Promise.all([
    //     getItemById(ctx.params.id),
    //     getLikesByItemId(ctx.params.id),
    //     userData ? getMyLikeByItemId(ctx.params.id, userData.id) : 0
    // ]);

    const meme = await getItemById(ctx.params.id);

    const isOwner = userData && userData.id == meme._ownerId;
    // const showLikeButton = userData != null && isOwner == false && hasLike == false;

    ctx.render(detailsTemplate(meme, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete this meme?`);

        if (choice) {
            await deleteItem(ctx.params.id);
            ctx.page.redirect('/catalog');
        }
    }

    // async function onLike() {
    //     await likeItem(ctx.params.id);
    //     ctx.page.redirect('/details/' + ctx.params.id);
    // }
}