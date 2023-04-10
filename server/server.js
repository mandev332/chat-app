const fileUpload = require("express-fileupload");
const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
require("../db/mongo");

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const userRouter = require("../routers/user.routes");
const Db_user = require("../database/users.js");
const jwt = require("../utils/jwt");
const UserModel = require("../schemas/usersSchema");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(fileUpload());
app.use(express.static(path.join(process.cwd(), "public")));

app.use(userRouter);

app.get("*", (req, res) => {
  let url = req.url.slice(1);
  if (["login", "register", "index", "admin"].includes(url))
    res.sendFile(path.join(process.cwd(), "views", url + ".html"));
  else res.send(`Path ${url} not found`);
});

io.on("connection", async (socket) => {
  socket.on("connectUser", async (data) => {
    let id = jwt.VERIFY(data);
    if (!id) socket.emit("off");
    let user = await Db_user.find(id.payload);
    socket.emit("on", user);
  });
  let users = await Db_user.find();
  io.emit("newUser", users);

  socket.on("select", async (id) => {
    let user = await UserModel.findById(id);
  });
  socket.on("new", (data) => {
    socket.broadcast.emit("newmessage", data);
  });

  socket.on("disconnect", (socket) => {
    console.log(socket);
  });
});

server.listen(PORT, () => {
  console.log("listening on " + PORT);
});
