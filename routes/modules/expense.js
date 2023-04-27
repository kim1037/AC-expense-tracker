const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");

router.get("/new", (req, res) => {
  Category.find()
    .lean()
    .then((categories) => {
      res.render("new", { categories });
    })
    .catch((e) => console.log(e));
});

router.post("/new", async (req, res) => {
  try {
    let categories = await Category.find().lean();
    categories = categories.map((cate) => {
      cate._id = cate._id.toString();
      return cate;
    });
    const userId = req.user._id;
    const { type, name, date, categoryId, amount } = req.body;
    const errors = [];

    if (!type || !name || !date || !categoryId || !amount) {
      errors.push({ message: "All fields are required." });
    }

    if (errors.length) {
      res.render("new", {
        categories,
        type,
        name,
        date,
        categoryId,
        amount,
        errors,
      });
    } else {
      await Record.create({ type, name, date, categoryId, amount, userId });
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/edit/:id", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  return Record.findOne({ _id, userId })
    .lean()
    .then((record) => {
      record.date = new Date(record.date).toISOString().slice(0, 10);
      Category.find()
        .lean()
        .then((categories) => {
          const category = categories.find((cate) => {
            if (cate._id.toString() === record.categoryId.toString()) {
              return cate;
            }
          });
          res.render("edit", { record, categories, category: category.name });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.put("/edit/:id", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  Record.findOneAndUpdate({ _id, userId }, req.body)
    .then(() => res.redirect("/"))
    .catch((e) => console.log(e));
});

router.delete("/delete/:id", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  Record.findOne({ _id, userId })
    .then((record) => {
      return record.remove();
    })
    .then(() => res.redirect("/"))
    .catch((e) => console.log(e));
});

module.exports = router;
