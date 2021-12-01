import { navigationUpdate } from "../middlewares/navigationUpdate.js";
import { logout } from "../services/data.js";
import { clearUserData } from "../services/userDataSettings.js";

export async function logoutPaga(ctx) {
    await logout();
    clearUserData();
    navigationUpdate();
    ctx.page.redirect('/')
}