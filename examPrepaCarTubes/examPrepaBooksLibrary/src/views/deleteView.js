import { deleteBook } from "../services/data.js";

export async function onDelete(ctx) {
    const choice = confirm('Are you sure you want to delete this book?');

    if(choice) {
        await deleteBook(ctx.params.id);
        ctx.page.redirect('/dashboard')
    }
}