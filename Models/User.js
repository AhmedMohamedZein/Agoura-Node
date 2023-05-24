const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String, required: false },
    phone: { type: String, required: false },
    image: { type: String },
    isAdmin: { type: Boolean, requried: true },
    ownedApartments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Apartment" },
    ],
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    notifications: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Notification" },
    ],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Apartment" }],
    isVerified: {type: Boolean, default: false}
  },
  { timestamps: true }
);

//Pre Save Hook. Used to hash the password
userSchema.pre("save", function (next) {
  // if the password not modified the function not work
  if (!this.isModified("password")) {
    return next();
  }
  //Generate Salt Value
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    //Use this salt value to hash password
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(erro);
      }
      this.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", userSchema);
