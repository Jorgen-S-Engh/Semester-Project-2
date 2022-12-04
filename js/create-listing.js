// ---------------------------------------Create Entry -------------------------------------
const newListBtn = document.querySelector(".new-listing-modal__btn");
const errorMessage = document.querySelector(".alert-danger-CE");
const errorInfo = document.querySelector(".create-entry-error");
const successMessage = document.querySelector(".alert-success-CE");
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
        errorMessage.classList.remove("alert-danger-hidden");
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
        console.log("title not present")
        errorMessage.classList.remove("alert-danger-hidden")
        errorInfo.innerHTML = `Plese enter a title`
    }

    if(todayIso > isoDate){
        errorMessage.classList.remove("alert-danger-hidden")
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
                errorMessage.classList.remove("alert-danger-hidden");
                errorInfo.innerHTML = `<p>${data.errors[0].message}<p>`
            }else{
                errorMessage.classList.add("alert-danger-hidden");
                successMessage.classList.remove("alert-success-hidden");
                setTimeout(() => {
                    modal.classList.add("modal-hidden")
                  }, "2000")
            }
        }
        catch(e){
    
        }
    }

}








