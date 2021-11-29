import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyMemes } from "../api/data.js";
import { getUserData } from "../utils.js";

const oneMemeCrd = (meme) => html`
<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src="${meme.imageUrl}">
    <a class="button" href="/details/${meme._id}">Details</a>
</div>
`
const profileTemplate = (user, memes = []) => html`
<!-- Profile Page ( Only for logged users ) -->
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/${user.gender}.png">
        <div class="user-content">
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>My memes count: ${memes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        <!-- Display : All created memes by this user (If any) -->
        <!-- Display : If user doesn't have own memes  -->
        ${memes.length == 0
        ? html `<p class="no-memes">No memes in database.</p>`
        : memes.map(oneMemeCrd)}
        
    </div>
</section>`


export async function profilePage(ctx) {
    const userData = getUserData();
    const memes = await getMyMemes(userData.id)
    ctx.render(profileTemplate(userData, memes))
}
