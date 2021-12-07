import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../services/data.js";

const loginTemplate = (onSubmit) => html`
<!--Login-->
<section id="loginPage">
    <form @submit=${onSubmit}>
        <fieldset>
            <legend>Login</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <button type="submit" class="login">Login</button>

            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </fieldset>
    </form>
</section>`

export function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get('email');
        const password = formData.get('password');

        if(email == '' || password == '') {
            return alert('All fields are required!!!')
        };

        await login(email, password);
        ctx.page.redirect('/')
    }
}