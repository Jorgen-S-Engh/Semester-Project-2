import { baseUrl } from "./components/baseUrl.js";
const profileName = document.querySelector(".header-name");
const profileNameContainer = document.querySelector(".header-name-container");
const profileImg = document.querySelector(".profile-img-small");


if(localStorage.getItem("name")=== null){
    profileNameContainer.innerHTML = `<p>Welcome</p>`
}else{
    profileName.innerHTML = `${localStorage.getItem("name")}`
}

/**
 * Takes the image from the local storage and sets it as profile image. If localstorrage = "" the profile image will be an placeholder-image.
 */

function setImg () {
    if (localStorage.getItem("avatar") !== ""){
        profileImg.src = localStorage.getItem("avatar");
    }else{
        profileImg.src = "img/user-profile.png"
    } 
}

setImg();

// ----------------------- Log out ----------------------
const btnLogout = document.querySelector(".btn-logout")

if(localStorage.getItem("name") === null){
    btnLogout.innerHTML = `Log in`
}

btnLogout.addEventListener("click", () =>{
    localStorage.clear();
    window.location = "index.html";
})




