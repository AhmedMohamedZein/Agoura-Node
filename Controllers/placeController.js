const bidModel = require("../Models/Bid");
const appartmentModel = require("../Models/Apartment");

class PlaceController {
  async history(req, res, next) {
    let itemId = req.params.id;

    let appartment = await appartmentModel.findOne({ itemId }).populate({
      path: "bids",
      options: { sort: { date: -1 }, select: { _id: 1, date: 1 } },
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
        currentBid: currentBid.bids[0].amountMoney,
        numberOfBids: appartment.bids.length,
        numberOfBidders: numberOfBidders.length,
        timeLeft: "3 hours 17 mins 12 secs",
        duration: "7 days",
        historyOfBids: appartment.bids,
      },
    });
  }
}

module.exports = new PlaceController();
