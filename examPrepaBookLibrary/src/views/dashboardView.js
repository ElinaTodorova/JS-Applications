import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllBooks } from "../services/data.js";
import { getUserData } from "../services/userDataSettings.js";

const oneBookTemplate = (book) => html`

    <li class="otherBooks">
        <h3>${book.title}</h3>
        <p>Type: ${book.type}</p>
        <p class="img"><img src="${book.imageUrl}"></p>
        <a class="button" href="/details/${book._id}">Details</a>
    </li>`

const allBooksTemplate = (books = []) => html`
<!-- Dashboard Page ( for Guests and Users ) -->
<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>

    ${books.length == 0
        ? html`<p class="no-books">No books in database!</p>`
        : html` <ul class="other-books-list">${books.map(oneBookTemplate)}</ul>`}
</section>
`

export async function dashboardPage(ctx) {
    const books = await getAllBooks();

    ctx.render(allBooksTemplate(books))
}
