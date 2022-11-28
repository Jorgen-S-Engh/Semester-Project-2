import { baseUrl } from "./components/baseUrl.mjs";
const listingsContainer = document.querySelector(".user-listings__container")
const bidContainer = document.querySelector(".user-listings__bid-container");
const highestBid = document.querySelector(".highest-bid");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id")
console.log(id)

async function getSingleListing(){
    try{
        const reply = await fetch(`${baseUrl}/auction/listings/${id}?_seller=true&_bids=true`)
        const data = await reply.json();
        console.log(data)
        


        listingsContainer.innerHTML +=
                                        `<div class="text-center m-3 p-3 rounded d-flex flex-column align-items-center">
                                            <h3>${data.title}</h3>
                                            <div class="user-listings__img-container">
                                                <img src="${data.media}" alt="" class="rounded">
                                            </div>
                                            <h4>Description</h4>
                                            <p>${data.description}</p>
                                            <p><strong>Seller:</strong></p>
                                            <p>${data.seller.name}</p>
                                            <p><strong>Number of bids:</strong></p>
                                            <p>${data.bids.length}
                                        </div>
                                        `
        
        



        if(data.bids.length > 0){
            const bids =[];
            for (let i = 0; i < data.bids.length; i++){
                bids.push(data.bids[i].amount)
                console.log(data.bids[i].amount)

                bidContainer.innerHTML += `
                <div class="p-4 m-2 rounded user-listings__bidder-info">
                    <p>Bidder: ${data.bids[i].bidderName}</p>
                    <p>Amount: ${data.bids[i].amount}</p>
                </div>
                
                `
                
            }
            highestBid.innerHTML = `<strong>${Math.max(...bids)}</strong>`
    
            
        }else{
            bidContainer.innerHTML = `
            <p class="text-center">Be the first one to bid on this item!</p>
            `
            highestBid.innerHTML = `0`

        }

    }
    catch(e){

    }
}
getSingleListing();
