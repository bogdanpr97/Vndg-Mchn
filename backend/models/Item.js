const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String 
  },
  description: {
    type: String,
    required: true,
  },
  quantity: Number,
  price: {
    type: Number,
    required: true
  },
  slot: {
    row: Number,
    column: Number,
  }
});

module.exports = mongoose.model('Item', ItemSchema);