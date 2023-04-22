const Category = require("../category");
const db = require("../../config/mongoose");
const CATEGORY = {
  Housing: '<i class="fa-solid fa-house"></i>',
  Transportation: '<i class="fa-solid fa-van-shuttle"></i>',
  Entertainment: '<i class="fa-solid fa-face-grin-beam"></i>',
  Food: '<i class="fa-solid fa-utensils"></i>',
  Other: '<i class="fa-solid fa-pen"></i>',
  Income: '<i class="fa-solid fa-money-bill-1-wave"></i>',
};

const categories = [];

for (let category in CATEGORY) {
  categories.push({ name: category, icon: CATEGORY[category] });
}

db.once("open", async () => {
  try {
    await Promise.all(categories.map((category) => Category.create(category)));
    console.log("done");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
