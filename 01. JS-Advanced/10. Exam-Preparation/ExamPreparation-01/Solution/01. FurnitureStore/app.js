window.addEventListener('load', solve);

function solve() {
    const modelField = document.getElementById('model');
    const yearField = document.getElementById('year');
    const descriptionField = document.getElementById('description');
    const priceField = document.getElementById('price');

    const addBtn = document.getElementById('add');
    addBtn.addEventListener('click', addFurniture);

    const furnitureList = document.getElementById('furniture-list');
    const totalPrice = document.querySelector(".total-price");

    function addFurniture(ev) {
        ev.preventDefault();
        const yearValue = Number(yearField.value);
        const priceValue = Number(priceField.value);
        if (modelField.value != "" && descriptionField.value != "" && yearValue > 0 && priceValue > 0) {

            const trVisible = document.createElement('tr')
            trVisible.classList.add("info");
            trVisible.innerHTML = `<td>${modelField.value}</td>
            <td>${priceValue.toFixed(2)}</td>
            <td>
            <button class="moreBtn">More Info</button>
            <button class="buyBtn">Buy it</button>
            </td>`;

            const trInvisible = document.createElement('tr')
            trInvisible.classList.add("hide");
            trInvisible.innerHTML = `<td>Year: ${yearValue}</td>
            <td colspan=3>Description: ${descriptionField.value}</td>`;

            furnitureList.appendChild(trVisible);
            furnitureList.appendChild(trInvisible);

            const buttons = trVisible.querySelectorAll('button');
            buttons[0].addEventListener('click', onMore);
            buttons[1].addEventListener('click', onBuy);

            modelField.value = '';
            yearField.value = '';
            descriptionField.value = '';
            priceField.value = '';
        }
    }

    function onMore(e) {
        const moreInfoTr = e.target.parentElement.parentElement.nextElementSibling;
        if (e.target.textContent == "More Info") {
            e.target.textContent = "Less Info";
            moreInfoTr.style.display = "contents";
        } else {
            e.target.textContent = "More Info";
            moreInfoTr.style.display = "none"
        }
    }
    function onBuy(e) {
        const tr = e.target.parentElement.parentElement;
        const hideTr = tr.nextElementSibling

        hideTr.parentElement.removeChild(hideTr);

        const price = Number(tr.querySelectorAll('td')[1].textContent);
        totalPrice.textContent = (Number(totalPrice.textContent) + price).toFixed(2);

        tr.parentElement.removeChild(tr);
    }
}