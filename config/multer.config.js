const multer = require("multer");
const path = require("path");

let multerConfig = {
  fileFilterConfig: function (req, file, cb) {
    if(file.mimetype === "image/png" || 
    file.mimetype === "image/jpg"|| 
    file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
    // const filetypes = /jpeg|jpg|png|gif/;
    // const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // const mimitype = filetypes.test(file.mimitype);

    // if (mimitype && extname) {
    //   return callback(null, true);
    // } else {
    //   callback("Error: Images only!");
    // }
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