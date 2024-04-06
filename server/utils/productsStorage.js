const multer = require("multer");

const postsImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, `${__dirname}/../images/posts`);
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}--${file.originalname.split(" ").join("-")}`);
  },
});

const postsImagesUpload = multer({ storage: postsImageStorage });

module.exports = postsImagesUpload;
