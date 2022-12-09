import { baseUrl } from "./components/baseUrl.mjs";
const listingsContainer = document.querySelector(".user-listings__container");
const bidContainer = document.querySelector(".user-listings__bid-container");
const highestBid = document.querySelector(".highest-bid");
const caroContainer = document.querySelector(".carousel-container");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id")
console.log(id)

async function getSingleListing(){
    try{
        const reply = await fetch(`${baseUrl}/auction/listings/${id}?_seller=true&_bids=true`)
        const data = await reply.json();
        console.log(data)
        const today = new Date();
        const endDate = new Date(data.endsAt)
        today > endDate ? localStorage.setItem("expired", "Yes") : localStorage.setItem("expired", "No");

        if(data.media.length === 0){
            caroContainer.innerHTML = 
                                        `         
                                        <div class="carousel-item active">
                                            <img src="img/new-product.png" class="d-block w-100 slider-images mt-4" alt="...">
                                        </div>
                                        `

        }else{       
            for (let i = 0; i < data.media.length; i++){
                console.log(i)
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
                                            <h4>Description</h4>
                                            <p>${data.description}</p>
                                            <p><strong>Seller:</strong></p>
                                            <p>${data.seller.name}</p>
                                            <p><strong>End date:</strong></p>
                                            <p>${endDate.toDateString()}
                                            <p><strong>Number of bids:</strong></p>
                                            <p>${data.bids.length}</p>
                                        </div>
                                        `
        
        if(data.bids.length > 0){
            const bids =[];
            for (let i = 0; i < data.bids.length; i++){
                bids.push(data.bids[i].amount)

                bidContainer.innerHTML += `
                <div class="p-2 mb-2 rounded user-listings__bidder-info w-100">
                    <p>Bidder: ${data.bids[i].bidderName}</p>
                    <p>Amount: ${data.bids[i].amount}</p>
                </div>
                
                ` 
            }
            highestBid.innerHTML = `<strong>${Math.max(...bids)}</strong>`
            
        }else{
            bidContainer.innerHTML = 
                                        `
                                        <p class="text-center">${today.toISOString() > endDate.toISOString() ? `<p>Item expired without bids` : `Be the first one to bid on this item!`}</p>
                                        `
            highestBid.innerHTML = `0`
        }

    }
    catch(e){

    }
}
getSingleListing();
