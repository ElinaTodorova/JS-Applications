import {html, nothing} from "../../node_modules/lit-html/lit-html.js";
import { deleteAlbum, getAlbumById } from "../services/data.js";
import { getUserData } from "../services/userDataSettings.js";

const detailsTemplate = (album, isOwner, onDelete) => html`
<!--Details Page-->
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src="${album.imgUrl}">
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${album.name}</h1>
                <h3>Artist: ${album.artist}</h3>
                <h4>Genre: ${album.genre}</h4>
                <h4>Price: $${album.price}</h4>
                <h4>Date: ${album.releaseDate}</h4>
                <p>Description: ${album.description}</p>
            </div>

            <!-- Only for registered user and creator of the album-->
            ${isOwner
            ? html ` <div class="actionBtn">
                <a href="/details/edit/${album._id}" class="edit">Edit</a>
                <a href="javascript:void(0)" @click=${onDelete} class="remove">Delete</a>
            </div>`
            : nothing}
           
        </div>
    </div>
</section>`

export async function detailsPage(ctx) {
    const userData = getUserData();
    const album = await getAlbumById(ctx.params.id);

    const isOwner = userData && userData.id == album._ownerId;

    ctx.render(detailsTemplate(album, isOwner, onDelete));

    async function onDelete(e) {
        const choice = confirm('Are you sure you want to delete this album?');

        if(choice) {
            await deleteAlbum(ctx.params.id);
            ctx.page.redirect('/catalog')
        }
        
    }
}