const express = require("express");
const router = express.Router();
const placeConroller = require("../Controllers/placeController");
const multer = require("multer");
const setupRequest = require("../Middlewares/createPlaceMiddleware/setupRequest");
const uploadImage = require("../Middlewares/createPlaceMiddleware/uploadImage");
const upload = multer();

router.get("/:id/history", placeConroller.history);
router.post(
  "/create",
  upload.array("photo"),
  setupRequest,
  uploadImage,
  placeConroller.create
);

router.get("/:id", placeConroller.placeDetails);

module.exports = router;
