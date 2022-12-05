
const profileName = document.querySelector(".header-name");
const profileNameContainer = document.querySelector(".header-name-container");
const profileImg = document.querySelector(".profile-img-small");


if(localStorage.getItem("name")=== null){
    profileNameContainer.innerHTML = `<p>Welcome</p>`
}else{
    profileName.innerHTML = `${localStorage.getItem("name")}`
}



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


