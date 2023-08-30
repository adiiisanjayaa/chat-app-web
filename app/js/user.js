import { putData } from "./apiMethod.js";

function initProfile() {
  document.getElementById("btnLogout").onclick = function () {
    localStorage.clear();

    window.location = "index.html";
  };
  let data = JSON.parse(localStorage.getItem("user"));
  if (data == null) {
    window.location = "index.html";
  }
  let user = data["user"][0];

  document.getElementById("name").innerHTML = user.name;
  document.getElementById("email").innerHTML = user.email;
  document.getElementById("inputName").defaultValue = user.name;
  document.getElementById("inputEmail").defaultValue = user.email;
  document.getElementById("inputPhone").defaultValue = user.phone;
  document.getElementById("inputAddress").defaultValue = user.address;

  document.getElementById("btnSaveProfile").onclick = function () {
    let email = document.getElementById("inputEmail").value;
    let name = document.getElementById("inputName").value;
    let address = document.getElementById("inputAddress").value;
    let phone = document.getElementById("inputPhone").value;

    putData(`http://localhost:3000/api/v1/user/update/${user.username}`, {
      name: name,
      email: email,
      phone: phone,
      address: address,
    }).then((data) => {
      console.log("update profile: ", data["data"]);
      localStorage.clear();

      window.location = "index.html";
    });
  };
}

initProfile();
