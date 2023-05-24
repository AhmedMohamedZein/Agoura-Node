const appartments = require("../Models/Apartment");
const users = require("../Models/User");
const path = require("path");

class DashBoard {
  appartmentsData = async (req, res) => {
    console.log("test");

    try {
      // const token = req.headers['authorization'] token!=null
      const appartmentsData = await appartments
        .find({})
        .populate("owner", { name: 1 });
      console.log(appartments);

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
}

module.exports = new DashBoard();
