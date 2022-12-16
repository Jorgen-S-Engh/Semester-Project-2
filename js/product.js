import { baseUrl } from "./components/baseUrl.js";
import { placeBid } from "./components/place-bid.mjs";

const listingsContainer = document.querySelector(".user-listings__container");
const bidContainer = document.querySelector(".user-listings__bid-container");
const highestBid = document.querySelector(".highest-bid");
const caroContainer = document.querySelector(".carousel-container");
const sliderNav = document.querySelectorAll(".slider-nav");
const btnCreateListing = document.querySelector(".place-bid-btn");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

/**
 * Use a GET request to retrieves a single listing from the server and displays its details on the page.
 */

async function getSingleListing() {
  try {
    const reply = await fetch(
      `${baseUrl}/auction/listings/${id}?_seller=true&_bids=true`
    );
    const data = await reply.json();
    const today = new Date();
    const endDate = new Date(data.endsAt);
    document.title = `The Auction House | Listing ${data.title}`;
    if (reply.status !== 200) {
      throw data.errors[0].message;
    }
    if (data.media.length === 1) {
      for (const i of sliderNav) {
        i.classList.add("visually-hidden");
      }
    }
    if (today.toISOString() > endDate.toISOString()) {
      btnCreateListing.disabled = true;
      btnCreateListing.innerHTML = "Item expired";
    }
    if (localStorage.getItem("accessToken") === null) {
      btnCreateListing.disabled = true;
      btnCreateListing.innerHTML = "Create an account to place bid";
    }
    if (data.media.length === 0) {
      for (const i of sliderNav) {
        i.classList.add("visually-hidden");
      }
      caroContainer.innerHTML = `         
                                        <div class="carousel-item active">
                                            <img src="img/new-product.png" class="d-block w-100 slider-images mt-4" alt="Placeholder image">
                                        </div>
                                        `;
    } else {
      for (let i = 0; i < data.media.length; i++) {
        caroContainer.innerHTML += `         
                                        <div class="carousel-item${
                                          i === 0 ? " active" : ""
                                        } mt-4">
                                            <img src="${
                                              data.media[i]
                                            }" class="d-block w-100 slider-images" alt="Image of the post ${
          data.title
        }">
                                        </div>
                                        `;
      }
    }
    listingsContainer.innerHTML += `<div class="text-center m-3 p-3 rounded d-flex flex-column align-items-center">
                                            <h1 class="overflow-auto fs-5 single-listing-headline">${
                                              data.title
                                            }</h1>                     
                                            <h4>Description:</h4>
                                            <p class="description overflow-auto">${
                                              data.description === null ||
                                              data.description === ""
                                                ? "<p><i>No description added by user</i></p>"
                                                : `${data.description}`
                                            }</p>
                                            <p><strong>Seller:</strong></p>
                                            <p>${data.seller.name}</p>
                                            <p><strong>${
                                              today.toISOString() >
                                              endDate.toISOString()
                                                ? `Expired`
                                                : `End date:`
                                            }</strong></p>
                                            <p>${endDate.toDateString()}</p>
                                            <p><strong>Number of bids:</strong></p>
                                            <p>${data.bids.length}</p>
                                        </div>
                                        `;

    if (data.bids.length > 0) {
      const bids = [];
      const bidderObj = data.bids;
      // This function sort the objects from first date to last. In rare cases the original object from the API dont come sorted by ascending date.
      bidderObj.sort((a, b) => {
        const dateA = new Date(a.created);
        const dateB = new Date(b.created);

        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;
        return 0;
      });

      for (let i = 0; i < bidderObj.length; i++) {
        bids.push(bidderObj[i].amount);

        bidContainer.innerHTML += `
                <div class="p-2 mb-2 rounded user-listings__bidder-info w-100">
                    <p>Bidder: ${bidderObj[i].bidderName}</p>
                    <p>Amount: ${bidderObj[i].amount}</p>
                </div>
                
                `;
      }

      highestBid.innerHTML = `<strong>${Math.max(...bids)}</strong>`;
    } else {
      bidContainer.innerHTML = `
                                        <p class="text-center"><p>${
                                          today.toISOString() >
                                          endDate.toISOString()
                                            ? `Item expired without bids`
                                            : `Be the first one to bid on this item!`
                                        }</p>
                                        `;
      highestBid.innerHTML = `0`;
    }
  } catch (e) {
    listingsContainer.innerHTML = `
                                        <div class="api-error d-flex flex-column align-items-center text-center rounded">
                                            <p>Something went wrong, please try again</p>
                                            <p>Error: ${e}</p>
                                        </div>
                                        `;
  }
}
getSingleListing();
