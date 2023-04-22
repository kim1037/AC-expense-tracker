const express = require("express");
const router = express.Router();
const Record = require("../../models/record");

router.get("/", (req, res) => {
  // const userId = req.user._id
  // 尚未處理icon
  Record.find()
    .lean()
    .then((records) => {
      const finalRecords = records.map((record) => {
        const formatDate = new Date(record.date);
        record.date = formatDate.toISOString().slice(0, 10);
        return record;
      });
      res.render("index", { finalRecords });
    })
    .catch((err) => console.error(err));
});

module.exports = router;
