import { baseUrl } from "./components/baseUrl.mjs";
import { setImg } from "./components/setProfileImg.mjs";

const btnChangeAvatar = document.querySelector(".btn-change-avatar");
const inputMedia = document.querySelector(".CA-media");
const profileImg = document.querySelector(".profile-user-image");

btnChangeAvatar.addEventListener("click", changeMedia);

async function changeMedia (e){
    e.preventDefault();
    

    const avatar = {
        avatar: inputMedia.value,
    };
    console.log(inputMedia);

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

    }catch(e){
        console.log(e)
    }
    finally{
        // localStorage.removeItem('avatar');
        localStorage.setItem("avatar", inputMedia.value);
        profileImg.src = inputMedia.value;
        inputMedia.value = "";
        location.reload();

    }
}