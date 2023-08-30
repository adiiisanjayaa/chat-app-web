export async function postData(url = "", data) {
  var myHeaders = new Headers();
  let token = JSON.parse(localStorage.getItem("user"));
  myHeaders.append("Authorization", token["token"]);
  myHeaders.append("x-api-key", "binar-36");
  myHeaders.append("Cookie", `accessToken=${token["token"]}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(data);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    return fetch(url, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log("error", error));
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getData(url = "") {
  var myHeaders = new Headers();
  let token = JSON.parse(localStorage.getItem("user"));
  myHeaders.append("Authorization", token["token"]);
  myHeaders.append("x-api-key", "binar-36");
  myHeaders.append("Cookie", `accessToken=${token["token"]}`);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    return fetch(url, requestOptions)
      .then((response) => {
        if (response.status != 200) {
          localStorage.clear();
        }
        return response.json();
      })
      .catch((error) => console.log("error", error));
  } catch (error) {
    return null;
  }
}

export async function putData(url = "", data) {
  var myHeaders = new Headers();
  let token = JSON.parse(localStorage.getItem("user"));
  myHeaders.append("Authorization", token["token"]);
  myHeaders.append("x-api-key", "binar-36");
  myHeaders.append("Cookie", `accessToken=${token["token"]}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(data);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    return fetch(url, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log("error", error));
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteData(url = "") {
  var myHeaders = new Headers();
  let token = JSON.parse(localStorage.getItem("user"));
  myHeaders.append("Authorization", token["token"]);
  myHeaders.append("x-api-key", "binar-36");
  myHeaders.append("Cookie", `accessToken=${token["token"]}`);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    return fetch(url, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log("error", error));
  } catch (error) {
    console.log(error);
    return null;
  }
}
