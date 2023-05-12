const bidModel = require("../Models/Bid");
const appartmentModel = require("../Models/Apartment");
const { error } = require("console");
const Token=require("./Auth/Token")

class PlaceController {
  
  async add(req, res, next) {
    try{
      let apartmentID = req.body.apartmentID;
      let amountMoney = req.body.amountMoney;
      let userToken = req.body.userToken;

      if(!userToken){
        return res.status(403).json({
          success:false,
          message: "login first before placing a bid",
        });
      }

      let appartment = await appartmentModel
        .findOne({ _id:apartmentID })
        .populate({ path: "bids", options: { sort: { amountMoney: -1 },limit:1 } })

      if(!appartment){
        return res.status(404).json({
          success:false,
          message: "appartment not found",
        });
      }
      
      let user=Token.verifyToken(userToken)
      if(!user){
        return res.status(403).json({
          success:false,
          message: "login first before placing a bid",
        });
      }
      console.log(user)
      if(!appartment.bids[0].amountMoney<amountMoney){
        return res.status(400).json({
          success:false,
          message: "your bid must be greater than the highest bid",
        });
      }
      let newBid=await bidModel.create({
        amountMoney:amountMoney,
        appartment,
        date:Date.now(),
        duration:appartment.duration,
        user:user.userId
      })
      await appartmentModel.updateOne({_id:apartmentID},{$push: { bids: newBid._id }})
      appartment = await appartmentModel
      .findOne({_id:apartmentID})
      .populate({ path: "bids", options: { sort: { amountMoney: -1 },limit:1 } })
      return res.status(201).json({
        success: true,
        message: "bid placed successfully",
        data: {
          appartment
        },
      });
    }catch(err){
      console.log(err)
      return res.json({
        success:false,
        message: err.message,
      });
    }
    
      
  }
}

module.exports = new PlaceController();
