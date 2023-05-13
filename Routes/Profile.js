const express = require('express')
const router = express.Router()
const path = require('path')
const ProfileController = require(path.join(__dirname , '../Controllers/Profile'))


router.get('/:id' , ProfileController.getUserProfile)
router.put('/:id' , ProfileController.updateUserProfile)


module.exports = router