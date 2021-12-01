import { deleteGame } from "../services/data.js";

export function deletePage(ctx) {
    deleteGame(ctx.params.id);
    ctx.page.redirect('/')
}