const JWT = require("jsonwebtoken");

module.exports = {
  SIGN: (payload) => {
    return JWT.sign({ payload }, process.env.SECRET, {
      expiresIn: process.env.LIMIT,
    });
  },
  VERIFY: (token) => {
    try {
      if (JWT.verify(token, process.env.SECRET) instanceof Error) return 0;
      else return JWT.verify(token, process.env.SECRET);
    } catch (error) {
      return 0;
    }
  },
};
