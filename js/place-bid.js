
import { baseUrl } from "./components/baseUrl.mjs";
const placeBidBtn = document.querySelector(".place-bid-btn");
const bidSuccess = document.querySelector(".place-bid-success");
const bidError = document.querySelector(".place-bid-error");
const bidErrorMessage = document.querySelector(".bid-error-message");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id")

placeBidBtn.addEventListener("click", placeBid);

if(localStorage.getItem("name")===null) {
    placeBidBtn.innerHTML = `Log in to bid`
    placeBidBtn.disabled = true
}

/**
 * Sends a POST request to place a bid on a listing.
 */

async function placeBid(e){
    e.preventDefault();
    const bidAmount = document.querySelector(".bid-amount").value;
    const bid = {amount: Number(bidAmount)}
    console.log(bid)
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
        console.log(response)
        if (response.status === 200){
            bidSuccess.classList.remove("place-bid-success-hidden")
            setTimeout(() => {
                bidSuccess.classList.add("place-bid-success-hidden");
                location.reload();
            }, "2000")

        }else{
            bidError.classList.remove("place-bid-error-hidden")
            bidErrorMessage.innerHTML = `<p>${data.errors[0].message}</p>`

        }
        
    }catch(e){

    }
}






