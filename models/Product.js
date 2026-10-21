const crypto = require('crypto');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  pid: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  pname: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);