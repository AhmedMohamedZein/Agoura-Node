const { syncBuiltinESMExports } = require("module");
const path = require("path");
const user = require(path.join(__dirname, "../Models/User"));
const apartment = require(path.join(__dirname, "../Models/Apartment"));
const cart = require(path.join(__dirname, "../Models/Cart"));
const notification = require(path.join(__dirname, "../Models/Notification"));
const auth = require(path.join(__dirname, "../Controllers/Auth/Token"));

class HomeController {
  async getData(req, res) {
    try {
      const token = req.headers["authorization"];
      const apartments = await apartment.find({status:"approved"});
      if (token != "null") {
        const userInfo = auth.verifyToken(token);
        const userData = await user.findOne({ email: userInfo.email });
        const notifications = await notification.find({
          user: userData._id,
          deleted: false,
        });
        const carts = await cart
          .find({ user: userData._id })
          .populate("apartments");
        const homeData = { carts, notifications, apartments, userData };
        await res.status(200).json(homeData);
      } else {
        const homeData = {
          apartments,
          carts: [],
          notifications: [],
          userData: null,
        };
        await res.status(200).json(homeData);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  async deleteNotification(req, res) {
    try {
      const token = req.headers["authorization"];
      if (token != "null") {
        const notificationId = req.params.id;
        let notifications = await notification.updateOne(
          { _id: notificationId },
          { deleted: true },
          { new: true }
        );
        const userInfo = auth.verifyToken(token);
        const userData = await user.findOne({ email: userInfo.email });
        notifications = await notification.find({
          user: userData._id,
          deleted: false,
        });
        await res.status(200).json(notifications);
      } else {
        await res.status(401).json({ message: "not authorized" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  async deleteItemFromCart(req, res) {
    try {
      const token = req.headers["authorization"];
      if (token != "null") {
        const userInfo = auth.verifyToken(token);
        const userData = await user.findOne({ email: userInfo.email });
        const itemId = req.params.id;
        const item = await cart.findOneAndDeleteByItem(userData._id, itemId);
        await res.status(200).json(item);
      } else {
        await res.status(401).json({ message: "not authorized" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  async addToCart(req, res) {
    try {
      const token = req.headers["authorization"];
      if (token != "null") {
        const userInfo = auth.verifyToken(token);
        const userData = await user.findOne({ email: userInfo.email });
        const itemId = req.body.id;
        const carts = await cart.findOneAndUpdateByItem(userData._id, itemId);
        await res.status(200).json(carts);
      } else {
        await res.status(401).json({ message: "not authorized" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  async filterByCategory(req, res) {
    let category = req.params.category;
    console.log(req.params.category);
    try {
      const apartments = await apartment.find({ category: category });
      return res.json({
        success: true,
        message: "appartements retreived successfully",
        data: apartments,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "there is an error",
      });
    }
  }
}

module.exports = new HomeController();
