const express = require("express");
const router = express.Router();
const bidController = require("../Controllers/bidController");
const isUser = require("../Middlewares/isUser");
const isAdmin = require("../Middlewares/isAdmin");

router.post("/", isUser, bidController.add);
router.put("/:id/update", isUser, bidController.update);
router.post("/:id/notes", isAdmin, bidController.notes);
router.post("/:id/approve", isAdmin, bidController.approve);

module.exports = router;
