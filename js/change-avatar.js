import { baseUrl } from "./components/baseUrl.mjs";

const btnChangeAvatar = document.querySelector(".btn-change-avatar");
const inputMedia = document.querySelector(".CA-media");
const profileImg = document.querySelector(".profile-user-image");
const changeAvatarmessage = document.querySelector(".change-avatar-error");

btnChangeAvatar.addEventListener("click", changeMedia);

async function changeMedia (e){
    e.preventDefault();
    
    const avatar = {
        avatar: inputMedia.value,
    };

    try{
        const response = await fetch(`${baseUrl}/auction/profiles/${localStorage.getItem("name")}/media`, {
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,

            },
            body: JSON.stringify(avatar)
        })
        const data = await response.json();
        console.log(response)
        console.log(data)

        if(response.status === 200){
            localStorage.setItem("avatar", inputMedia.value);
            profileImg.src = inputMedia.value;
            inputMedia.value = "";
            location.reload();
        }else{
            changeAvatarmessage.classList.remove("alert-danger-hidden");
            changeAvatarmessage.innerHTML = `${data.errors[0].message}`
        }

    }catch(e){
        
    }
}