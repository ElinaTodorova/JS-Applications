import {html} from "../../node_modules/lit-html/lit-html.js";
import { navigationUpdate } from "../middlewares/navigationUpdate.js";
import { login } from "../services/data.js";

const loginTemplate = (onSubmit) => html `

    <!-- Login Page ( Only for Guest users ) -->
    <section id="login-page" class="auth">
        <form id="login" @submit=${onSubmit}>

            <div class="container">
                <div class="brand-logo"></div>
                <h1>Login</h1>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

                <label for="login-pass">Password:</label>
                <input type="password" id="login-password" name="password">
                <input type="submit" class="btn submit" value="Login">
                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </div>
        </form>
    </section>`;


export function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get('email');
        const password = formData.get('password');

        if(email == '' || password == '') {
            return alert('All fields must be filled!!!')
        }

        await login(email, password);
        navigationUpdate()
        ctx.page.redirect('/')
    }
}