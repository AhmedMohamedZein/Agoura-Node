const express = require('express')
const router = express.Router()
const path = require('path')
const {getData , deleteNotification} = require(path.join(__dirname , '../Controllers/Home'))


router.get('/' , getData )
router.delete('/notifications/:id' , deleteNotification )




module.exports = router