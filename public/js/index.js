const socket = io();
let sideBar = document.querySelector(".sideBar");
let replySend = document.querySelector(".reply-send");
let replyMain = document.querySelector(".reply-main");
let mic = document.querySelector(".fa-microphone");
let select = document.querySelector(".heading-name-meta");
let online = document.querySelector(".heading-online");

let me = 0;
let localuserId = localStorage.getItem("token");
if (!localuserId) {
  window.location = "/login";
}

socket.emit("connectUser", localuserId);

function usersList(users) {
  sideBar.innerHTML = "";
  users.forEach((user) => {
    let div = document.createElement("div");
    div.innerHTML = `
    <div class="col-sm-3 col-xs-3 sideBar-avatar">
      <div class="avatar-icon">
        <img
          src=${user.imageLink} />
      </div>
    </div>
    <div class="col-sm-9 col-xs-9 sideBar-main">
      <div class="row">
        <div class="col-sm-8 col-xs-8 sideBar-name">
          <span class="name-meta">${user.username} </span>
        </div>
        <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
          <span class="time-meta pull-right">${new Date(user.create_at)} </span>
        </div>
      </div>
  </div>`;
    div.classList.add("sideBar-body");
    div.classList.add("row");
    div.id = user._id;
    div.onclick = function () {
      conversation.innerHTML = `<div class="row message-previous">
      <div class="col-sm-12 previous">
        <a onclick="previous(this)" id="ankitjain28" name="20">
          Show Previous Message!
        </a>
      </div>
    </div>`;
      select.textContent = user.username;
      socket.emit("select", user._id);
      select.src = user.imageLink;
      select.id = user._id;
      user.active
        ? (online.textContent = "online")
        : (online.textContent = "offline");
      online.style.display = "block";
    };
    sideBar.append(div);
  });
}

socket.on("messages", (user) => {
  console.log(user);
});

socket.on("off", () => {
  localStorage.clear();
  window.location = "/login";
});
socket.on("on", (user) => {
  avatar.src = user.imageLink;
  me = user._id;
});

socket.on("newUser", (users) => {
  usersList(users);
});

socket.on("newmessage", (mess) => {
  let date = new Date(new Date()).toString();
  conversation.innerHTML += `<div class="row message-body">
  <div class="col-sm-12 message-main-receiver">
    <div class="receiver">
      <div class="message-text">${mess}</div>
      <span class="message-time pull-right">${
        date.split(" ")[0] + "     " + date.split(" ")[4]
      }</span>
    </div>
  </div>
</div>`;
});

function message(e) {
  if (comment.value) {
    let date = new Date(new Date()).toString();
    socket.emit("new", comment.value);
    conversation.innerHTML += ` <div class="row message-body">
    <div class="col-sm-12 message-main-sender">
      <div class="sender">
        <div class="message-text">${comment.value}</div>
        <span class="message-time pull-right">${
          date.split(" ")[0] + "     " + date.split(" ")[4]
        } </span>
      </div>
    </div>
  </div>
</div>`;
  }
  comment.value = "";
}
replySend.onclick = message;

let listen = new webkitSpeechRecognition();
listen.lang = "uz-UZ";

mic.onclick = () => {
  listen.start();
};
listen.onresult = (event) => {
  let arg = event.results[0][0].transcript;
  comment.value = arg;
  message();
};
