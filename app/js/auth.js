// import { postData } from "./apiMethod.js";

async function login(username, password) {
  var myHeaders = new Headers();
  myHeaders.append("x-api-key", "binar-36");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    username: username,
    password: password,
  });

  console.log("data login: ", raw);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch("http://localhost:3000/api/v1/auth/login", requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}

async function register(name, email, username, password) {
  var myHeaders = new Headers();
  myHeaders.append("x-api-key", "binar-36");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    username: username,
    password: password,
    name: name,
    email: email,
  });

  console.log("data register: ", raw);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch("http://localhost:3000/api/v1/auth/register", requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}

function init() {
  if (window.location.href.includes("login")) {
    let loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      let username = document.getElementById("usernameInput").value;
      let password = document.getElementById("passwordInput").value;

      let result = await login(username, password);
      console.log(result["data"]);
      if (result["data"] != null) {
        localStorage.setItem("user", JSON.stringify(result["data"]));
        window.location = "index.html";
      }
    });
  }

  if (window.location.href.includes("register")) {
    let registerForm = document.getElementById("registerForm");
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      let username = document.getElementById("usernameInput").value;
      let password = document.getElementById("passwordInput").value;
      let name = document.getElementById("nameInput").value;
      let email = document.getElementById("emailInput").value;

      let result = await register(name, email, username, password);
      console.log(result["data"]);
      if (result["data"] != null) {
        window.location = "login.html";
      }
    });
  }
}

init();
