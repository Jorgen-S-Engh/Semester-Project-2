import { baseUrl } from "./components/baseUrl.js";

const btnChangeAvatar = document.querySelector(".btn-change-avatar");
const inputMedia = document.querySelector(".CA-media");
const profileImg = document.querySelector(".profile-user-image");
const changeAvatarmessage = document.querySelector(".change-avatar-error");

btnChangeAvatar.addEventListener("click", changeMedia);


/**
 * Changes the media for avatar
 */

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
        if(response.status === 200){
            localStorage.setItem("avatar", inputMedia.value);
            profileImg.src = inputMedia.value;
            inputMedia.value = "";
            location.reload();
        }else{
            throw data.errors[0].message

        }

    }catch(e){
        changeAvatarmessage.classList.remove("alert-danger-hidden");
        changeAvatarmessage.innerHTML = e

        
    }
}