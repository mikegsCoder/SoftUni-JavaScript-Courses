import { html } from '../lib.js';
import { search } from '../api/data.js';

const searchTemplate = (articles, onSearch) => html`
<section id="search-page" class="content">
    <h1>Search</h1>
    <form @submit=${onSearch} id="search-form">
        <p class="field search">
            <input id="search-input" type="text" placeholder="Search by article title" name="search">
        </p>
        <p class="field submit">
            <input class="btn submit" type="submit" value="Search">
        </p>
    </form>
    <div class="search-container">

        ${articles.length == 0
            ? html`<h3 class="no-articles">No matching articles</h3>`
            : articles.map(articlePreview)}

    </div>
</section>`;

const articlePreview = (erticle) => html`
<a class="article-preview" href="/details/${erticle._id}">
    <article>
        <h3>Topic: <span>${erticle.title}</span></h3>
        <p>Category: <span>${erticle.category}</span></p>
    </article>
</a>`;

export async function searchPage(ctx) {
    let articles = [];
    ctx.render(searchTemplate(articles, onSearch));

    async function onSearch(event) {
        event.preventDefault();

        const searchElement = document.getElementById('search-input');
        const query = searchElement.value.trim();

        if (query == '') {
            return alert('Please write searcs string!')
        }

        articles = await search(query);
        searchElement.value = '';
        ctx.render(searchTemplate(articles, onSearch));
    }
}