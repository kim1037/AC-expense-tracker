const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");

router.get("/", (req, res) => {
  // const userId = req.user._id
  let income = 0;
  let outcome = 0;
  Record.find()
    .lean()
    .then((records) => {
      const promises = records.map((record) => {
        //mongoDB的日期格式太長, 另外處理
        const formatDate = new Date(record.date);
        record.date = formatDate.toISOString().slice(0, 10);
        if (record.type === "income") {
          income += record.amount;
        } else if (record.type === "outcome") {
          outcome += record.amount;
        }
        return new Promise((resolve, reject) => {
          Category.findOne({ _id: record.categoryId })
            .lean()
            .then((category) => {
              const newRecord = Object.assign({}, record, {
                icon: category.icon,
              });
              resolve(newRecord);
            })
            .catch((err) => reject(err));
        });
      });
      return Promise.all(promises);
    })
    .then((finalRecords) => {
      let balance = income - outcome;
      const balanceColor = balance >= 0 ? "info" : "danger";
      income = income.toLocaleString();
      outcome = outcome.toLocaleString();
      balance = String(balance).replace(/\d(?=(\d{3})+$)/g, "$&,");
      res.render("index", {
        finalRecords,
        income,
        outcome,
        balance,
        balanceColor,
      });
    })
    .catch((err) => console.error(err));
});

module.exports = router;
