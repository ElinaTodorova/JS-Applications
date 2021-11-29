import page from "../node_modules/page/page.mjs";
import {render} from "../node_modules/lit-html/lit-html.js"
import { logout } from "./apiServices/data.js";
import { getUserData } from "./apiServices/userData.js";
import { loginPage } from "./views/loginPage.js";
import { registerPage } from "./views/registerPage.js";
import { homePage } from "./views/homePage.js";
import { listingPage } from "./views/listingsPage.js";
import { detailsPage } from "./views/detailsPage.js";
import { createPage } from "./views/createPage.js";
import { onDelete } from "./views/deletePage.js";
import { editPage } from "./views/editPage.js";
import { myListingPage } from "./views/myListingPage.js";
import { searchPage } from "./views/searchPage.js";


document.getElementById('logoutBtn').addEventListener('click', onLogout);
const siteElement = document.getElementById('site-content');


page(renderMiddleware);
page('/', homePage)
page('/login', loginPage);
page('/register', registerPage);
page('/listings', listingPage);
page('/listings/:id', detailsPage);
page('/delete/:id', onDelete);
page('/edit/:id', editPage)
page('/create', createPage);
page('/my-listings', myListingPage);
page('/search', searchPage)

userNavigation()
page.start()

function renderMiddleware(ctx, next) {
    ctx.render = (templateResult) => {
        render(templateResult, siteElement);
        ctx.userNavigation = userNavigation;
    }

    next()
}


async function onLogout() {
    logout();
    userNavigation();
    page.redirect('/')
}

function userNavigation() {
    const userData = getUserData();

    if (userData) {
        document.getElementById('profile').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
        document.querySelector('.text').textContent = `Welcome ${userData.username}`
    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }

}



