const bidModel = require("../Models/Bid");
const appartmentModel = require("../Models/Apartment");
const notificationModel = require("../Models/Notification");
const userModel = require("../Models/User");
const orderModel = require("../Models/Order");
const updatePlaceValidation = require('../Utils/createPlaceValidation');
const PORT = process.env.PORT || 9000;
const websiteUrl=process.env.WEBSITE_URL

class checkoutController {

  orderDetails = async (req, res) => {
    try {
      let id = req.params.id
      console.log("hamada")

      let apartment = await appartmentModel.findOne({ itemId: id, status: "completed" })
        .populate({ path: "bids", match: { expired: false }, options: { sort: { amountMoney: -1 }, limit: 1 } })
      console.log(apartment)
      if(!apartment){
        return res.status(404).json({
          success: false,
          message: "page not found.",

        })
      }
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
      let id = req.body.itemId
      let apartment = await appartmentModel.findOne({ itemId: id, status: "completed" })
        .populate({ path: "bids", match: { expired: false }, options: { sort: { amountMoney: -1 }, limit: 1 } })

      if(req.user._id.toString()!=apartment.bids[0].user.toString()){
        return res.status(403).json({
          success:false,
          message:"you are not authorized to complete this purchase."
        })
      }
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
        success_url: `${websiteUrl}/checkout/success/${apartment._id}`,
        cancel_url: `${websiteUrl}/checkout/fail/${apartment._id}`,
      });

      return res.status(201).json({
        success: true,
        message: "payment Faild please try again.",
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
  success= async(req, res) => {
    console.log("success")
    try {
      // Retrieve the event data from the request body
      let id = req.params.id
      let apartment = await appartmentModel.findOne({ _id: id, status: "completed" })
        .populate({ path: "bids", match: { expired: false }, options: { sort: { amountMoney: -1 }, limit: 1 } })
      apartment.status="sold"
      apartment.save()
      let order=await orderModel.create({
        user:apartment.bids[0].user,
        apartment:apartment._id,
        amount:apartment.bids[0].amountMoney*1.14,
        bid:apartment.bids[0]._id,
        date:Date.now()
      })
      await userModel.findByIdAndUpdate({_id:apartment.bids[0].user},
          {$push: { orders: order._id }}
      )
      let notification = await notificationModel.create({
        user: apartment.owner,
        message: `congratulations your apartment is sold.`,
        href: `/bids/${apartment.itemId}/history` // ToDo needs to be updated
    })
    await userModel.findByIdAndUpdate(
      { _id: apartment.owner },
      { $push: { notifications: notification._id } }
    );
      // return  res.redirect("https://agora-4.web.app/PaymentSuccess")
      return  res.redirect(`${websiteUrl}/PaymentSuccess`)

    }catch(err){
      // Return a 200 response to acknowledge receipt of the event
      console.log(err)
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  
  }
  fail= async(req, res) => {
    console.log("fail")
    // return res.redirect("https://agora-4.web.app/PaymentFail")
    return res.redirect(`${websiteUrl}/PaymentFail`)
  }


}

module.exports = new checkoutController();
