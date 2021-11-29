import {html} from "../../node_modules/lit-html/lit-html.js";
import { getMyCars } from "../apiServices/data.js";
import { getUserData } from "../apiServices/userData.js";

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
        </div>`

const allMyCarsTemplate = (cars = []) => html `

<!-- My Listings Page -->
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">

        <!-- Display all records -->
        <!-- Display if there are no records -->
        ${cars.length == 0
        ? html `<p class="no-cars"> You haven't listed any cars yet.</p>`
        : cars.map(oneCarTemplate)}
        
    </div>
</section>` 

export async function myListingPage(ctx) {
    const userData = getUserData();
    const cars = await getMyCars(userData.id);

    ctx.render(allMyCarsTemplate(cars))
}