import page from "../node_modules/page/page.mjs";
import { navigationUpdate } from "./middlewares/navigationUpdate.js";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { catalogPage } from "./views/catalogView.js";
import { createPage } from "./views/createView.js";
import { deletePage } from "./views/deleteView.js";
import { detailPage } from "./views/detailsView.js";
import { editPage } from "./views/editView.js";
import { homePage } from "./views/homeView.js";
import { loginPage } from "./views/loginView.js";
import { logoutPaga } from "./views/logoutView.js";
import { registerPage } from "./views/registerView.js";

page(renderMiddleware);
page('/', homePage)
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logoutPaga);
page('/catalog', catalogPage);
page('/create', createPage);
page('/details/:id', detailPage);
page('/details/edit/:id', editPage);
page('/details/delete/:id', deletePage)

navigationUpdate()
page.start()