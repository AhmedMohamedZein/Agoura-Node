const express = require("express");
const router = express.Router();
const path = require("path");
const dashboard = require(path.join(__dirname, "../Controllers/dashboard"));
// const HomeController = require(path.join(__dirname , '../Controllers/Home'))
const isAdmin = require("../Middlewares/isAdmin");

router.get("/", isAdmin, dashboard.appartmentsData);

module.exports = router;
