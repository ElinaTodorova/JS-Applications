import page from "../node_modules/page/page.mjs";

import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { navigationView } from "./navigationView.js";
import { createBookPage } from "./views/createView.js";
import { dashboardPage } from "./views/dashboardView.js";
import { onDelete } from "./views/deleteView.js";
import { detailsPage } from "./views/detailView.js";
import { editPage } from "./views/editView.js";
import { loginPage } from "./views/loginView.js";
import { logoutPage } from "./views/logoutView.js";
import { allMyBooksPage } from "./views/myBooksView.js";
import { registerPage } from "./views/registerView.js";



page(renderMiddleware);
page('/login', loginPage);
page('/register', registerPage);
page('/logout',logoutPage);
page('/dashboard', dashboardPage)
page('/details/:id', detailsPage);
page('/create', createBookPage);
page('/edit/:id', editPage);
page('/delete/:id', onDelete);
page('/my-books', allMyBooksPage)

navigationView()
page.start()