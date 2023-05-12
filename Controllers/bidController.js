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

      console.log("bid update")
      let appartment = await appartmentModel
        .findOne({ _id:apartmentID })

      if(!appartment){
        res.status(404)
        throw new Error("appartment not found")
      }
      let user=Token.verifyToken(userToken)
      console.log(user)
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
      return res.status(200).json({
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
