
const appartmentModel = require("../Models/Apartment");
const createPlaceValidation = require('../Utils/createPlaceValidation');
const { v4: uuidv4 } = require('uuid');
const Token = require('./Auth/Token');
const User = require('../Models/User');
const { error } = require("console");


class PlaceController {
  async history(req, res, next) {
    let itemId = req.params.id;

    let appartment = await appartmentModel.findOne({ itemId }).populate({
      path: "bids",
      options: {
        sort: { date: -1 },
        select: { _id: 1, date: 1, amountMoney: 1 },
      },
      populate: {
        path: "user",
        options: { select: "_id" },
      },
    });
    let currentBid = await appartmentModel
      .findOne({ itemId })
      .populate({ path: "bids", options: { sort: { amountMoney: -1 } } })
      .limit(1);

    let numberOfBidders = [
      ...new Set(currentBid.bids.map((item) => item.user.toString())),
    ];
    if(currentBid.bids.length >0){
      currentBid=currentBid.bids[0].amountMoney
    }else{
      currentBid=appartment.startBid
    }
    return res.json({
      message: "success",
      data: {
        title: appartment.title,
        aboutPlace: appartment.aboutPlace,
        image: appartment.images[0],
        itemNumber: appartment.itemId,
        currentBid: currentBid,
        numberOfBids: appartment.bids.length,
        numberOfBidders: numberOfBidders.length,
        timeLeft: appartment.timeLeft,
        duration: appartment.duration,
        historyOfBids: appartment.bids,
      },
    });
  }


  async create(req, res) {
    
    // Images in req.body.images
    // ALL THE OTHER Data in req.body.<Everything>

    const isValid = createPlaceValidation(req.body);
    if ( !isValid ){
      const errors = createPlaceValidation.errors;
      res.status(400).json({
        success : false ,
        message : errors
      });
    }
    const token = req.headers.authorization
    const user = Token.verifyToken(token);
    if ( !token && !user ){ // token is not empty and valid
      res.status(401).json({
        success : false ,
        message : "Unauthorized"
      });
    }
    
    const apartmentOwner = await User.findOne({ email: user.email });
    const uniqueId = uuidv4(); // for the itemId attribute
    const newApartment = new appartmentModel({
      title: req.body.title,
      itemId: uniqueId,
      aboutPlace: req.body.aboutPlace,
      address: {
        country: req.body.address.country,
        city: req.body.address.city,
        street: req.body.address.street,
        zipCode: req.body.address.zipCode,
      },
      features: {
        bedRooms: parseInt(req.body.features.bedRooms),
        baths: parseInt(req.body.features.baths),
        area: parseInt(req.body.features.area),
        kitchen: parseInt(req.body.features.kitchen),
        guests: parseInt(req.body.features.guests),
      },
      startBid: Number(req.body.startBid),
      images: req.body.images,
      duration: req.body.duration,
      owner: apartmentOwner._id,
      timeLeft:Date.now()+req.body.duration*1000*3600*24,
      bids: [],
      agreeToTerms: req.body.agreeToTerms,
    });

    try {
      apartmentOwner.ownedApartments.push(newApartment._id);
      await newApartment.save();
      res.status(201).json({
        success: true,
        message: "Apartment created successfully",
        itemId:uniqueId
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server error"
      })
    }
  }
  async placeDetails(req, res, next) {
    try{
      let itemId = req.params.id;
      let appartment = await appartmentModel
      .findOne({ itemId })
      .populate({ path: "bids", options: { sort: { amountMoney: -1 },limit:1 } })
      console.log(appartment)
      if(!appartment){
        return res.status(404).json({
          success:false,
          message: "resource not found",
        });
      }
      return res.status(200).json({
        success:true,
        message: "success",
        data: {
          appartment
        },
      });
    }catch(err){
      return res.status(500).json({
        success:false,
        message: err.message,

      });
    }

  }
}

module.exports = new PlaceController();
