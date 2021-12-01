
import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { createCommentGame, getCommentsByGameId, getGameById } from "../services/data.js";
import { getUserData } from "../services/userDataSettings.js";

const detailsTemplate = (game, isOwner, comments, showCommentBtns, onSubmitComment) => html`
<!--Details Page-->
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src="${game.imageUrl}" />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>

        ${isOwner
         ? editDeleteButtons(game)
        : nothing}

<div class="details-comments">
    <h2>Comments:</h2>
    <ul>
        <!-- list all comments for current game (If any) -->
        ${comments.length == 0
        ? html `<p class="no-comment">No comments.</p>`
        : comments.map(oneCommentTemplate)}
    </ul>

    ${showCommentBtns 
    ? bonusTemplate(onSubmitComment)
    : nothing}
    
    
</div>
        <p class="text">
            ${game.summary}
        </p>`



const editDeleteButtons = (game) => html`
    <!-- Edit/Delete buttons ( Only for creator of this game )  -->
    <div class="buttons">
        <a href="/details/edit/${game._id}" class="button">Edit</a>
        <a href="/details/delete/${game._id}" class="button">Delete</a>
    </div>
    </div>
`;

const oneCommentTemplate = (comment) => html `
<li class="comment">
            <p>
                ${comment.comment}</p>
        </li>
`

const bonusTemplate = (onSubmitComment) => html`
<!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
<article class="create-comment">
    <label>Add new comment:</label>
    <form class="form" @submit=${onSubmitComment}>
        <textarea name="comment" placeholder="Comment......"></textarea>
        <input class="btn submit" type="submit" value="Add Comment">
    </form>
</article>

</section>`


export async function detailPage(ctx) {
    const gameId = ctx.params.id;
    const userData = getUserData();
    const game = await getGameById(ctx.params.id);
   
    const isOwner = userData && userData.id == game._ownerId;

    const comments = await getCommentsByGameId(ctx.params.id);

    const showCommentBtns = userData && userData.id !== game._ownerId;

    async function onSubmitComment(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const comment = formData.get('comment');
    
        if(comment == '' ) {
            return alert('Need write a comment!!!')
        }
       await createCommentGame({gameId, comment});
       
        ctx.page.redirect(`/details/${gameId}`)
    }
    ctx.render(detailsTemplate(game, isOwner, comments, showCommentBtns, onSubmitComment))

}