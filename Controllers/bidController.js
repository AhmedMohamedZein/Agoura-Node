const bidModel = require("../Models/Bid");
const appartmentModel = require("../Models/Apartment");
const { error } = require("console");


class PlaceController {
  
  async add(req, res, next) {
    try{
      console.log(req.body)
      let apartmentID = req.body.apartmentID;
      let amountMoney = req.body.amountMoney;
      let user = req.user;

     
      let appartment = await appartmentModel
        .findOne({ _id:apartmentID })
        .populate({ path: "bids", options: { sort: { amountMoney: -1 },limit:1 } })

      if(!appartment){
        return res.status(404).json({
          success:false,
          message: "appartment not found",
        });
      }
      
      console.log(appartment)
      console.log(user)
      let highestBid;
      if(appartment.bids.length > 0){
        highestBid=appartment.bids[0].amountMoney
      }else{
        highestBid=appartment.startBid
      }
      if(highestBid>amountMoney){
        return res.status(400).json({
          success:false,
          message: "your bid must be greater than the highest bid",
        });
      }
      let newBid=await bidModel.create({
        amountMoney:amountMoney,
        date:Date.now(),
        duration:appartment.duration,
        user:user._id
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
