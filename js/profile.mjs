import { setImg } from "./components/setProfileImg.mjs"
import { baseUrl } from "./components/baseUrl.mjs";

const endpoint =`/auction/profiles/${localStorage.getItem("name")}`
const unserInfo = document.querySelector(".user-info");
console.log(`${baseUrl}${endpoint}`)

const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
}



async function getUserInfo() {
    try {
      const reply = await fetch(`${baseUrl}${endpoint}`, options)

      const data = await reply.json();
      console.log(data)


    } catch (e) {
      console.log(e);
    }
}

getUserInfo();

                        

