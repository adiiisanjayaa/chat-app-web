import { getRecentChat, checkRoom } from "./message.js";

async function verify(page) {
  let data = JSON.parse(localStorage.getItem("user"));
  if (data == null) {
    window.location = "login.html";
  } else {
    fetch(page)
      .then((response) => response.text())
      .then((text) => (document.getElementById("root").innerHTML = text));
    getRecentChat();

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    let value = params;
    if (value.user != null) {
      console.log("param", value.user);
      checkRoom(value.user);
    }
  }
}

verify("home.html");
