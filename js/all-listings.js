import { baseUrl } from "./components/baseUrl.mjs";
const listingContainer = document.querySelector(".listing__container");

const baseEndPoint = "/auction/listings"
const endpointDesc ="/auction/listings?sort=created&sortOrder=desc"
const endpointAsc ="/auction/listings?sort=created&sortOrder=asc"

const btnNewest = document.querySelector(".btn-newest");
const btnOldest = document.querySelector(".btn-oldest");

btnNewest.addEventListener("click", () => {
    listingContainer.innerHTML = ""
    console.log("click")
    getListings(endpointDesc)
});

btnOldest.addEventListener("click", () => {
    listingContainer.innerHTML = ""
    console.log("click")
    getListings(endpointAsc)
});


async function getListings (endpoint) {
    try{
        const reply = await fetch(`${baseUrl}${endpoint}`);
        const data = await reply.json();
        const today = new Date();
        const todayIso = today.toISOString();
        
        
        for (let i = 0; i < data.length; i++){
            const endDate = new Date(data[i].endsAt)
            const endDateIso = endDate.toISOString();


            listingContainer.innerHTML += 
                                            `
                                        <div class="col-sm-12 col-md-4 col-lg-3 item-container-test rounded m-3 p-3">
                                        <a href="product.html?id=${data[i].id}">
                                            <div class="card-container d-flex flex-column align-items-center justify-content-center text-center">
                                                <h4>${data[i].title}</h4>
                                                <img src="${data[i].media.length === 0 ? `img/new-product.png` : `${data[i].media.length > 1}` ? `${data[i].media[0]}` : `${data[i].media}` }" class="card-img-top item-img mt-3" alt="Image of post the with the title: ${data[i].title}">
                                                <p class="description">${data[i].description}</p>
                                                <p>Bids: ${data[i]._count.bids}</p>
                                                <p>${endDateIso < todayIso ? `<p>Expired: ${endDate.toDateString()}</p>` : `<p>Ends at: ${endDate.toDateString()}</p>`}</p>
                                                
                                                <button class="btn btn-primary m-3" ${endDateIso < todayIso ? `disabled="True"`: ""}>More info</button>
                                                </p>${data[i].media.length}
                                            </div>
                                        </a>
                                    </div>

                                            `
        }

    }
    catch(e){

    }
}

getListings(baseEndPoint);

