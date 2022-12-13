import { setImg } from "./components/setProfileImg.mjs"
import { baseUrl } from "./components/baseUrl.js";
const endpoint =`/auction/profiles/${localStorage.getItem("name")}`
const userInfo = document.querySelector(".user-info");
const userListings = document.querySelector(".user-listings");

const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
}

/**
 * Sends a GET request to contain data about the user.
 */

async function getUserInfo() {
    try {
      const reply = await fetch(`${baseUrl}${endpoint}`, options)
      const data = await reply.json();
      userInfo.innerHTML = `
                                <h1>${data.name}'s Profile</h1>
                                <p>${data.email}<p>
                                <p>Credits: <strong>${data.credits}</p></strong>
                                <p>Listings: <strong>${data._count.listings}<p></strong>
                                `
    } catch (e) {
      console.log(e);
    }
}

getUserInfo();


// async function allListings() {
//   try {
//     const reply = await fetch(`${baseUrl}/auction/listings`, options)
//     const data = await reply.json();
//     for(let i = 0; i < data.length; i++){
//       let d = new Date(`${data[i].endsAt}`);
//     }
//   } catch (e) {
//     console.log(e);
//   }
// }

// allListings();





                        

