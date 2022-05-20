import { html, nothing } from '../lib.js';
import { deleteCar, getCarById } from '../api/data.js';
import { getUserData } from '../util.js';

const detailsTemplate = (car, isOwner, onDelete) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${car.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}$</li>
        </ul>
        <p class="description-para">${car.description}</p>
        ${carControlsTemplate(car, isOwner, onDelete)}
    </div>
</section>`;

const carControlsTemplate = (car, isOwner, onDelete) => {
    if (isOwner) {
        return html`
            <div class="listings-buttons">
                <a href="/edit/${car._id}" class="button-list">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>
            </div>`
    } else {
        return nothing;
    }
};

export async function detailsPage(ctx) {

    const userData = getUserData();
    const car = await getCarById(ctx.params.id);
    const isOwner = userData && userData.id == car._ownerId;

    ctx.render(detailsTemplate(car, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete this car?`);

        if (choice) {
            await deleteCar(ctx.params.id);
            ctx.page.redirect('/catalog');
        }
    }
}