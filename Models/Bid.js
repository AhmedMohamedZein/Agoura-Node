const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    amountMoney: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    apartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartment' },
    date: { type: Date, required: true },
    duration: { type: Number, required: true }
});
  

module.exports = mongoose.model('Bid', bidSchema);