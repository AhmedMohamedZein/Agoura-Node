const mongoose = require('mongoose');

// Notification Schema
const NotificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now() },
    deleted: { type: Boolean, default: false },
    href:{type: String , required: true}
});
  
module.exports = mongoose.model('Notification', NotificationSchema);