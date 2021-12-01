import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllGames } from "../services/data.js";

const oneGameTemplate = (game) => html`
<div class="allGames">
    <div class="allGames-info">
        <img src="${game.imageUrl}">
        <h6>${game.category}</h6>
        <h2>${game.title}</h2>
        <a href="/details/${game._id}" class="details-button">Details</a>
    </div>
</div>`

const catalogTemplate = (games = [])  => html `
  <!-- Catalogue -->
  <section id="catalog-page">
        <h1>All Games</h1>
        <!-- Display div: with information about every game (if any) -->
        <!-- Display paragraph: If there is no games  -->
        ${games.length == 0
        ? html `<h3 class="no-articles">No articles yet</h3>`
        : games.map(oneGameTemplate)}
        
    </section>`

export async function catalogPage(ctx) {
    const games = await getAllGames();
    ctx.render(catalogTemplate(games))
}