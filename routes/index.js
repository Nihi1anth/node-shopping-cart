var express = require('express');
var router = express.Router();
var Product = require('../models/products');


/* GET home page. */
router.get('/', function(req, res, next) {
  var products = Product.find((error, doc) => {
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < doc.length; i += chunkSize) {
      productChunks.push(doc.slice(i, i + chunkSize));
    }
    res.render('shop/index', { title: 'Светодиодное освещение', products: productChunks });
  });
});

module.exports = router;
