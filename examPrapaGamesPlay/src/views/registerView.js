import {html} from "../../node_modules/lit-html/lit-html.js";
import { navigationUpdate } from "../middlewares/navigationUpdate.js";
import { register } from "../services/data.js";

const registerTemplate = (onSubmit) => html `
  <!-- Register Page ( Only for Guest users ) -->
  <section id="register-page" class="content auth">
        <form id="register" @submit=${onSubmit}>
            <div class="container">
                <div class="brand-logo"></div>
                <h1>Register</h1>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="maria@email.com">

                <label for="pass">Password:</label>
                <input type="password" name="password" id="register-password">

                <label for="con-pass">Confirm Password:</label>
                <input type="password" name="confirm-password" id="confirm-password">

                <input class="btn submit" type="submit" value="Register">

                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </div>
        </form>
    </section>`

export function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get('email');
        const password = formData.get('password');
        const rePass = formData.get('confirm-password');

        if(email == '' || password == '' || rePass == '') {
            return alert('All fields must be filled!!!')
        };

        if(password !== rePass) {
            return alert('Passwords don\'t match')
        };

        await register(email, password);
        navigationUpdate()
        ctx.page.redirect('/')
    }
}
