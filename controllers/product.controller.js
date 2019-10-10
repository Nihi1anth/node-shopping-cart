var Products = require('../models/product.model');

exports.goHome = function (req, res) {
  Products.find(function (error, products) {
    if (error) res.render(error);
    res.render('index', {title: 'Добро пожаловать', products: products});
  });
}

exports.getAllProducts = function (req, res) {
  Products.find(function (error, products) {
    if (error) res.render(error);
    res.render('admin/index', {title: 'Все товары', products: products});
  });
};

exports.productDetailAdmin = function (req, res) {
  Products.findById(req.params.id, function(error, product) {
    if (error) res.render(error);
    res.render('admin/prodDetailsAdmin', {title: product.title, product: product});
  });
};

//показать форму добавления товара
exports.productCreateGet = function (req, res) {
  res.render('admin/createForm', {title: 'Добавить товар'});
};

//добавить товар по запросу POST
exports.productCreatePost = function (req, res) {
  var form = req.body;

  new Products({
    title: form.title,
    category: form.category,
    description: form.description,
    status: form.status,
    images: form.images.split(','),
    price: form.price
  }).save().then(function(doc) {
    console.log('Сохранен объект: ', doc);
  }).catch(function(error) {
    console.log(error);
  });
  
  res.redirect('/admin');
};

// Показать форму удаления товара по запросу GET.
exports.productDeleteGet = function(req, res) {
  res.send('NOT IMPLEMENTED: Product: ' + req.params.id + ' delete GET');
};

// Удалить товар по запросу DELETE.
exports.productDelete = function(req, res) {
  // res.send('NOT IMPLEMENTED: Product: ' + req.params.id + ' delete POST');
  Products.findByIdAndDelete(req.params.id, function(error, product) {
    console.log('Документ->'+ product.title + '<-был удален');
  });
  res.redirect('/admin');
};

// Показать форму обновления товара по запросу GET.
exports.productUpdateGet = function(req, res) {
  // res.send('NOT IMPLEMENTED: Product ' + req.params.id + ' update GET');
  Products.findById(req.params.id, function(error, product) {
    if (error) res.send(error);
    res.render('/:id/update', {title: 'Редактирование товара ' + product.title, product: product});
  });
};

// Обновить автора по запросу POST.
exports.productUpdatePut = function(req, res) {
  res.send('NOT IMPLEMENTED: Product ' + req.params.id + ' update PUT');
};