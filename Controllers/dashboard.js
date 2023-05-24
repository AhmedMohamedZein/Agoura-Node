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

  allUsers(req, res) {
    try {
      allUsersData = users.find().exec()
      console.log(this.allUsersData)
      if (allUsers) {
        res.status(200).json({
          success: true,
          message: "data retrieved successfully",
          data: this.allUsersData,
        });
      }
    } catch (err) {
      res.json({
        success: false,
        message: "failed to retrieve data",
      });
    }
  }
}

module.exports = new DashBoard();
