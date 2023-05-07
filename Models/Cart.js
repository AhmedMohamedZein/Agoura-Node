const mongoose = require('mongoose');

// Cart Schema
const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    apartments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Apartment', required: true }]
});
  
module.exports = mongoose.model('Notification', CartSchema);