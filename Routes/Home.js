const express = require('express')
const router = express.Router()
const path = require('path')
const {getData , deleteNotification , deleteItemFromCart , addToCart } = require(path.join(__dirname , '../Controllers/Home'))


router.get('/' , getData )
router.delete('/notifications/:id' , deleteNotification )
router.delete('/cart/:id' , deleteItemFromCart )
router.post('/cart' , addToCart )




module.exports = router