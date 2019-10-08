var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  title:        {type: String, maxlength: 50, required: true},
  category:     {type: String, maxlength: 50, required: true},
  description:  {type: String, required: true},
  status:       {type: String, required: true, enum: ['Есть на складе', 'Под заказ'], default: 'Под заказ'},
  images:       [Array],
  price:        {type: Number, required: true}
});

ProductSchema
  .virtual('url')
  .get(function () {
    return '/catalog/' + this._id;
});

module.exports = mongoose.model('Products', ProductSchema);