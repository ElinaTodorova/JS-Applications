import {html, nothing} from "../../node_modules/lit-html/lit-html.js";
import { getAlbumByName } from "../services/data.js";
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

const searchTemplate = (onSearchChange, onClickSearch, albums = [], user) => html `
<!--Search Page-->
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" @change=${onSearchChange} placeholder="Enter desired albums's name">
        <button @click=${onClickSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>

    <!--Show after click Search button-->
    <div class="search-result">
      
       ${albums.length == 0
       ? html `<p class="no-result">No result.</p>`
       : albums.map(x => oneAlbumTemplate(x, user))}}
</div>
</section>
`

export async function searchPage(ctx) {
    let currentSearch = '';
    const user = getUserData();

    const onSearchChange = (e) => {
        currentSearch = e.currentTarget.value;
    };
   

    async function onClickSearch(e) {
        let name = currentSearch;

        const albums = await getAlbumByName(name);
        
        ctx.render(searchTemplate(onSearchChange, onClickSearch, albums, user))

    }

    ctx.render(searchTemplate(onSearchChange, onClickSearch))
}