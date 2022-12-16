import { baseUrl } from "./components/baseUrl.js";
import { loginLogout } from "./components/login-logout.mjs";
import { setImgSmall } from "./components/set-profile-img-small.mjs";

const listingContainer = document.querySelector(".listing__container");

const baseEndPoint = "/auction/listings";
const endpointDesc = "/auction/listings?sort=created&sortOrder=desc";
const endpointAsc = "/auction/listings?sort=created&sortOrder=asc";
const endpointActive = "/auction/listings?_active=true";

const btnNewest = document.querySelector(".btn-newest");
const btnOldest = document.querySelector(".btn-oldest");
const btnActive = document.querySelector(".btn-active-posts");
const prodHeadline = document.querySelector(".product-home-headline");

btnNewest.addEventListener("click", () => {
  listingContainer.innerHTML = "";
  prodHeadline.innerHTML = "Newest listings";

  getListings(endpointDesc);
});

btnOldest.addEventListener("click", () => {
  listingContainer.innerHTML = "";
  prodHeadline.innerHTML = "Oldes listings";
  getListings(endpointAsc);
});

btnActive.addEventListener("click", () => {
  listingContainer.innerHTML = "";
  prodHeadline.innerHTML = "Active Listings";
  getListings(endpointActive);
});

/**
 * GET data from the API, creates HTML base on the data
 * @param {string} endpoint baseUrl + endpoint GET data from the api, different endpoint will result in different data.
 */

export async function getListings(endpoint) {
  listingContainer.innerHTML = `                
                                  <div class="spinner-border text-light" role="status">
                                      <span class="visually-hidden">Loading...</span>
                                  </div>`;

  try {
    const reply = await fetch(`${baseUrl}${endpoint}`);
    const data = await reply.json();

    if (reply.status !== 200) {
      throw `${data.errors[i]}`;
    }
    const today = new Date();
    const todayIso = today.toISOString();
    listingContainer.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      const endDate = new Date(data[i].endsAt);
      const endDateIso = endDate.toISOString();
      listingContainer.innerHTML += `
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 item-container-product rounded m-3 p-3">
          <a href="product.html?id=${data[i].id}">
              <div class="card-container d-flex flex-column align-items-center justify-content-start text-center">
                  <h4 class="overflow-auto mh-10 item-headline">${
                    data[i].title
                  }</h4>
                  <div class="item-media-container">
                      <img src="${
                        data[i].media.length === 0
                          ? `img/new-product.png`
                          : `${data[i].media.length > 1}`
                          ? `${data[i].media[0]}`
                          : `${data[i].media}`
                      }" class="card-img-top item-img mt-3" alt="Image of post the with the title: ${
        data[i].title
      }">
                  </div>
                  
                  <p class="description-all-lists overflow-auto mh-20">${
                    data[i].description === null || data[i].description === ""
                      ? "<p><i>No description added by user</i></p>"
                      : `${data[i].description}`
                  }</p>
                  
                  <p>Bids: ${data[i]._count.bids}</p>
                  <p>${
                    endDateIso < todayIso
                      ? `<p>Expired: ${endDate.toDateString()}</p>`
                      : `<p>Ends at: ${endDate.toDateString()}</p>`
                  }</p>
                  <div class="btn-more-info-container mt-2">
                      <button class="btn btn-primary m-1">More info</button>
                  </div>
              </div>
          </a>
      </div>

      `;
    }
  } catch (err) {
    listingContainer.innerHTML = `<div class="api-error d-flex flex-column align-items-center text-center rounded">
                                            <p>Something went wrong, please try again</p>
                                            <p>Error: ${err}</p>
                                        </div>`;
  }
}

getListings(baseEndPoint);
