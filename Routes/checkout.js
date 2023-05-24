const express = require("express");
const router = express.Router();
const path = require('path');
const payment= require(path.join(__dirname , '../Controllers/checkoutController'))

router.post("/",payment.createPaymentObject);


module.exports = router;
