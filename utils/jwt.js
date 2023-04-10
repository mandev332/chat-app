const JWT = require("jsonwebtoken");
const config = require("config");

module.exports = {
  SIGN: (payload) => {
    return JWT.sign({ payload }, config.get("secret"), {
      expiresIn: config.get("limit"),
    });
  },
  VERIFY: (token) => {
    try {
      if (JWT.verify(token, config.get("secret")) instanceof Error) return 0;
      else return JWT.verify(token, config.get("secret"));
    } catch (error) {
      return 0;
    }
  },
};
