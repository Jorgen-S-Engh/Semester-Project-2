const profileImg = document.querySelector(".profile-img-small");

export function setImg () {
    const profileImg = document.querySelector(".profile-user-image")
    if (localStorage.getItem("avatar") !== ""){
        profileImg.src = localStorage.getItem("avatar");
    }else{
        profileImg.src = "img/user-profile.png"
    } 
}
setImg();