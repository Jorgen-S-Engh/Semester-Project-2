import { baseUrl } from "./components/baseUrl.mjs";

const listingContainer = document.querySelector(".listing__container");

async function getListings () {
    try{
        const reply = await fetch(`${baseUrl}/auction/listings`);
        const data = await reply.json();
        console.log(data);
        const today = new Date();
        
        for (let i = 0; i < data.length; i++){
            const newDate = new Date(data[i].endsAt)
            const isoDate = newDate.toISOString();
            console.log(newDate)
            
            //const name = person ? person.name : "stranger";
            //condition ? exprIfTrue : exprIfFalse

            listingContainer.innerHTML += 
                                            `
                                        <div class="col-sm-12 col-md-4 col-lg-3 item-container-test rounded m-3 p-3">
                                        <a href="product.html?id=${data[i].id}">
                                            <div class="card-container d-flex flex-column align-items-center justify-content-center text-center">
                                                <h4>${data[i].title}</h4>
                                                <img src="${data[i].media}" class="card-img-top item-img mt-3" alt="...">
                                                <p class="description">${data[i].description}</p>
                                                <p>Bids: ${data[i]._count.bids}
                                                <p>${newDate < today ? `<p>Utgått</p>` : `<p>${newDate}</p>`}</p>
                                                <p>Ends at: ${newDate.toDateString()}</p>
                                                <button class="btn btn-primary m-3">Place bid</button>
                                            </div>
                                        </a>
                                    </div>


                                        
                                            `
        }

    }
    catch(e){

    }
}

getListings();