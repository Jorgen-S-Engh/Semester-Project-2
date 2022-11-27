import { baseUrl } from "./components/baseUrl.mjs";
const listingsContainer = document.querySelector(".user-listings__container")
const bidContainer = document.querySelector(".user-listings__bid-container");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id")
console.log(id)

async function getSingleListing(){
    try{
        const reply = await fetch(`${baseUrl}/auction/listings/${id}?_seller=true&_bids=true`)
        const data = await reply.json();


        listingsContainer.innerHTML +=
                                        `<div class="text-center m-3 p-3 rounded d-flex flex-column align-items-center">
                                            <h3>${data.title}</h3>
                                            <div class="user-listings__img-container">
                                                <img src="${data.media}" alt="">
                                            </div>
                                            <p>${data.description}</p>
                                            <p><strong>Seller:</strong></p>
                                            <p>${data.seller.name}</p>
                                            <p><strong>Number of bids:</strong></p>
                                            <p>${data.bids.length}
                                        </div>
                                        `

        for (let i = 0; i < data.bids.length; i++){
        const bids = (data.bids[i].amount)
        console.log(bids)
        bidContainer.innerHTML += `
                                    <p>Bidder: ${data.bids[i].bidderName}
                                    <p>${bids}</p>
                                    `
        

        }

        
        console.log(data);
        console.log(data.seller.name)

    }
    catch(e){

    }
}
getSingleListing();
