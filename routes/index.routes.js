const express = require('express');
const multer = require('multer');
const router = express.Router();

const multerConfig = require('../config/multer.config');

const productCtrl = require('../controllers/product.controller');

const upload = multer({ storage: multerConfig.storageConfig, fileFilter: multerConfig.fileFilterConfig });

/* GET home page. */
router.get('/', productCtrl.goHome);
router.get('/upload', productCtrl.getUploadForm);
router.post('/upload', upload.single('myFile'), productCtrl.postUploadForm);

module.exports = router;
