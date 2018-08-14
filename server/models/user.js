const mongoose = require('mongoose');

module.exports = mongoose.model('User',{
  username: String,
  password: String,
  fio: String,
  cash: Number,
  inventory: []
});