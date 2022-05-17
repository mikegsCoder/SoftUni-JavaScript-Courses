import { html } from '../lib.js';
import { login } from '../api/data.js';
import { notify } from '../notify.js';

// const loginTemplate = (onSubmit) => html`
// <section id="login-page" class="login">
//     <form @submit=${onSubmit} id="login-form" action="" method="">
//         <fieldset>
//             <legend>Login Form</legend>
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
//             <input class="button submit" type="submit" value="Login">
//         </fieldset>
//     </form>
// </section>`;

const loginTemplate = (onSubmit) => html`
<section id="login">
    <form @submit=${onSubmit} id="login-form">
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="/register">Sign up</a>.</p>
            </div>
        </div>
    </form>
</section>`;

export function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        if (email == '' || password == '') {
            return notify('Please fill both fields!');
            // return alert('Please fill both fields!');
        }

        await login(email, password);
        ctx.updateUserNav();
        ctx.page.redirect('/catalog');
    }
}