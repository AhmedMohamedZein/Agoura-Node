const express = require('express')
const router = express.Router()
const path = require('path')
const {getData , deleteNotification , deleteItemFromCart} = require(path.join(__dirname , '../Controllers/Home'))


router.get('/' , getData )
router.delete('/notifications/:id' , deleteNotification )
router.delete('/cart/:id' , deleteItemFromCart )




module.exports = router