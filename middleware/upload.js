const path = require("path");

class Upload {
  async file(req, res, next) {
    try {
      const { file } = req.files;
      const { username } = req.body;
      const rand = Math.floor(Math.random() * 9000 + 1000);
      let mimetype = file.name.split(".");
      mimetype = mimetype[mimetype.length - 1];
      if (!file) throw new Error("Avatarka not found!");
      let imgpath = path.join(
        "images",
        "users",
        username + rand + "." + mimetype
      );
      file.mv(path.join(process.cwd(), "public", imgpath));
      req.body.imageLink = imgpath;
      return next();
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
}

module.exports = new Upload();
