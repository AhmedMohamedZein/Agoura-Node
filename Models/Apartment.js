const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    itemId:{type: Number , required: true},
    description: { type: String },
    address : { counrty : String , city : String , street : String , zipCode : String },
    features : { 
        bedRooms : { type : Number , required : true }, 
        baths: { type : Number , required : true },
        area :  { type : Number , required : true },
        kitchen : { type : Number , required : true },
        guests : { type : Number , required : true }
    },
    price: { type: Number, required: true },
    images: [String],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }],
    agreeToTerms: { type : Boolean , required : true }
});
  

module.exports = mongoose.model('Apartment', apartmentSchema);