const appartments = require("../Models/Apartment");
const users = require("../Models/User");
const bidModel = require("../Models/Bid");
const userModel = require("../Models/User");
const path = require("path");

class DashBoard {
  appartmentsData = async (req, res) => {
    try {
      // const token = req.headers['authorization'] token!=null
      const appartmentsData = await appartments
        .find({})
        .populate("owner", { name: 1 });
      if (appartmentsData) {
        await res.status(200).json(appartmentsData);
      } else {
        await res.status(200).json({ message: "data not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

 async getAllUsers(req, res) {
    try {
      let allUsersData =await users.find({},{ name: 1, email: 1, _id: 1, isVerified:1, bids:1, ownedApartments:1 })      
      return res.status(200).json({
        success: true,
        message: "data retrieved successfully",
        data: allUsersData,
      });  
    } catch (err) {
      return res.json({
        success: false,
        message: "failed to retrieve data",
        error:err
      });
    }
  }
  getCharts = async (req,res,next)=>{
    try {
      // const token = req.headers['authorization'] token!=null
      const twoYearsAgo = new Date();
      twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

      const bids = await bidModel.aggregate([
        {
          $match: {
            date: { $gte: twoYearsAgo } // Filter bids within the last two years
          }
        },
        {
          $group: {
            _id: {
              year: { $year: "$date" },
              month: { $month: "$date" }
            },
            count: { $sum: 1 }, // Count the number of bids
            // totalAmount: { $sum: "$amountMoney" } // Sum the amountMoney
          }
        },
        {
          $group: {
            _id: "$_id.year",
            months: {
              $push: {
                month: "$_id.month",
                count: "$count",
                // totalAmount: "$totalAmount"
              }
            }
          }
        },
        {
          $sort: {
            _id: 1
          }
        },
        {
          $group: {
            _id: null,
            years: {
              $push: {
                year: "$_id",
                months: "$months"
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            years: 1
          }
        }
      ]);
      const users = await userModel.aggregate([
        {
          $match: {
            createdAt: { $gte: twoYearsAgo } // Filter bids within the last two years
          }
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" }
            },
            count: { $sum: 1 }, // Count the number of bids
          }
        },
        {
          $group: {
            _id: "$_id.year",
            months: {
              $push: {
                month: "$_id.month",
                count: "$count",
              }
            }
          }
        },
        {
          $sort: {
            _id: 1
          }
        },
        {
          $group: {
            _id: null,
            years: {
              $push: {
                year: "$_id",
                months: "$months"
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            years: 1
          }
        }
      ]);
      const apartmentsData = await appartments.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 }, // Count the number of bids
          }
        }
      ]);

      if (bids) {
        await res.status(200).json({
          success:true,
          data:{
          bids,users,apartmentsData}
        });
      } else {
        await res.status(200).json({message:"data not found"});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
  async placeDetails(req, res, next) {
    try {
      let itemId = req.params.id;
      let appartment = await appartments
        .findOne({ itemId })
        .populate({
          path: "bids",
          options: { sort: { amountMoney: -1 }, limit: 1 },
        });
      
      if (!appartment) {
        return res.status(404).json({
          success: false,
          message: "resource not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "success",
        data: {
          appartment,
        },
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,

      });
    }
  }
}

module.exports = new DashBoard();
