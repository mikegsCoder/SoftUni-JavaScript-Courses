import { html, nothing } from '../lib.js';
import { deleteItem, getItemById } from '../api/data.js';
import { getUserData } from '../util.js';

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

        </div>
    </div>
</section>`;

const memeControlTemplate = (meme, isOwner, onDelete) => {
    if (isOwner) {
        return html`
            <a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button @click=${onDelete} class="button danger" href="javascript:void(0)">Delete</button>`
    } else {
        return nothing;
    }
};

export async function detailsPage(ctx) {
    const userData = getUserData();
    const meme = await getItemById(ctx.params.id);
    const isOwner = userData && userData.id == meme._ownerId;

    ctx.render(detailsTemplate(meme, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete this meme?`);

        if (choice) {
            await deleteItem(ctx.params.id);
            ctx.page.redirect('/catalog');
        }
    }
}