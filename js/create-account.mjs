import { baseUrl } from "./components/baseUrl.js";


const endpoint = "/auction/auth/register"
const createAccountBtn = document.querySelector(".create_acc_btn")
const successMessage = document.querySelector(".alert-success-CA")
const errorMessage = document.querySelector(".alert-danger-CA")
const errorInfo = document.querySelector(".create_account_error")

createAccountBtn.addEventListener("click", createAccount)

/**
 * Sends a POST request to create a new account. Takes values from the input fields and modifies the data to crate the body of the API-call.  
 * 
 */

async function createAccount (e){
    e.preventDefault();
    const loginName = document.querySelector(".login_name").value;
    const loginEmail = document.querySelector(".login_email").value;
    const loginPassword = document.querySelector(".login_password").value;
    const loginAvatar = document.querySelector(".login_avatar").value;
    const user = {
        name: loginName,
        email: loginEmail,
        password: loginPassword,
        avatar: loginAvatar,
        
    };
    try{
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        const data = await response.json();
        if (response.status === 200 || response.status === 201){
            successMessage.classList.remove("alert-success-hidden")
            errorMessage.classList.add("alert-danger-hidden")
            localStorage.clear()
            localStorage.setItem("password",loginPassword);
            localStorage.setItem("email", loginEmail);
            setTimeout(() => {
                window.location.href = "index.html"
              }, "2000")
            
        }else{
            errorMessage.classList.remove("alert-danger-hidden")
            errorInfo.innerHTML = `<p>${data.errors[0].message}<p>`


        }
    }catch(e){
        console.log(e)
    }
}