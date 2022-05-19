import { html, nothing } from '../lib.js';
import { deleteItem, getItemById, getCommentsByItemId, commentItem } from '../api/data.js';
import { getUserData } from '../util.js';


const detailsTemplate = (game, isOwner, onDelete, comments, hasUser, onComment) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${game.imageUrl} />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>

        <p class="text">${game.summary}</p>

        <div class="details-comments">
            <h2>Comments:</h2>

                ${comments.length == 0
                ? html`<p class="no-comment">No comments.</p>`
                : html`<ul>${comments.map(commentPreview)}</ul>`}

        </div>

        ${gameControlTemplate(game, isOwner, onDelete)}

    </div>

    ${commentControlTemplate(isOwner, hasUser, onComment)}

</section>`;

const commentPreview = (comment) => html`
<li class="comment">
    <p>Content: ${comment.comment}</p>
</li>`;


const gameControlTemplate = (game, isOwner, onDelete) => {
    if (isOwner) {
        return html`
        <div class="buttons">
            <a href="/edit/${game._id}" class="button">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
        </div>`

    } else {
        return nothing;
    }
};

const commentControlTemplate = (isOwner, hasUser, onComment) => {
    if (hasUser && !isOwner) {
        return html`
            <article class="create-comment">
                <label>Add new comment:</label>
                <form @submit=${onComment} class="form">
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input class="btn submit" type="submit" value="Add Comment">
                </form>
            </article>`;
    } else {
        return nothing;
    }
}

export async function detailsPage(ctx) {
    const userData = getUserData();
    const [game, comments] = await Promise.all([
        getItemById(ctx.params.id),
        getCommentsByItemId(ctx.params.id)
    ]);

    console.log(comments);

    const hasUser = Boolean(userData);
    const isOwner = userData && userData.id == game._ownerId;

    ctx.render(detailsTemplate(game, isOwner, onDelete, comments, hasUser, onComment));

    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete this game?`);

        if (choice) {
            await deleteItem(ctx.params.id);
            ctx.page.redirect('/');
        }
    }

    async function onComment(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const comment = formData.get('comment').trim();

        await commentItem(ctx.params.id, comment);
        ev.target.reset();
        ctx.page.redirect('/details/' + ctx.params.id);
    }
}