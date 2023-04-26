const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");

router.get("/", (req, res) => {
  const userId = req.user._id;
  let income = 0;
  let expense = 0;
  Category.find()
    .lean()
    .then((categories) => {
      Record.find({ userId })
        .lean()
        .then((records) => {
          return Promise.all(
            records.map((record) => {
              const icon = categories.find(
                (category) =>
                  category._id.toString() === record.categoryId.toString()
              ).icon;
              //new Date(record.date).toLocaleString().substring(0, 9)
              const formatDate = new Date(record.date);
              record.date = formatDate.toISOString().slice(0, 10);
              if (record.type === "income") {
                income += record.amount;
              } else if (record.type === "expense") {
                expense += record.amount;
              }
              const formattedRecord = {
                ...record,
                icon,
              };
              return formattedRecord;
            })
          );
        })
        .then((finalRecords) => {
          let totalAmount = income - expense;
          const totalAmountColor = totalAmount >= 0 ? "info" : "danger";
          income = income.toLocaleString();
          expense = expense.toLocaleString();
          totalAmount = String(totalAmount).replace(/\d(?=(\d{3})+$)/g, "$&,");
          res.render("index", {
            categories,
            finalRecords,
            income,
            expense,
            totalAmount,
            totalAmountColor,
          });
        })
        .catch((err) => console.error(err));;
    });
});

router.get("/sort", (req, res) => {
  const { categoryFilter, sortWay, sortBy } = req.query;
  console.log(categoryFilter, sortWay, sortBy);
  res.render("index");
});

module.exports = router;
