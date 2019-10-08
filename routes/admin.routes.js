var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var productCtrl = require('../controllers/product.controller');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('admin/index');
});

router.get('/create', productCtrl.productCreateGet);

router.post('/create', urlencodedParser, productCtrl.productCreatePost);

module.exports = router;