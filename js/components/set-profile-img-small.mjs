/**
 * Takes the image from the local storage and sets it as profile image. If localstorrage = "" the profile image will be an placeholder-image.
 */

export function setImgSmall() {
  const profileImg = document.querySelector(".profile-img-small");
  const profileName = document.querySelector(".header-name");
  const profileNameContainer = document.querySelector(".header-name-container");
  if (
    localStorage.getItem("avatar") === "" ||
    localStorage.getItem("avatar") === null
  ) {
    profileImg.src = "img/user-profile.png";
  } else {
    profileImg.src = localStorage.getItem("avatar");
  }

  if (localStorage.getItem("name") === null) {
    profileNameContainer.innerHTML = `<p>Welcome</p>`;
  } else {
    profileName.innerHTML = `${localStorage.getItem("name")}`;
  }
}
setImgSmall();
