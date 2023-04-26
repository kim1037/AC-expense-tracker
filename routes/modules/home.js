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
              record.date = new Date(record.date).toISOString().slice(0, 10);
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
          totalAmount = totalAmount.toLocaleString();

          res.render("index", {
            categories,
            finalRecords,
            income,
            expense,
            totalAmount,
            totalAmountColor,
          });
        })
        .catch((err) => console.error(err));
    });
});

//practice async/await
router.get("/sort", async (req, res) => {
  const { categoryFilter, sortWay, sortBy } = req.query;
  const userId = req.user._id;
  let income = 0;
  let expense = 0;
  const sort = {};
  sort[sortBy] = sortWay;

  const categories = await Category.find().lean();
  const records = categoryFilter
    ? await Record.find({ userId, categoryId: categoryFilter })
        .sort(sort)
        .lean()
    : await Record.find({ userId }).sort(sort).lean();
  const finalRecords = records.map((record) => {
    const icon = categories.find(
      (category) => category._id.toString() === record.categoryId.toString()
    ).icon;
    record.date = new Date(record.date).toISOString().slice(0, 10);
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
  });
  let totalAmount = income - expense;
  const totalAmountColor = totalAmount >= 0 ? "info" : "danger";
  income = income.toLocaleString();
  expense = expense.toLocaleString();
  totalAmount = totalAmount.toLocaleString();
  res.render("index", {
    categories,
    finalRecords,
    income,
    expense,
    totalAmount,
    totalAmountColor,
    categoryFilter: categoryFilter
      ? categories.find((c) => c._id.toString() === categoryFilter).name
      : "",
    sortWay,
    sortBy,
  });
});

module.exports = router;
