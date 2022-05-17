import { html } from '../lib.js';
import { editItem, getItemById } from '../api/data.js';
import { notify } from '../notify.js';

// const editTemplate = (book, onSubmit) => html`
// <section id="edit-page" class="edit">
//     <form @submit=${onSubmit} id="edit-form" action="#" method="">
//         <fieldset>
//             <legend>Edit my Book</legend>
//             <p class="field">
//                 <label for="title">Title</label>
//                 <span class="input">
//                     <input type="text" name="title" id="title" .value=${book.title}>
//                 </span>
//             </p>
//             <p class="field">
//                 <label for="description">Description</label>
//                 <span class="input">
//                     <textarea name="description" id="description" .value=${book.description}></textarea>
//                 </span>
//             </p>
//             <p class="field">
//                 <label for="image">Image</label>
//                 <span class="input">
//                     <input type="text" name="imageUrl" id="image" .value=${book.imageUrl}>
//                 </span>
//             </p>
//             <p class="field">
//                 <label for="type">Type</label>
//                 <span class="input">
//                     <select id="type" name="type" .value=${book.type}>
//                         <option value="Fiction">Fiction</option>
//                         <option value="Romance">Romance</option>
//                         <option value="Mistery">Mistery</option>
//                         <option value="Classic">Clasic</option>
//                         <option value="Other">Other</option>
//                     </select>
//                 </span>
//             </p>
//             <input class="button submit" type="submit" value="Save">
//         </fieldset>
//     </form>
// </section>`;

const editTemplate = (meme, onSubmit) => html`
<section id="edit-meme">
    <form @submit=${onSubmit} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description">
                ${meme.description}</textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>`;

export async function editPage(ctx) {
    const meme = await getItemById(ctx.params.id);
    //console.log(theater);
    ctx.render(editTemplate(meme, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const title = formData.get('title').trim();
        // const date = formData.get('date').trim();
        // const author = formData.get('author').trim();
        const description = formData.get('description').trim();
        const imageUrl = formData.get('imageUrl').trim();

        //if( formData.values().some(x => x == ''))
        if (title == '' || description == '' || imageUrl == '') {
            return notify('All fields are required!');
        }

        await editItem(ctx.params.id, {
            title,
            description,
            imageUrl
        });

        ctx.page.redirect('/details/' + ctx.params.id);
    }
}