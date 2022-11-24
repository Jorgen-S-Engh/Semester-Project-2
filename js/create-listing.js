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
const errorMessage = document.querySelector(".alert-danger")
const errorInfo = document.querySelector(".create_account_error")
const baseUrlCE = "https://api.noroff.dev/api/v1"

newListBtn.addEventListener("click", createEntry);

async function createEntry () {
    const ceTags = document.querySelector(".CE-tags").value;
    const ceMedia = document.querySelector(".CE-media").value;
    const ceEndDate = document.querySelector(".CE-end-date").value;
    const ceDesc = document.querySelector(".CE-desc").value;
    const ceTitle = document.querySelector(".CE-title").value;
    console.log("date is" +ceEndDate)

    const ceTagsArray = ceTags.split(" ")
    const ceMediaArray = ceMedia.split(" ")
    newDate = new Date(ceEndDate)
    isoDate = newDate.toISOString();
    console.log(isoDate)

    if (ceMediaArray[0] === ""){
        ceMediaArray.length = 0;
    }

    const entry = {
        title: ceTitle,
        description: ceDesc,
        tags: ceTagsArray,
        media: ceMediaArray,
        endsAt: isoDate,
    };

    console.log(entry.title)

    if (entry.title !== ""){
        try{
            const reply = await fetch(`${baseUrlCE}/auction/listings`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    
                },
                body: JSON.stringify(entry),
            });
            const data = await reply.json();
            console.log(data)
            if (reply.status !== 201){
                errorMessage.classList.remove("danger_hidden");
                errorInfo.innerHTML = `<p>${data.errors[0].message}<p>`
            }
        }
        catch(e){
    
        }
    }else{
        errorMessage.classList.remove("danger_hidden")
        errorInfo.innerHTML = `<p>Plese enter a title<p>`
    }

}








