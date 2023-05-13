const express = require("express");
const router = express.Router();
const multer=require("multer");
const placeConroller = require("../Controllers/placeController");
const setupRequest = require('../Middlewares/createPlace/setupRequest');
const uploadImage = require('../Middlewares/createPlace/uploadImage');
const upload = multer();



router.get("/:id/history", placeConroller.history);
router.post('/create' , upload.array('photo') , setupRequest, uploadImage , placeConroller.create );


module.exports = router;
