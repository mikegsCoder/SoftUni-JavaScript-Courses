function solve() {
    let tbodyElement = document.getElementById('tbody');
    let budgetElement = document.getElementById('sum');

    let firstNameInput = document.getElementById('fname');
    let lastNameInput = document.getElementById('lname');
    let emailInput = document.getElementById('email');
    let dateInput = document.getElementById('birth');
    let positionInput = document.getElementById('position');
    let salaryInput = document.getElementById('salary');

    let hireBtn = document.getElementById('add-worker');
    hireBtn.addEventListener('click', onHire);

    function onHire(ev) {
        ev.preventDefault();

        let firstName = firstNameInput.value.trim();
        let lastName = lastNameInput.value.trim();
        let email = emailInput.value.trim();
        let date = dateInput.value.trim();
        let position = positionInput.value.trim();
        let salary = salaryInput.value.trim();

        let budget = Number(budgetElement.textContent);

        firstNameInput.value = '';
        lastNameInput.value = '';
        emailInput.value = '';
        dateInput.value = '';
        positionInput.value = '';
        salaryInput.value = '';

        if (firstName === '' || lastName === '' || email === '' || date === '' || position === '' || salary === '') {
            return;
        }

        let firedBtn = e('button', { class: 'fired' }, 'Fired');
        let editBtn = e('button', { class: 'edit' }, 'Edit');

        firedBtn.addEventListener('click', onFired);
        editBtn.addEventListener('click', onEdit);

        let trElement = e('tr', {},
            e('td', {}, firstName),
            e('td', {}, lastName),
            e('td', {}, email),
            e('td', {}, date),
            e('td', {}, position),
            e('td', {}, salary),
            firedBtn, editBtn
        );

        tbodyElement.appendChild(trElement);

        budgetElement.textContent = (budget + Number(salary)).toFixed(2);

        function onFired(ev) {
            ev.preventDefault();

            ev.currentTarget.parentNode.remove()
            budgetElement.textContent = (Number(budgetElement.textContent) - Number(salary)).toFixed(2);
        }

        function onEdit(ev) {
            ev.preventDefault();

            ev.currentTarget.parentNode.remove()

            firstNameInput.value = firstName;
            lastNameInput.value = lastName;
            emailInput.value = email;
            dateInput.value = date;
            positionInput.value = position;
            salaryInput.value = salary;

            budgetElement.textContent = (Number(budgetElement.textContent) - Number(salary)).toFixed(2);
        }
    }

    function e(type, attr, ...content) {
        const element = document.createElement(type);

        for (const prop in attr) {
            if (prop === 'class') {
                attr[prop].split(' ').forEach(x => element.classList.add(x));
            } else {
                element.setAttribute(prop, attr[prop]);
            }
        }

        for (let item of content) {
            if (typeof item == 'string' || typeof item == 'number') {
                item = document.createTextNode(item);
            }

            element.appendChild(item);
        }

        return element;
    }

}
solve()