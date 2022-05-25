import { html, nothing } from '../lib.js';
import { deleteItem, getItemById } from '../api/data.js';
import { getUserData } from '../util.js';

const detailsTemplate = (article, isOwner, onDelete) => html`
<section id="details-page" class="content details">
    <h1>${article.title}</h1>

    <div class="details-content">
        <strong>Published in category ${article.category}</strong>
        <p>${article.content}</p>

        <div class="buttons">
            ${articleControlsTemplate(article, isOwner, onDelete)}

            <a href="/" class="btn edit">Back</a>
        </div>
    </div>
</section>`;

const articleControlsTemplate = (article, isOwner, onDelete) => {
    if (isOwner) {
        return html`
            <a @click=${onDelete} href="javascript:void(0)" class="btn delete">Delete</a>
            <a href="/edit/${article._id}" class="btn edit">Edit</a>`
    } else {
        return nothing;
    }
};

export async function detailsPage(ctx) {
    const userData = getUserData();

    const article = await getItemById(ctx.params.id);

    const isOwner = userData && userData.id == article._ownerId;

    ctx.render(detailsTemplate(article, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete this article?`);

        if (choice) {
            await deleteItem(ctx.params.id);
            ctx.page.redirect('/');
        }
    }
}