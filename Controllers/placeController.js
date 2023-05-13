const bidModel = require("../Models/Bid");
const appartmentModel = require("../Models/Apartment");
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

    return res.json({
      message: "success",
      data: {
        title: appartment.title,
        aboutPlace: appartment.aboutPlace,
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
