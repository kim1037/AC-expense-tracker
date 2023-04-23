const express = require("express");
const router = express.Router();
const home = require("./modules/home");
const expense = require("./modules/expense");
const users = require("./modules/users");
const { authenticator } = require("../middleware/auth");

router.use("/expense", authenticator, expense);
router.use("/users", users);
router.use("/", authenticator, home);

module.exports = router;
