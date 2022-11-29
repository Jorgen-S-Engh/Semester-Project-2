
import { baseUrl } from "./components/baseUrl.mjs";
// import { options } from "./components/auth-header.mjs";
const placeBidBtn = document.querySelector(".place-bid-btn");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id")

placeBidBtn.addEventListener("click", placeBid)

async function placeBid(e){
    e.preventDefault();
    const bidAmount = document.querySelector(".bid-amount").value;
    const bid = {amount: Number(bidAmount)}
    const options = {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(bid)
    }
    try{
        const response = await fetch(`${baseUrl}/auction/listings/${id}/bids`,options )
        const data = await response.json();
        
    }catch(e){
        console.log()
    }
}




