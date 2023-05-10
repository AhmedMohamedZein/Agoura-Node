const mongoose = require('mongoose');

// Cart Schema
const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    apartments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Apartment', required: true }]
});

CartSchema.statics.findOneAndDeleteByItem = function(userID , itemID){
    return this.findOneAndUpdate(
        { user: userID },
        { $pull: { apartments: itemID } },
        {new: true}
      ).populate('apartments')
}
CartSchema.statics.findOneAndUpdateByItem = function(userID , itemID){
    return this.findOneAndUpdate(
        { user: userID._id }, 
        { $addToSet: { apartments: itemID } },
        { upsert: true, new: true }
      ).populate('apartments')
}

  
module.exports = mongoose.model('Cart', CartSchema);