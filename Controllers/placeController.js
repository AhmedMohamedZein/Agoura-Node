const appartmentModel = require("../Models/Apartment");
const createPlaceValidation = require('../Utils/createPlaceValidation');
const { v4: uuidv4 } = require('uuid');
const Token = require('./Auth/Token');

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

    return res.json({
      message: "success",
      data: {
        title: appartment.title,
        description: appartment.description,
        image: appartment.images[0],
        itemNumber: appartment.itemId,
        currentBid: currentBid.bids[0].amountMoney,
        numberOfBids: appartment.bids.length,
        numberOfBidders: numberOfBidders.length,
        timeLeft: "3 hours 17 mins 12 secs",
        duration: "7 days",
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

    const uniqueId = uuidv4(); // for the itemId attribute
    const token = req.headers.authorization

    if ( !token ){
      res.status(401).json({
        success : false ,
        message : "Unauthorized"
      });
    }

    const user = Token.verifyToken();
    
    const newApartment = new appartmentModel({
      title: req.title,
      itemId: uniqueId,
      description: req.description,
      address: {
        country: req.address.country,
        city: req.address.city,
        street: req.address.street,
        zipCode: req.address.zipCode,
      },
      features: {
        bedRooms: int(req.address.bedRooms),
        baths: int(req.address.baths),
        area: int(req.address.area),
        kitchen: int(req.address.kitchen),
        guests: int(req.address.guests),
      },
      price: int(req.price),
      images: req.images,
      owner: "User ID",
      bids: [],
      agreeToTerms: req.agreeToTerms,
    });

    res.end();
  }
}

module.exports = new PlaceController();
