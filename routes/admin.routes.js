var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var productCtrl = require('../controllers/product.controller');

/* GET home page. */
router.get('/', productCtrl.getAllProducts);

router.get('/create', productCtrl.productCreateGet);

router.post('/create', urlencodedParser, productCtrl.productCreatePost);

module.exports = router;