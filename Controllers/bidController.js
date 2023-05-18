const bidModel = require("../Models/Bid");
const appartmentModel = require("../Models/Apartment");
const notificationModel= require("../Models/Notification");
const userModel = require("../Models/User");
const updatePlaceValidation = require('../Utils/createPlaceValidation');




class bidController {
  
  async add(req, res) {
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
          message: "appartment not found.",
        });
      }
      if(appartment.status!="approved"){
        return res.status(403).json({
          success:false,
          message: "sorry,you cannont bid on appartment.",
        });
      }
      if(appartment.owner.toString()==user._id.toString()){
        return res.status(403).json({
          success:false,
          message: "you cannont bid on your appartments.",
        });
      }
      
      let highestBid;
      if(appartment.bids.length > 0){
        highestBid=appartment.bids[0].amountMoney
      }else{
        highestBid=appartment.startBid
      }
      if(highestBid>amountMoney){
        return res.status(400).json({
          success:false,
          message: "your bid must be greater than the highest bid.",
        });
      }
      let newBid=new bidModel({
        amountMoney:amountMoney,
        date:Date.now(),
        duration:appartment.duration,
        apartment:appartment._id,
        user:user._id
      })
      await newBid.save();
      await userModel.updateOne({_id:user._id},{$push: { bids: newBid._id }})
      await appartmentModel.updateOne({_id:apartmentID},{$push: { bids: newBid._id }})
      //create notification for the appartment owner
      let notification=await notificationModel.create({
        user:appartment.owner,
        message:"someone bid on your appartment go check it out.",
        href:`/place/${appartment.itemId}/history`
      })
      await userModel.findByIdAndUpdate({_id:appartment.owner},{$push: { notifications: notification._id }})
      
      console.log("===========================================")
      //find unique bidders for the appartment
      let uniqueBidUsers=await bidModel.find({apartment:apartmentID}).distinct("user")
      //send notification for all bidders
      uniqueBidUsers.forEach(async(bidder)=>{
      console.log(uniqueBidUsers)
      //exclude the current bidder from notification
        if(user._id.toString()!=bidder._id.toString()){
          let bidderNotification=await notificationModel.create({
            user:bidder._id,
            message:`someone just raised the bid price ${appartment.title} don't let him beat you.`,
            href:`/place/${appartment.itemId}`
          })
          await userModel.findByIdAndUpdate({_id:bidder._id},{$push: { notifications: bidderNotification._id }})
        }
      })
      appartment = await appartmentModel
      .findOne({_id:apartmentID})
      .populate({ path: "bids", options: { sort: { amountMoney: -1 },limit:1 } })

      return res.status(201).json({
        success: true,
        message: "bid placed successfully.",
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
  async update(req, res) {
    try{
      let apartmentID = req.params.id;
      let user = req.user;
      let appartment = await appartmentModel
      .findOne({ _id:apartmentID })
      
      if(!appartment){
        return res.status(404).json({
          success:false,
          message: "appartment not found.",
        });
      }

      if(appartment.owner!=user._id && !user.isAdmin){
        return res.status(401).json({
          success:false,
          message: "you are no authorizied to update this place.",
        });
      }
      if(appartment.status!="pending"){
        return res.status(401).json({
          success:false,
          message: "appartment cannot be edited.",
        });
      }
      const isValid = updatePlaceValidation(req.body);
      if ( !isValid ){
        const errors = updatePlaceValidation.errors;
        return res.status(400).json({
          success : false ,
          message : errors
        });
      }
      appartment = await appartmentModel
      .findOneAndUpdate({ _id:apartmentID },req.body)
      console.log(req.body)
      return res.status(201).json({
        success: true,
        message: "place update successfully.",
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
  async approve(req, res, next) {
    try{
      let apartmentID = req.body._id;
      
      let appartment = await appartmentModel
        .findOneAndUpdate({ _id:apartmentID },{status:"approved"},{new:true})

      if(!appartment){
        return res.status(404).json({
          success:false,
          message: "appartment not found.",
        });
      }
      let notification=await notificationModel.create({
        user:appartment.owner,
        message:"congratulations your bid is approved.",
        href:`/place/${appartment.itemId}`
      })
      await userModel.findByIdAndUpdate({_id:appartment.owner},{$push: { notifications: notification._id }})

      return res.status(201).json({
        success: true,
        message: "bid approved successfully.",
        data:{
          appartment
        }
      });
    }catch(err){
      console.log(err)
      return res.json({
        success:false,
        message: err.message,
      });
    }
    
      
  }
  async notes(req, res, next) {
    try{
      let apartmentID = req.params.id;
      let appartment = await appartmentModel
        .findOne({ _id:apartmentID })
      if(!appartment){
        return res.status(404).json({
          success:false,
          message: "appartment not found.",
        });
      }
      let notification=await notificationModel.create({
        user:appartment.owner,
        message:req.body.notes,
        href:`/place/${appartment.itemId}/edit`
      })
      await userModel.findByIdAndUpdate({_id:appartment.owner},{$push: { notifications: notification._id }})
      return res.status(201).json({
        success: true,
        message: "notes sent to user successfully.",
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

module.exports = new bidController();
