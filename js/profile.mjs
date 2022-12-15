import { setImg } from "./components/setProfileImg.mjs";
import { getUserListings } from "./components/user-listing.mjs";
import { baseUrl } from "./components/baseUrl.js";
import { changeMedia } from "./components/change-avatar.mjs";
import { createEntry } from "./components/create-listing.mjs";

const endpoint = `/auction/profiles/${localStorage.getItem("name")}`;
const userInfo = document.querySelector(".user-info");
const userListings = document.querySelector(".user-listings");

const options = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
};

/**
 * Sends a GET request to contain data about the user.
 */

async function getUserInfo() {
  try {
    const reply = await fetch(`${baseUrl}${endpoint}`, options);
    const data = await reply.json();

    if (reply.status === 200) {
      userInfo.innerHTML = `
        <h1>${data.name}'s Profile</h1>
        <p>${data.email}<p>
        <p>Credits: <strong>${data.credits}</p></strong>
        <p>Listings: <strong>${data._count.listings}<p></strong>
        `;
    } else {
      throw data.errors[0].message;
    }
  } catch (e) {
    userInfo.innerHTML = `    
                                <h1>Error</h1>
                                </p>Something went wrong:</p>
                                <p>${e}</p>
                                `;
  }
}

getUserInfo();
