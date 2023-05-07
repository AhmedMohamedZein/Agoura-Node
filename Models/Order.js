const mongoose = require('mongoose');

// Order Schema
const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    apartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartment', required: true },
    bid: { type: mongoose.Schema.Types.ObjectId, ref: 'Bid', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});
  

module.exports = mongoose.model('Order', OrderSchema);