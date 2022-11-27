const userListingsContainer = document.querySelector(".user-listings__container");
const userListingsHeadline = document.querySelector(".user-listings__headline");
const baseUrlGL = "https://api.noroff.dev/api/v1"

const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
}

async function getUserListings (){
    try{
        const reply = await fetch(`${baseUrlGL}/auction/profiles/${localStorage.getItem("name")}/listings`,options)
        const data = await reply.json();
        console.log(data)
        userListingsHeadline.innerHTML = `${localStorage.getItem("name")}'s items`

        for(let i = 0; i < data.length; i++){
            userListingsContainer.innerHTML +=
                                        `<div class="user-listings__item text-center m-3 p-3 rounded">
                                            <h3>${data[i].title}</h3>
                                            <p>${data[i].description}</p>
                                            <button class="btn btn-secondary btn-delete-listing">Delete Listing</button>
                                        </div>
                                        `
        }

    }catch(e){

    }
}

getUserListings();

const deleteEntry = document.querySelector(".btn-delete-listing");

deleteEntry.addEventListener("click", () =>{
    console.log("click")
})

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id")
console.log(id)
console.log(params)
