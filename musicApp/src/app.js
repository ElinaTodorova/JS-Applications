import page from "../node_modules/page/page.mjs";
import { navigationMiddleware } from "./middlewares/navigationMiddleware.js";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";

import * as api from "../src/services/data.js";
import { loginPage } from "./views/loginView.js";
import { registerPage } from "./views/registerView.js";
import { homePage } from "./views/homeView.js";
import { catalogPage } from "./views/catalogView.js";
import { createPage } from "./views/createView.js";
import { detailsPage } from "./views/detailsView.js";
import { editPage } from "./views/editView.js";
import { searchPage } from "./views/searchView.js";

window.api = api
page(navigationMiddleware);
page(renderMiddleware);

page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', catalogPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/details/edit/:id', editPage);
page('/search', searchPage)

page.start()