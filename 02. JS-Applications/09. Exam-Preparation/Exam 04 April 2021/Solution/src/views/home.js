import { html } from '../lib.js';
import { getLatestItems } from '../api/data.js';



const homeTemplate = (jsArticle, csArticle, javaArticle, pyArticle) => html`
<section id="home-page" class="content">
    <h1>Recent Articles</h1>
    <section class="recent js">
        <h2>JavaScript</h2>

        ${jsArticle
        ? articleTemplate(jsArticle)
        : html`<h3 class="no-articles">No articles yet</h3>`}

    </section>
    <section class="recent csharp">
        <h2>C#</h2>

        ${csArticle
        ? articleTemplate(csArticle)
        : html`<h3 class="no-articles">No articles yet</h3>`}

    </section>
    <section class="recent java">
        <h2>Java</h2>

        ${javaArticle
        ? articleTemplate(javaArticle)
        : html`<h3 class="no-articles">No articles yet</h3>`}

    </section>
    <section class="recent python">
        <h2>Python</h2>

        ${pyArticle
        ? articleTemplate(pyArticle)
        : html`<h3 class="no-articles">No articles yet</h3>`}

    </section>
</section>`;



const articleTemplate = (article) => html`
<article>
    <h3>${article.title}</h3>
    <p>${article.content}</p>
    <a href="/details/${article._id}" class="btn details-btn">Details</a>
</article>`;

export async function homePage(ctx) {
    const articles = await getLatestItems();

    const jsArticle = articles.find(x => x.category == 'JavaScript')
    const csArticle = articles.find(x => x.category == 'C#')
    const javaArticle = articles.find(x => x.category == 'Java')
    const pyArticle = articles.find(x => x.category == 'Python')

    ctx.render(homeTemplate(jsArticle, csArticle, javaArticle, pyArticle));
}