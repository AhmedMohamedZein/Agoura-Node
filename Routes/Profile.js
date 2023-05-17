const express = require('express')
const router = express.Router()
const path = require('path')
const ProfileController = require(path.join(__dirname , '../Controllers/Profile'))
const setupRequest = require(path.join(__dirname , '../Middlewares/createPlaceMiddleware/setupRequest'));
const uploadImage = require(path.join(__dirname , '../Middlewares/createPlaceMiddleware/uploadImage'));
const multer=require("multer");
const upload = multer();

router.get('/:id' , ProfileController.getUserProfile)
router.put('/:id' , upload.array('profileImage'),setupRequest,uploadImage,ProfileController.updateUserProfile)

module.exports = router