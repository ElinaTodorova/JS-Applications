import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getAllAlbums } from "../services/data.js";
import { getUserData } from "../services/userDataSettings.js";

const oneAlbumTemplate = (album, user) => html`
<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        ${user
        ? html` <div class="btn-group">
            <a href="/details/${album._id}" id="details">Details</a>
        </div>`
        : nothing}

    </div>
</div>`

const catalogTemplate = (albums = [], user) => html`
<!--Catalog-->
<section id="catalogPage">
    <h1>All Albums</h1>
    ${albums.length == 0
            ? html`<p>No Albums in Catalog!</p>`
            : albums.map(x => oneAlbumTemplate(x, user))}

</section>`

export async function catalogPage(ctx) {
    const user = getUserData();
    const albums = await getAllAlbums();
 
    ctx.render(catalogTemplate(albums, user))
}