const { timeStamp } = require("console");
const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    itemId: { type: String, required: true },
    aboutPlace: { type: String, required: true },
    address: { country: String, city: String, street: String, zipCode: String },
    status: {
      type: String,
      enum: ["pending", "approved", "completed", "canceled", "sold", "closed"],
      default: "pending",
    },
    category: {
      type: String,
      enum: ["luxurious", "studio", "villa", "palace"],
    },
    features: {
      bedRooms: { type: Number, required: true },
      baths: { type: Number, required: true },
      area: { type: Number, required: true },
      kitchen: { type: Number, required: true },
      guests: { type: Number, required: true },
    },
    startBid: { type: Number, required: true },
    images: [String],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }],
    agreeToTerms: { type: Boolean, required: true },
    timeLeft: { type: Date, required: true },
    duration: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Apartment", apartmentSchema);
