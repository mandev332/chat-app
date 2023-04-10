const Db_user = require("../database/users");
const jwt = require("../utils/jwt");
const sha256 = require("sha256");
class Auth {
  async index(req, res) {
    console.log("index");
  }
  async login(req, res) {
    try {
      let { contact, password } = req.body;
      let user = await Db_user.find(
        "",
        { contact, password: sha256(password) },
        { _id: true }
      );

      res.status(200).json({
        token: jwt.SIGN(user[0]._id.toString()),
        message: "user login!",
      });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }
  async register(req, res) {
    try {
      let { password } = req.body;
      req.body.password = sha256(password);
      let user = await Db_user.create(req.body);

      res.status(200).json({
        token: jwt.SIGN(user._id.toString()),
        message: "user added!",
      });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }
}

module.exports = new Auth();
