export function loginLogout () {
    const btnLogout = document.querySelector(".btn-logout")

    if(localStorage.getItem("name") === null){
        btnLogout.innerHTML = `Log in`
    }

    btnLogout.addEventListener("click", () =>{
        localStorage.clear();
        window.location = "index.html";
    })

}
loginLogout();