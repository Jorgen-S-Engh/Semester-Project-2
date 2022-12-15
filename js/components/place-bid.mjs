import { baseUrl } from "./baseUrl.js";
const placeBidBtn = document.querySelector(".place-bid-btn");
const bidSuccess = document.querySelector(".place-bid-success");
const bidError = document.querySelector(".place-bid-error");
const bidErrorMessage = document.querySelector(".bid-error-message");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

placeBidBtn.addEventListener("click", placeBid);

/**
 * Sends a POST request to place a bid on a listing.
 */

export async function placeBid(e) {
  e.preventDefault();
  bidSuccess.classList.add("place-bid-success-hidden");
  bidError.classList.add("place-bid-error-hidden");
  const bidAmount = document.querySelector(".bid-amount").value;
  const bid = { amount: Number(bidAmount) };
  console.log(bid);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(bid),
  };
  try {
    const response = await fetch(
      `${baseUrl}/auction/listings/${id}/bids`,
      options
    );
    const data = await response.json();
    console.log(response);
    console.log(data);
    if (response.status === 200) {
      bidSuccess.classList.remove("place-bid-success-hidden");
      setTimeout(() => {
        bidSuccess.classList.add("place-bid-success-hidden");
        location.reload();
      }, "2000");
    } else {
      throw data.errors[0].message;
    }
  } catch (e) {
    bidError.classList.remove("place-bid-error-hidden");
    bidErrorMessage.innerHTML = `<p>${e}</p>`;
  }
}
