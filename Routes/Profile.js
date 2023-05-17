const express = require('express')
const router = express.Router()
const path = require('path')
const ProfileController = require(path.join(__dirname , '../Controllers/Profile'))

const multer=require("multer")
const upload = multer();

const isUser = require(path.join(__dirname , '../Middlewares/isUser'))


router.get('/:id' , ProfileController.getUserProfile)
router.put('/:id' , upload.single('profileImage') , ProfileController.updateUserProfile)
router.get('/:id/bids' , isUser ,ProfileController.getUserBids)
router.get('/:id/orders' , isUser ,ProfileController.getUserOrders)


module.exports = router