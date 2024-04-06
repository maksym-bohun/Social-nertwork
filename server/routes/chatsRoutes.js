const express = require("express");
const chatsController = require("../controllers/chatsController");
const messagesController = require("../controllers/messagesController");

const router = express.Router();

router.route("/").post(chatsController.createChat).get(chatsController.getChat);

router.route("/checkChat").post(chatsController.checkChat);
router.route("/:userId").get(chatsController.getUsersChats);
router.route("/addMessage").post(messagesController.addMessage);

module.exports = router;
