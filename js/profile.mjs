import { setImg } from "./components/setProfileImg.mjs"
import { baseUrl } from "./components/baseUrl.mjs";
const endpoint =`/auction/profiles/${localStorage.getItem("name")}`
const unserInfo = document.querySelector(".user-info");
const userListings = document.querySelector(".user-listings");


const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
}


async function getUserInfo() {
    try {
      const reply = await fetch(`${baseUrl}${endpoint}`, options)
      const data = await reply.json();
      unserInfo.innerHTML = `
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


async function getListings() {
    try {
      const reply = await fetch(`${baseUrl}${endpoint}/listings`, options)
      const data = await reply.json();
      userListings.innerHTML = `<h2>${localStorage.getItem("name")}'s Listings</h2>`
      for (let i = 0; i < data.length; i++){
        // console.log(data[i].title)
        // console.log(data[i].media)
        // for(let j = 0; i< data[i].media.length; j++){
        //     //warning infinite loop
        //     // console.log(data[i].media[j])
        // }
        userListings.innerHTML += 
                                    `
                                    <div class="container listing-item border">
                                        <p>${data[i].title}<p>
                                        <p>${data[i].description}<p>
                                    </div>
                                    
                                     `
      }
    } catch (e) {
      console.log(e);
    }
}

getListings();


async function allListings() {
  try {
    const reply = await fetch(`${baseUrl}/auction/listings`, options)
    const data = await reply.json();
  
    // console.log(d.getUTCHours()); 
    // console.log(d[Symbol.toPrimitive]('string'));
    
    for(let i = 0; i < data.length; i++){
      let d = new Date(`${data[i].endsAt}`);
      console.log(d[Symbol.toPrimitive]('string'));
      console.log(d.getDate(),d.getMonth(), d.getFullYear(), d.getHours(), d.getMinutes())
      

      
    }
    

  } catch (e) {
    console.log(e);
  }
}

allListings();





                        

