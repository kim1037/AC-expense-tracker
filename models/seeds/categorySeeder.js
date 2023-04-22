const Category = require("../category");
const db = require("../../config/mongoose");
const CATEGORY = {
  Housing: 'fa-solid fa-house',
  Transportation: 'fa-solid fa-van-shuttle',
  Entertainment: 'fa-solid fa-face-grin-beam',
  Food: 'fa-solid fa-utensils',
  Other: 'fa-solid fa-pen',
  Income: 'fa-solid fa-money-bill-1-wave',
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
