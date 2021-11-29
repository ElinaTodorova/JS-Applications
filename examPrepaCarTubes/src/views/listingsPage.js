import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllCars } from "../apiServices/data.js";

const oneCarTemplate = (car) => html`
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
</div>`

const allListingTemplate = (cars = []) => html`
<!-- All Listings Page -->
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">

        <!-- Display all records -->
        <!-- Display if there are no records -->
        ${cars.length == 0
        ? html`<p class="no-cars">No cars in database.</p>`
        : cars.map(oneCarTemplate)}
    </div>
</section>`

export async function listingPage(ctx) {
    const cars = await getAllCars();

    ctx.render(allListingTemplate(cars))
}