const multer = require("multer");

const productsStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, `${__dirname}/../images/products`);
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}--${file.originalname.split(" ").join("-")}`);
  },
});

const productsImagesUpload = multer({ storage: productsStorage });

module.exports = productsImagesUpload;
