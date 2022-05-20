import { html, nothing } from '../lib.js';
import { search } from '../api/data.js';
import { getUserData } from '../util.js';



const searchTemplate = (cars, onSearch) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">

        ${cars.length == 0
        ? html`<p class="no-cars"> No results.</p>`
        : cars.map(carPreview)}

    </div>
</section>`;


const carPreview = (car) => html`
<div class="listing">
    <div class="preview">
        <img src=${car.imageUrl}>
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${car._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;

export async function searchPage(ctx) {
    //console.log('in search');

    let cars = [];
    ctx.render(searchTemplate(cars, onSearch));

    async function onSearch(event) {
        event.preventDefault();

        const searchElement = document.getElementById('search-input');
        const query = searchElement.value.trim();

        if (query == '') {
            return alert('Please write searcs string!')
        }

        cars = await search(query);
        searchElement.value = '';
        ctx.render(searchTemplate(cars, onSearch));
    }
}