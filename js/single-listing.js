import { baseUrl } from "./components/baseUrl.js";
const listingsContainer = document.querySelector(".user-listings__container");
const bidContainer = document.querySelector(".user-listings__bid-container");
const highestBid = document.querySelector(".highest-bid");
const caroContainer = document.querySelector(".carousel-container");
const sliderNav = document.querySelectorAll(".slider-nav");
const btnCreateListing = document.querySelector(".place-bid-btn");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id")


/**
 * Use a GET request to retrieves a single listing from the server and displays its details on the page.
 */

async function getSingleListing(){
    try{
        const reply = await fetch(`${baseUrl}/auction/listings/${id}?_seller=true&_bids=true`)
        const data = await reply.json();
        console.log(data.bids)
        const today = new Date();
        const endDate = new Date(data.endsAt);
        console.log(data)
        if(reply.status !== 200){
            throw data.errors[0].message
        }
        if (data.media.length ===1){
            for (const i of sliderNav) {
                i.classList.add("visually-hidden");
            }
        }
        if (today.toISOString() > endDate.toISOString()){
            btnCreateListing.disabled = true; 

        }
        if(data.media.length === 0){
            for (const i of sliderNav) {
                i.classList.add("visually-hidden");
            }
            caroContainer.innerHTML = 
                                        `         
                                        <div class="carousel-item active">
                                            <img src="img/new-product.png" class="d-block w-100 slider-images mt-4" alt="...">
                                        </div>
                                        `

        }else{       
            for (let i = 0; i < data.media.length; i++){
            caroContainer.innerHTML += 
                                        `         
                                        <div class="carousel-item${i === 0 ? ' active'   : ''} mt-4">
                                            <img src="${data.media[i]}" class="d-block w-100 slider-images" alt="...">
                                        </div>
                                        `
        }}
        listingsContainer.innerHTML +=
                                        `<div class="text-center m-3 p-3 rounded d-flex flex-column align-items-center">
                                            <h3>${data.title}</h3                     
                                            <h4>Description:</h4>
                                            <p class="description">${data.description === null || data.description === "" ? '<p><i>No description added by user</i></p>' : `${data.description}`}</p>
                                            <p><strong>Seller:</strong></p>
                                            <p>${data.seller.name}</p>
                                            <p><strong>${today.toISOString() > endDate.toISOString() ? `Expired` : `End date:`}</strong></p>
                                            <p>${endDate.toDateString()}
                                            <p><strong>Number of bids:</strong></p>
                                            <p>${data.bids.length}</p>
                                        </div>
                                        `
        
        if(data.bids.length > 0){
            const createdArray = [];
            const bids =[];
            const created = new Date()
            for (let i = 0; i < data.bids.length; i++){
                const createdDate = new Date(data.bids[i].created);
                createdArray.push(createdDate, data.bids[i].bidderName, data.bids[i].amount);
                bids.push(data.bids[i].amount);

                bidContainer.innerHTML += `
                <div class="p-2 mb-2 rounded user-listings__bidder-info w-100">
                    <p>Bidder: ${data.bids[i].bidderName}</p>
                    <p>Amount: ${data.bids[i].amount}</p>
                </div>
                
                ` 
            }
            // const sortedArray = createdArray.sort(function(a, b){return a-b});
            // console.log(createdArray)
            // console.log(sortedArray)

              const createdArraySort = createdArray.reduce((acc, value, index) => {
                if (index % 3 === 0) {
                  acc[value] = {
                    user: array[index + 1],
                    count: array[index + 2]
                  };
                }
                return acc;
              }, {});
              
              console.log(createdArraySort);
              



            highestBid.innerHTML = `<strong>${Math.max(...bids)}</strong>`
            
        }else{
            bidContainer.innerHTML = 
                                        `
                                        <p class="text-center"><p>${today.toISOString() > endDate.toISOString() ? `Item expired without bids` : `Be the first one to bid on this item!`}</p>
                                        `
            highestBid.innerHTML = `0`
        }

    }
    catch(e){
        listingsContainer.innerHTML =   `
                                        <div class="api-error d-flex flex-column align-items-center text-center rounded">
                                            <p>Something went wrong, please try again</p>
                                            <p>Error: ${e}</p>
                                        </div>
                                        `


    }
}
getSingleListing();
