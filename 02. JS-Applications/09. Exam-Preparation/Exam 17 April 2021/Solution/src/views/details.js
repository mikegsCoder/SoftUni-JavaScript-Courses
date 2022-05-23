import { html, nothing } from '../lib.js';
import { deleteItem, getItemById, getMyLikeByItemId, likeItem, getLikesByItemId } from '../api/data.js';
import { getUserData } from '../util.js';



const detailsTemplate = (pet, isOwner, onDelete, likes, showLikeButton, onLike) => html`
<section id="details-page" class="details">
    <div class="pet-information">
        <h3>Name: ${pet.name}</h3>
        <p class="type">Type: ${pet.type}</p>
        <p class="img"><img src=${pet.imageUrl}></p>
        <div class="actions">

            ${petControlTemplate(pet, isOwner, onDelete)}

            <!-- Edit/Delete buttons ( Only for creator of this pet )  -->
            <!-- <a class="button" href="#">Edit</a>
            <a class="button" href="#">Delete</a> -->

            ${likeControlTemplate(showLikeButton, onLike)}

            <!-- Bonus -->
            <!-- Like button ( Only for logged-in users, which is not creators of the current pet ) -->
            <!-- <a class="button" href="#">Like</a> -->

            <!-- ( for Guests and Users )  -->
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likes}</span>
            </div>
            <!-- Bonus -->
        </div>
    </div>
    <div class="pet-description">
        <h3>Description:</h3>
        <p>${pet.description}</p>
    </div>
</section>`;



const petControlTemplate = (pet, isOwner, onDelete) => {
    if (isOwner) {
        return html`
            <a class="button" href="/edit/${pet._id}">Edit</a>
            <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>`

        // <a @click=${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
        // <a class="btn-edit" href="/edit/${theater._id}">Edit</a>`;
    } else {
        return nothing;
    }
};

const likeControlTemplate = (showLikeButton, onLike) => {
    if (showLikeButton) {
        return html`<a @click=${onLike} class="button" href="javascript:void(0)">Like</a>`;
    } else {
        return nothing;
    }
};

export async function detailsPage(ctx) {
    const userData = getUserData();
    const [pet, likes, hasLike] = await Promise.all([
        getItemById(ctx.params.id),
        getLikesByItemId(ctx.params.id),
        userData ? getMyLikeByItemId(ctx.params.id, userData.id) : 0
    ]);

    const isOwner = userData && userData.id == pet._ownerId;
    const showLikeButton = userData != null && isOwner == false && hasLike == false;

    ctx.render(detailsTemplate(pet, isOwner, onDelete, likes, showLikeButton, onLike));

    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete this pet?`);

        if (choice) {
            await deleteItem(ctx.params.id);
            ctx.page.redirect('/');
        }
    }

    async function onLike() {
        await likeItem(ctx.params.id);
        ctx.page.redirect('/details/' + ctx.params.id);
    }
}