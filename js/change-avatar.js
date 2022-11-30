import { baseUrl } from "./components/baseUrl.mjs";
const btnChangeAvatar = document.querySelector(".btn-change-avatar");
const inputMedia = document.querySelector(".CA-media").value;

btnChangeAvatar.addEventListener("click", changeMedia);

async function changeMedia (e){
    e.preventDefault();

    const avatar = {
        avatar: inputMedia,
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
        localStorage.removeItem("avatar");
        localStorage.setItem("avatar",inputMedia);
        

        location.reload();
        console.log(response)
        console.log(data)

    }catch(e){
        console.log(e)
    }
}