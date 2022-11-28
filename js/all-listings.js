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
                                        <a href="product.html?id=${data[i].id}" class="my-3">
                                            <div class="d-flex justify-content-center my-3 rounded">
                                                <div class="card d-flex flex-column align-items-center">
                                                    <img src="img/new-product.png" class="card-img-top item-img mt-3" alt="...">
                                                    <div class="card-body d-flex flex-column align-items-center">
                                                        <h5 class="card-title">${data[i].title}</h5>
                                                        <p class="card-text text-center">${data[i].description}</p>
                                                        <a href="#" class="btn btn-primary">Make a bid</a>

                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        
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