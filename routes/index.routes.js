var express = require('express');
var multer = require('multer');
var router = express.Router();

var multerConfig = require('../config/multer.config');

var productCtrl = require('../controllers/product.controller');

var upload = multer({ storage: multerConfig.storageConfig, fileFilter: multerConfig.fileFilterConfig });

/* GET home page. */
router.get('/', productCtrl.goHome);
router.get('/upload', productCtrl.getUploadForm);
router.post('/upload', upload.single('myFile'), productCtrl.postUploadForm);

module.exports = router;
