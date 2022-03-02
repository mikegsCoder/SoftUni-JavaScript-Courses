window.addEventListener('load', solution);

function solution() {
    let nameInput = document.getElementById('fname');
    let emailInput = document.getElementById('email');
    let phoneInput = document.getElementById('phone');
    let addressInput = document.getElementById('address');
    let codeInput = document.getElementById('code');

    let previewSection = document.getElementById('infoPreview');
    let blockDiv = document.getElementById('block');

    let submitBtn = document.getElementById('submitBTN');
    let editBtn = document.getElementById('editBTN');
    let continueBtn = document.getElementById('continueBTN');

    submitBtn.addEventListener('click', onSubmit);

    function onSubmit(ev) {
        ev.preventDefault();

        let name = nameInput.value.trim();
        let email = emailInput.value.trim();
        let phone = phoneInput.value.trim();
        let address = addressInput.value.trim();
        let code = codeInput.value.trim();

        if (name === '' || email === '') {
            return;
        }

        let nameLi = e('li', {}, `Full Name: ${name}`);
        let emailLi = e('li', {}, `Email: ${email}`);
        let phoneLi = e('li', {}, `Phone Number: ${phone}`);
        let addressLi = e('li', {}, `Address: ${address}`);
        let codeLi = e('li', {}, `Postal Code: ${code}`);

        previewSection.appendChild(nameLi);
        previewSection.appendChild(emailLi);
        previewSection.appendChild(phoneLi);
        previewSection.appendChild(addressLi);
        previewSection.appendChild(codeLi)

        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
        addressInput.value = '';
        codeInput.value = '';

        submitBtn.disabled = true;
        editBtn.disabled = false;
        continueBtn.disabled = false;

        editBtn.addEventListener('click', onEdit);
        continueBtn.addEventListener('click', onContinue);

        function onEdit(ev) {
            ev.preventDefault();

            submitBtn.disabled = false;
            editBtn.disabled = true;
            continueBtn.disabled = true;

            nameInput.value = name;
            emailInput.value = email;
            phoneInput.value = phone;
            addressInput.value = address;
            codeInput.value = code;

            previewSection.innerHTML = '';
        }

        function onContinue(ev) {
            ev.preventDefault();
            blockDiv.innerHTML = '';
            blockDiv.appendChild(e('h3', {}, 'Thank you for your reservation!'));
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