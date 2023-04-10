const { Router } = require("express");
const auth = require("../controllers/auth");
const upload = require("../middleware/upload");

const userRouter = Router();
userRouter
  .post("/users/register", upload.file, auth.register)
  //   .post("/users/login", auth.login)
  .post("/users/login", auth.login);

module.exports = userRouter;
