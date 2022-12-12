const userListingsContainer = document.querySelector(".user-listings__container");
const userListingsHeadline = document.querySelector(".user-listings__headline");
const body = document.querySelector("body");
const baseUrlGL = "https://api.noroff.dev/api/v1"

const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
}

async function getUserListings (){
    if(localStorage.getItem("name")!==null){
        try{
            const reply = await fetch(`${baseUrlGL}/auction/profiles/${localStorage.getItem("name")}/listings`,options)
            const data = await reply.json();
            console.log(data)
            userListingsHeadline.innerHTML = `${localStorage.getItem("name")}'s items`
            const listingID = []
    
            for(let i = 0; i < data.length; i++){
                userListingsContainer.innerHTML +=
                                            `<div class="user-listings__item text-center m-3 p-3 rounded">
                                                <img class="card-img-top item-img mt-3" src="${data[i].media}" alt="${data[i].title}">
                                                <h3>${data[i].title}</h3>
                                                <p>${data[i].description}</p>
                                                <button class="btn btn-secondary btn-delete-listing">Delete Listing</button>
                                            </div>
                                            `
    
                listingID.push(data[i].id)
            }
            deleteListing(listingID);
        }catch(e){
    
        }

    }else{
        body.innerHTML = 
                        `
                        <nav class="navbar navbar-expand-lg navbar-dark bg-primary d-flex justify-content-center">
                             <ul class="navbar-nav d-flex">
                                <li class="nav-item">
                                    <a class="nav-link" href="feed.html"><img class="house-logo" src="img/home white.png" alt="Icon of a house"></a>
                                </li>
                            </ul>
                        </nav>
                        <div class="container mt-4 d-flex flex-column align-items-center">
                            <h1 class="text-center">Login to view profile</h1>
                            <form class="text-center mt-4" action="index.html">
                                <button class="btn btn-secondary">To Login</button>
                        </form>
                        </div>`
    }





}



getUserListings();

// Legger på en eventlistner på containeren som den skal ligge inn i. Sjekker at event.target er korrekt => gjør det man ønsker. 

// userListingsContainer.addEventListener("click", deleteListing)

// function deleteListing(id){
//     window.onclick = (e) => {
//         if (e.target.classList.contains('btn-delete-listing')) {
//           console.log("button!!!!")
//         }
//     };

// }




