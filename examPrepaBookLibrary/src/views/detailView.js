import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getBookById, getLikesByBookId, getMyLikeByBookId, likeBook } from "../services/data.js";
import { getUserData } from "../services/userDataSettings.js";

const detailTemplate = (book, isOwner, likes, showLikeBtn, onLike) => html`
<!-- Details Page ( for Guests and Users ) -->
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src="${book.imageUrl}"></p>
        <div class="actions">
            <!-- Edit/Delete buttons ( Only for creator of this book )  -->
            ${isOwner
        ? html`<a class="button" href="/edit/${book._id}">Edit</a>
            <a class="button" href="/delete/${book._id}">Delete</a>`
        : nothing}

            ${likeControlsTemplate(showLikeBtn, onLike)}

            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likes}</span>
            </div>

        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`

const likeControlsTemplate = (showLikeBtn, onLike) => {
    if (showLikeBtn) {
        return html`<a @click=${onLike} class="button" href="javascript:void(0)">Like</a>`
    } else {
        return null
    }
}

export async function detailsPage(ctx) {
    const userData = getUserData();

    const [book, likes, hasLikes] = await Promise.all([
        getBookById(ctx.params.id),
        getLikesByBookId(ctx.params.id),
        userData ? getMyLikeByBookId(ctx.params.id, userData.id) : 0
    ]);

    const isOwner = userData && userData.id == book._ownerId;
    const showLikeBtn = userData !== null && isOwner == false && hasLikes == false;
    //const book = await getBookById(ctx.params.id);
  ctx.render(detailTemplate(book, isOwner, likes, showLikeBtn, onLike))

  async function onLike() {
      await likeBook(ctx.params.id);
      ctx.page.redirect('/details/' + ctx.params.id)
  }
}