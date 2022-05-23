import { html, nothing } from '../lib.js';
import { getMyItems } from '../api/data.js';
import { getUserData } from '../util.js';



const profileTemplate = (pets) => html`
<section id="my-pets-page" class="my-pets">
    <h1>My Pets</h1>

    ${pets.length == 0
        ? html`<p class="no-pets">No pets in database!</p>`
        : html`<ul class="my-pets-list">${pets.map(petPreview)}</ul>`}

    <!-- Display ul: with list-items for every user's pet (if any) -->
    <!-- <ul class="my-pets-list">
        <li class="otherPet">
            <h3>Name: Milo</h3>
            <p>Type: dog</p>
            <p class="img"><img src="/images/dog.png"></p>
            <a class="button" href="#">Details</a>
        </li>
        <li class="otherPet">
            <h3>Name: Tom</h3>
            <p>Type: cat</p>
            <p class="img"><img src="/images/cat1.png"></p>
            <a class="button" href="#">Details</a>
        </li>
    </ul> -->

    <!-- Display paragraph: If the user doesn't have his own pets  -->
    <!-- <p class="no-pets">No pets in database!</p> -->
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
    //console.log(userData);
    ctx.render(profileTemplate(pets));
}