const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  totalMoney: Number
});

module.exports = mongoose.model('user', UserShema);