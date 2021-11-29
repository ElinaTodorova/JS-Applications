import { deleteCar } from "../apiServices/data.js";

export async function onDelete(ctx) {
    const choice = confirm('Are you sure you want to delete this meme?');

    if(choice) {
        await deleteCar(ctx.params.id);
        ctx.page.redirect('/listings')
    }
}