const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema({
  coin: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Price', PriceSchema);