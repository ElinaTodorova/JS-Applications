import { render, html } from "../../node_modules/lit-html/lit-html.js";
import { logout } from "../services/data.js";
import { clearUserData, getUserData } from "../services/userDataSettings.js";

const navigationElement = document.querySelector('#box header');

const navigationTemplate = (isLoggedIn, onLogout) => html`
<nav>
    <img src="./images/headphones.png">
    <a href="/">Home</a>
    <ul>
        <!--All user-->
        <li><a href="/catalog">Catalog</a></li>
        <li><a href="/search">Search</a></li>
        <!--Only guest-->
        ${isLoggedIn
        ? html  `<li><a href="/create">Create Album</a></li>
        <li><a href="javascript:void(0)" @click=${onLogout}>Logout</a></li>`
        : html `<li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>`}
        
    </ul>
</nav>`

export function navigationMiddleware(ctx, next) {
    const isLoggedIn = getUserData();

    render(navigationTemplate(isLoggedIn, onLogout), navigationElement);

    async function onLogout(e) {
        await logout();
        clearUserData()
    }

    next()

}