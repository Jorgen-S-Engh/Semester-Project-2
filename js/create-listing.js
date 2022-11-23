// ---------------------------------------Modal -------------------------------------
const btnNewListing = document.querySelector(".btn-new-listing");
const closeModal = document.querySelector(".new-listing-modal__btn-close")
const modal = document.querySelector(".modal-background");

btnNewListing.addEventListener("click", () =>{
    modal.classList.remove("modal-hidden")
})

closeModal.addEventListener("click", () =>{
    modal.classList.add("modal-hidden")
})

window.onclick = (e) => {
    if (e.target === modal) {
      modal.classList.add("modal-hidden");
    }
};


// ---------------------------------------Modal -------------------------------------
const newListBtn = document.querySelector(".new-listing-modal__btn");
const baseUrlCE = "https://api.noroff.dev/api/v1"

newListBtn.addEventListener("click", createEntry);

async function createEntry () {
    const ceTags = document.querySelector(".createEntryTags").value;
    const ceMedia = document.querySelector(".createEntryMedia").value;
    const ceEndDate = document.querySelector(".createEntryEndDate").value;
    const ceDesc = document.querySelector(".createEntryDesc").value;
    const ceTitle = document.querySelector(".createEntryTitle").value;
    const entry = {
        title: ceTitle,
        description: ceDesc,
        tags: ceTags,
        media: ceMedia,
        endsAt: ceEndDate,
    };
    console.log(entry)
    try{
        const reply = await fetch(`${baseUrlCE}/auction/listings`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(entry),
        });
        const data = await reply.json();
        console.log(data)


    
    }

    catch(e){

    }

}








