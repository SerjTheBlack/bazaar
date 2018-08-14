const mongoose = require('mongoose');

module.exports = mongoose.model('Stuff', {
  name: String,
  price: Number
});