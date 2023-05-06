const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone:{ type: String, required: false }, 
    ownedApartments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Apartment' }],
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Apartment' }],
    about : { type: String, required: false }
}, { timestamps: true } );
  

module.exports = mongoose.model('User', userSchema);