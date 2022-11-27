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

// ---------------------------------------Create Entry -------------------------------------
const newListBtn = document.querySelector(".new-listing-modal__btn");
const errorMessage = document.querySelector(".alert-danger");
const errorInfo = document.querySelector(".create_account_error");
const successMessage = document.querySelector(".success_hidden");
const baseUrlCE = "https://api.noroff.dev/api/v1";

newListBtn.addEventListener("click", createEntry);

async function createEntry () {
    const ceTags = document.querySelector(".CE-tags").value;
    const ceMedia = document.querySelector(".CE-media").value;
    const ceEndDate = document.querySelector(".CE-end-date").value;
    const ceDesc = document.querySelector(".CE-desc").value;
    const ceTitle = document.querySelector(".CE-title").value;

    const ceTagsArray = ceTags.split(" ");
    const ceMediaArray = ceMedia.split(" ");

    const today = new Date();
    const todayIso = today.toISOString();
    let isoDate;

    if (ceEndDate === ""){
        errorMessage.classList.remove("danger_hidden");
        errorInfo.innerHTML = `<p>Plese enter a valid date<p>`
    }
    else{
        newDate = new Date(ceEndDate)
        isoDate = newDate.toISOString();

    }

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

    if(entry.title === ""){
        errorMessage.classList.remove("danger_hidden")
        errorInfo.innerHTML = `<p>Plese enter a title<p>`
    }

    if(todayIso > isoDate){
        errorMessage.classList.remove("danger_hidden")
        errorInfo.innerHTML = `<p>End date must be in the future<p>`
    }

    if (entry.title !== "" && todayIso < isoDate){
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
            console.log(reply)
            console.log(data)
            if (reply.status !== 201){
                errorMessage.classList.remove("danger_hidden");
                errorInfo.innerHTML = `<p>${data.errors[0].message}<p>`
            }else{
                errorMessage.classList.add("danger_hidden");
                successMessage.classList.remove("success_hidden");
                setTimeout(() => {
                    modal.classList.add("modal-hidden")
                  }, "2000")
            }
        }
        catch(e){
    
        }
    }

}








