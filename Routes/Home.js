const express = require('express')
const router = express.Router()
const path = require('path')
const HomeController = require(path.join(__dirname , '../Controllers/Home'))


router.get('/' , HomeController )



module.exports = router