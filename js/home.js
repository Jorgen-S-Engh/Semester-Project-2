const profileName = document.querySelector(".header-name").innerHTML = `${localStorage.getItem("name")}`
const profileImg = document.querySelector(".profile-img-small")

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

btnLogout.addEventListener("click", () =>{
    localStorage.clear();
    window.location = "index.html";
})





