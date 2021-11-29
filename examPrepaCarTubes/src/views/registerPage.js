import {html} from "../../node_modules/lit-html/lit-html.js";
import { register } from "../apiServices/data.js";


const registerTemplate = (onSubmit) => html `


<!-- Register Page -->
<section id="register">
    <div class="container">
        <form id="register-form" @submit=${onSubmit}>
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>

            <p>Username</p>
            <input type="text" placeholder="Enter Username" name="username" required>

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password" required>

            <p>Repeat Password</p>
            <input type="password" placeholder="Repeat Password" name="repeatPass" required>
            <hr>

            <input type="submit" class="registerbtn" value="Register">
        </form>
        <div class="signin">
            <p>Already have an account?
                <a href="/login">Sign in</a>.
            </p>
        </div>
    </div>
</section>`

export function registerPage(ctx) {
   ctx.render(registerTemplate(onSubmit));

   async function onSubmit(e) {
       e.preventDefault();

       const formData = new FormData(e.target);

       const username = formData.get('username');
       const password = formData.get('password');
       const repeatPassword = formData.get('repeatPass');

       if(username == '' || password == '' || repeatPassword == '') {
           return alert ('All fields are required!!!')
       };

       if(password !== repeatPassword) {
           return alert ('Passwords don\'t match!!!')
       };

       await register(username, password);
       ctx.userNavigation()
       ctx.page.redirect('/listings')
   }
}