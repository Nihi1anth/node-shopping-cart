const multer = require("multer");
const path = require("path");

let multerConfig = {
  fileFilterConfig: function (req, file, cb) {
    if (file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg") {
      cb(null, true);
    }
    else {
      cb(null, false);
    }
  },
  storageConfig: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
}

module.exports = multerConfig;