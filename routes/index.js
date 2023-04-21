const express = require("express");
const router = express.Router();
const home = require("./modules/home");
const expense = require("./modules/expense");
const users = require("./modules/users");

router.use("/expense", expense);
router.use("/users", users);
router.use("/", home);

module.exports = router;
