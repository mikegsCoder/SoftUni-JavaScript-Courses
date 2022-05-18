import { html, nothing } from '../lib.js';
import { getMyItems } from '../api/data.js';
import { getUserData } from '../util.js';

const profileTemplate = (theaters, email) => html`
<section id="profilePage">
    <div class="userInfo">
        <div class="avatar">
            <img src="./images/profilePic.png">
        </div>
        <h2>${email}</h2>
    </div>
    <div class="board">

        ${theaters.length == 0
        ? html` 
        <div class="no-events">
            <p>This user has no events yet!</p>
        </div>`
        : theaters.map(thaterPreview)}

    </div>
</section>`;

const thaterPreview = (theater) => html`
<div class="eventBoard">
    <div class="event-info">
        <img src=${theater.imageUrl}>
        <h2>${theater.title}</h2>
        <h6>${theater.date}</h6>
        <a href="/details/${theater._id}" class="details-button">Details</a>
    </div>
</div>`;

export async function profilePage(ctx) {
    const userData = getUserData();
    const email = userData.email;
    const theaters = await getMyItems(userData.id);
    
    ctx.render(profileTemplate(theaters, email));
}