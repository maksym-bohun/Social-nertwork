const multer = require("multer");

const userPhotoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, `${__dirname}/../images/users`);
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}--${file.originalname.split(" ").join("-")}`);
  },
});

const userPhotoUpload = multer({ storage: userPhotoStorage });

module.exports = userPhotoUpload;
