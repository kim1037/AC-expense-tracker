const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");

router.get("/new", (req, res) => {
  res.render("new");
});

router.get("/edit/:id", (req, res) => {
  const _id = req.params.id;
  return Record.findOne({ _id })
    .lean()
    .then((record) => {
      Category.find()
        .lean()
        .then((categories) => {
          const category = categories.find((cate) => {
            if (cate._id.toString() === record.categoryId.toString()) {
              return cate;
            }
          });
          res.render("edit", { record, categories, category });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.put("/edit/:id", (req, res) => {
  const _id = req.params.id;
  // const userId = req.user._id;
  Record.findOneAndUpdate({ _id }, req.body)
    .then(() => res.redirect("/"))
    .catch((e) => console.log(e));
});

router.delete("/delete/:id", (req, res) => {
  const _id = req.params.id;
  // const userId = req.user._id;
  Record.findOne({ _id })
    .then((record) => {
      return record.remove();
    })
    .then(() => res.redirect("/"))
    .catch((e) => console.log(e));
});

module.exports = router;
