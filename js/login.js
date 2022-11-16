import { baseUrl } from "./components/baseUrl.mjs";

const loginEmail = document.querySelector(".login_email").value = localStorage.getItem("email")
const loginPassword = document.querySelector(".login_password").value = localStorage.getItem("password")
const loginBtn = document.querySelector(".login_btn");
const errorMessage = document.querySelector(".alert-danger")
const errorInfo = document.querySelector(".create_account_error")


loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const loginEmail = document.querySelector(".login_email").value;
  const loginPassword = document.querySelector(".login_password").value;
  const user = {
    email: loginEmail,
    password: loginPassword,
  };
  async function login(endpoint) {
    try {
      const reply = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(user),
      });

      const data = await reply.json();

      if (reply.status === 200) {
        localStorage.clear()
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        localStorage.setItem("avatar", data.avatar);
        localStorage.setItem("accessToken", data.accessToken);
        // localStorage.setItem("credits", data.credits);
        window.location.href = "home.html";
      }else{
        errorMessage.classList.remove("danger_hidden")
        errorInfo.innerHTML = `<p>${data.errors[0].message}<p>`}

      console.log(results);
    } catch (e) {
      console.log(e);
    }
  }
  login("/social/auth/login");
});
