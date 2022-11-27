import { baseUrl } from "./components/baseUrl.mjs";
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id")
console.log(id)

async function getSingleListing(){
    try{
        const reply = await fetch(`${baseUrl}/auction/listings/${id}`)
        const data = await reply.json();
        console.log(data);

    }
    catch(e){

    }
}
getSingleListing();
