import { html } from '../lib.js';
import { getMyItems } from '../api/data.js';
import { getUserData } from '../util.js';

const profileTemplate = (pets) => html`
<section id="my-pets-page" class="my-pets">
    <h1>My Pets</h1>

    ${pets.length == 0
        ? html`<p class="no-pets">No pets in database!</p>`
        : html`<ul class="my-pets-list">${pets.map(petPreview)}</ul>`}

</section>`;

const petPreview = (pet) => html`
<li class="otherPet">
    <h3>Name: ${pet.name}</h3>
    <p>Type: ${pet.type}</p>
    <p class="img"><img src=${pet.imageUrl}></p>
    <a class="button" href="/details/${pet._id}">Details</a>
</li>`;

export async function profilePage(ctx) {
    const userData = getUserData();
    const pets = await getMyItems(userData.id);

    ctx.render(profileTemplate(pets));
}