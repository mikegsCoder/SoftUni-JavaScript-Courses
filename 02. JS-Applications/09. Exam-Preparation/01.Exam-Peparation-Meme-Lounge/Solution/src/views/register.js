import { html } from '../lib.js';
import { register } from '../api/data.js';
import { notify } from '../notify.js';

// const registerTemplate = (onSubmit) => html`
// <section id="register-page" class="register">
//     <form @submit=${onSubmit} id="register-form" action="" method="">
//         <fieldset>
//             <legend>Register Form</legend>
//             <p class="field">
//                 <label for="email">Email</label>
//                 <span class="input">
//                     <input type="text" name="email" id="email" placeholder="Email">
//                 </span>
//             </p>
//             <p class="field">
//                 <label for="password">Password</label>
//                 <span class="input">
//                     <input type="password" name="password" id="password" placeholder="Password">
//                 </span>
//             </p>
//             <p class="field">
//                 <label for="repeat-pass">Repeat Password</label>
//                 <span class="input">
//                     <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
//                 </span>
//             </p>
//             <input class="button submit" type="submit" value="Register">
//         </fieldset>
//     </form>
// </section>`;

const registerTemplate = (onSubmit) => html`
<section id="register">
    <form @submit=${onSubmit} id="register-form">
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="/login">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const username = formData.get('username').trim();
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repass = formData.get('repeatPass').trim();
        const gender = formData.get('gender').trim();

        if (username == '' || email == '' || password == '' || repass == '' || gender == '') {
            return notify('Please fill all fields!');
        }

        if (password != repass) {
            return notify('Passwords don\'t match!');
        }

        await register(username, email, password, gender);

        ctx.updateUserNav();
        ctx.page.redirect('/catalog');
    }
}