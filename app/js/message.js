import { deleteData, getData, postData, putData } from "./apiMethod.js";

export async function getRecentChat() {
  let data = JSON.parse(localStorage.getItem("user"));
  let user = data["user"][0];
  getData(
    `http://localhost:3000/api/v1/message/recent/${user["uid_users"]}`
  ).then(async (data) => {
    console.log("recent chat : ", data["data"]);
    let chat = document.getElementById("recent-chat");
    chat.innerHTML = "";
    if (data != null) {
      var chats = data["data"];
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].uid_users2 !== user.uid_users) {
          var a = document.createElement("div");
          a.innerHTML = `
            <a href="?user=${chats[i].uid_users2}&name=${chats[i].name}" class="d-flex align-items-center" style="float:left">
                <div class="flex-shrink-0">
                    <img class="img-fluid img-fluid-o" src="https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg" alt="user img">
                    <span class="active"></span>
                </div>
                <div class="flex-grow-1 ms-3">
                    <h3 id="name">${chats[i].name}</h3>
                    <p>${chats[i].last_chat}</p>
                </div>
            </a>

            <a href='?del=${chats[i].id_room}' style="float:right">
              <i class="fa fa-trash mt-3"  aria-hidden="true"></i>
            </a>`;
          chat.appendChild(a);
        }
      }
      if (chats.length > 0) {
        let currentChat = chats[0];
        document.getElementById("chatBox").innerHTML = `
          <div class="modal-dialog-scrollable">
            <div class="modal-content">
                <div class="msg-head">
                    <div class="row">
                        <div class="col-8">
                            <div class="d-flex align-items-center">
                                <span class="chat-icon"><img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/arroleftt.svg" alt="image title"></span>
                                <div class="flex-shrink-0">
                                    <img class="img-fluid img-fluid-o" src="https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg" alt="user img">
                                </div>
                                <div class="flex-grow-1 ms-3">
                                    <h3 id="currentName">${currentChat.name}</h3>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <ul class="moreoption">
                                <li class="navbar nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#">Action</a></li>
                                        <li><a class="dropdown-item" href="#">Another action</a></li>
                                        <li>
                                            <hr class="dropdown-divider">
                                        </li>
                                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


                <div class="modal-body" id="modal-body">
                    <div class="msg-body" >
                      <ul id="msg-body">
                          
                      </ul>
                    </div>
                </div>


                <div class="send-box">
                    <form class="" id="sentForm" onSubmit="return false">
                        <input type="text" class="form-control" id="content" name="content" aria-label="message…" placeholder="Write message…">

                        <button id="btnSent" type="submit"><i class="fa fa-paper-plane" aria-hidden="true"></i> Send</button>
                    </form>

                    <div class="send-btns">
                        <div class="attach">
                            <div class="button-wrapper">
                                <span class="label">
                                    <img class="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/upload.svg" alt="image title"> attached file 
                                </span><input type="file" name="upload" id="upload" class="upload-box" placeholder="Upload File" aria-label="Upload File">
                            </div>

                            <select class="form-control" id="exampleFormControlSelect1">
                                <option>Select template</option>
                                <option>Template 1</option>
                                <option>Template 2</option>
                            </select>

                            <div class="add-apoint">
                                <a href="#" data-toggle="modal" data-target="#exampleModal4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewbox="0 0 16 16" fill="none"><path d="M8 16C3.58862 16 0 12.4114 0 8C0 3.58862 3.58862 0 8 0C12.4114 0 16 3.58862 16 8C16 12.4114 12.4114 16 8 16ZM8 1C4.14001 1 1 4.14001 1 8C1 11.86 4.14001 15 8 15C11.86 15 15 11.86 15 8C15 4.14001 11.86 1 8 1Z" fill="#7D7D7D"/><path d="M11.5 8.5H4.5C4.224 8.5 4 8.276 4 8C4 7.724 4.224 7.5 4.5 7.5H11.5C11.776 7.5 12 7.724 12 8C12 8.276 11.776 8.5 11.5 8.5Z" fill="#7D7D7D"/><path d="M8 12C7.724 12 7.5 11.776 7.5 11.5V4.5C7.5 4.224 7.724 4 8 4C8.276 4 8.5 4.224 8.5 4.5V11.5C8.5 11.776 8.276 12 8 12Z" fill="#7D7D7D"/></svg> Appoinment</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
      `;

        // checkRoom(currentChat.uid_users2);
      }

      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      let value = params;
      if (value.user == null && value.del == null) {
        // window.location = `?user=${chats[0].uid_users2}`;
      }

      if (value.del != null) {
        deleteRoom(value.del, chats);
      }
      getUsers();
    }
  });

  function deleteRoom(roomId, chats) {
    let data = JSON.parse(localStorage.getItem("user"));
    let user = data["user"][0];
    deleteData(
      `http://localhost:3000/api/v1/message/room/delete/${roomId}`
    ).then((data) => {
      console.log("delete room: ", data["data"]);
      if (chats.length > 0) {
        window.location = `index.html`;
      }
    });
  }
}

function getUsers() {
  let data = JSON.parse(localStorage.getItem("user"));
  let user = data["user"][0];
  getData(`http://localhost:3000/api/v1/user/${user.username}`).then(
    async (data) => {
      let users = document.getElementById("users");
      users.innerHTML = "";
      if (data != null) {
        var usersData = data["data"];
        for (var i = 0; i < usersData.length; i++) {
          var a = document.createElement("div");
          a.innerHTML = `
          <a href="?user=${usersData[i].uid_users}&name=${usersData[i].name}" class="d-flex align-items-center">
              <div class="flex-shrink-0">
                  <img class="img-fluid img-fluid-o" src="https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg" alt="user img">
                  <span class="active"></span>
              </div>
              <div class="flex-grow-1 ms-3">
                  <h3 id="name">${usersData[i].name}</h3>
                  <p>${usersData[i].email}</p>
              </div>
          </a>`;
          users.appendChild(a);
        }
      }
    }
  );
}

export async function getDetailChat(idRoom) {
  localStorage.setItem("detailRoom", idRoom);
  let data = JSON.parse(localStorage.getItem("user"));
  let user = data["user"][0];
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let value = params;
  if (value.name != null) {
    console.log("name", value.name);
    let n = document.getElementById("currentName");
    n.innerText = value.name;
  }
  getData(`http://localhost:3000/api/v1/message/detail/${idRoom}`).then(
    (data) => {
      console.log("detail chat : ", data["data"]);
      let body = document.getElementById("msg-body");
      let chats = data["data"];
      console.log(body);
      if (body == null) {
        location.reload();
      }
      body.innerHTML = "";
      if (data != null) {
        for (var i = 0; i < chats.length; i++) {
          let itemChat = chats[i];
          var a = document.createElement("li");
          a.className =
            user.uid_users == itemChat.uid_users ? "repaly" : "sender";

          a.innerHTML = `
            <p> ${itemChat.content} </p>
            <span class="time">${itemChat.created_at}</span>
          `;
          body.appendChild(a);
        }
        var objDiv = document.getElementById("modal-body");
        objDiv.scrollTop = objDiv.scrollHeight;
      }
      document.getElementById("btnSent").onclick = function () {
        clickSent();
      };
    }
  );
}

export async function checkRoom(uid) {
  let data = JSON.parse(localStorage.getItem("user"));
  let user = data["user"][0];
  postData(`http://localhost:3000/api/v1/message/check-room`, {
    name: "room-name",
    type: "PRIVATE",
    idUser1: user.uid_users.toString(),
    idUser2: uid,
  }).then((data) => {
    console.log("check room: ", data["data"]);
    getDetailChat(data["data"].id_room);
    // setTimeout(getDetailChat(data["data"].id_room), 10000);
  });
}

export async function clickSent() {
  let content = document.getElementById("content").value;
  let idRoom = localStorage.getItem("detailRoom");
  if (content != undefined && content != "") {
    let data = JSON.parse(localStorage.getItem("user"));
    let user = data["user"][0];
    postData(`http://localhost:3000/api/v1/message/sent`, {
      idRoom: idRoom.toString(),
      idUser: user.uid_users.toString(),
      content: content.toString(),
      contentType: "TEXT",
    }).then((data) => {
      let chat = data["data"];
      console.log("sent chat : ", chat);
      document.getElementById("content").value = "";
      if (chat != null) {
        getDetailChat(idRoom);
      }
    });
  }
}
