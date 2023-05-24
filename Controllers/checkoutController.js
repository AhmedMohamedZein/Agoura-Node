const bidModel = require("../Models/Bid");
const appartmentModel = require("../Models/Apartment");
const notificationModel = require("../Models/Notification");
const userModel = require("../Models/User");
const updatePlaceValidation = require('../Utils/createPlaceValidation');




class checkoutController {

  orderDetails = async (req, res) => {
    try {
      let id = req.params.id
      console.log("hamada")

      let apartment = await appartmentModel.findOne({ itemId: id, status: "completed" })
        .populate({ path: "bids", match: { expired: false }, options: { sort: { amountMoney: -1 }, limit: 1 } })
      console.log(apartment)
      return res.status(200).json({
        success: true,
        message: "order data",
        data: apartment
      })

    } catch (err) {
      console.log(err)
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
  checkout = async (req, res) => {
    try {
      let id = req.params.id
      let apartment = await appartmentModel.findOne({ itemId: id, status: "completed" })
        .populate({ path: "bids", match: { expired: false }, options: { sort: { amountMoney: -1 }, limit: 1 } })
      let amountMoney = Math.round(apartment.bids[0].amountMoney*1.14)
      const stripe = require('stripe')(process.env.STRIPE_SECRET);
      let product=await stripe.products.create({
        name: apartment.title,
        description: apartment.title,
        images:apartment.images

      })
      .then(product => {
        return stripe.prices.create({
          product: product.id,
          unit_amount: amountMoney, // Provide the price in the smallest currency unit (e.g., cents)
          currency: 'usd' // Set the currency (e.g., 'usd' for US dollars)
        })
        .catch(error => {
          console.error('Error creating price:', error);
        });
      })
      .catch(error => {
        console.error('Error creating product:', error);
      });
      

      console.log(product)
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: product.id,
            quantity: 1
          },
        ],
        mode: 'payment',
        success_url: `http://localhost:4200/home`,
        cancel_url: `http://localhost:4200/404-notfound`,
      });
  
      return res.status(201).json({
        success: true,
        message: "payment finished successfully.",
        url:session.url
      });
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }


  }


}

module.exports = new checkoutController();
