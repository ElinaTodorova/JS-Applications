import {html} from "../../node_modules/lit-html/lit-html.js";
import { getCarByYear } from "../apiServices/data.js";

const oneCarTemplate = (car) => html `
<div class="listing">
            <div class="preview">
                <img src="${car.imageUrl}">
            </div>
            <h2>${car.brand} ${car.model}</h2>
            <div class="info">
                <div class="data-info">
                    <h3>Year: ${car.year}</h3>
                    <h3>Price: ${car.price} $</h3>
                </div>
                <div class="data-buttons">
                    <a href="/listings/${car._id}" class="button-carDetails">Details</a>
                </div>
            </div>
        </div>
`

const searchTemplate = (onSearchChange,onClickSearch, cars = []) => html `
<!-- Search Page -->
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" @change=${onSearchChange} placeholder="Enter desired production year">
        <button @click=${onClickSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">

        <!-- Display all records -->
        <!-- Display if there are no matches -->
        ${cars.length === 0
        ? html `<p class="no-cars"> No results.</p>`
        : cars.map(oneCarTemplate)}
        
    </div>
</section>`

export async function searchPage(ctx) {
  let currentSearch = '';



  const onSearchChange = (e) => {
      currentSearch = e.currentTarget.value
  };

  async function onClickSearch(e) {
      let year = Number(currentSearch);

      const cars = await getCarByYear(year);
      ctx.render(searchTemplate(onSearchChange, onClickSearch, cars));
  }

  ctx.render(searchTemplate(onSearchChange, onClickSearch))
 
}