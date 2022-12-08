import { getOptions } from "./components/auth-header.mjs";
import { baseUrl } from "./components/baseUrl.mjs";

const btnNewest = document.querySelector(".btn-newest");
const btnOldest = document.querySelector(".btn-oldest");
const listingContainer = document.querySelector(".listing__container");


async function sortNewest () {
    const results = await fetch(`${baseUrl}/auction/listings?sort=created&sortOrder=desc`)
    const data = await results.json();
    console.log(data)
    listingContainer += 
}



sortNewest();
