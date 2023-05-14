const express = require('express')
const router = express.Router()
const path = require('path')
const ProfileController = require(path.join(__dirname , '../Controllers/Profile'))

const multer=require("multer")
const upload = multer();


router.get('/:id' , ProfileController.getUserProfile)
router.put('/:id' , upload.single('profileImage') , ProfileController.updateUserProfile)


module.exports = router