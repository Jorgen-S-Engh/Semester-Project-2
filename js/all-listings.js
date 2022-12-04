import { baseUrl } from "./components/baseUrl.mjs";

const listingContainer = document.querySelector(".listing__container");

async function getListings () {
    try{
        const reply = await fetch(`${baseUrl}/auction/listings`);
        const data = await reply.json();
        console.log(data);

        for (let i = 0; i < data.length; i++){
            console.log(data[i].id)
            console.log(data[i].title)
            console.log(data[i].description)

            listingContainer.innerHTML += 
                                            `
                                        <div class="col-sm-12 col-md-4 col-lg-3 item-container-test rounded m-3 p-3">
                                        <a href="product.html?id=${data[i].id}">
                                            <div class="card-container d-flex flex-column align-items-center justify-content-center text-center">
                                                <h4>${data[i].title}</h4>
                                                <img src="${data[i].media}" class="card-img-top item-img mt-3" alt="...">
                                                <p class="description">${data[i].description}</p>
                                                <button class="btn btn-primary m-3">Place bid</button>
                                            </div>
                                        </a>
                                    </div>


                                        
                                            `

            // listingContainer.innerHTML += `
            //                                 <a href="product.html?id=${data[i].id}" class="listings__item item-container d-flex justify-content-center">
            //                                     <h3>${data[i].title}</h3>
            //                                 </a>
            //                                 `



        }



    }
    catch(e){

    }
}

getListings();