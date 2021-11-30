import { navigationView } from "../navigationView.js";
import { logout } from "../services/data.js";

export function logoutPage(ctx) {
   logout();
   navigationView()
   ctx.page.redirect('/dashboard')
}