import { html } from "../../node_modules/lit-html/lit-html.js";
import {getAllMyBooks } from "../services/data.js";
import { getUserData } from "../services/userDataSettings.js";

const oneBookTemplate = (book) => html`
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src="${book.imageUrl}"></p>
    <a class="button" href="/details/${book._id}">Details</a>
</li>`

const allMyBooks = (books = []) => html `
<!-- My Books Page ( Only for logged-in users ) -->
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    <!-- Display ul: with list-items for every user's books (if any) -->
    ${books.length == 0
    ? html `  <p class="no-books">No books in database!</p>`
    : html ` <ul class="my-books-list">
     ${books.map(oneBookTemplate)}
    </ul>`}
     
</section>`

export async function allMyBooksPage(ctx) {
    const userData = getUserData();
    const allBooks = await getAllMyBooks(userData.id)

    ctx.render(allMyBooks(allBooks))
}