const Category = require("../category");
const User = require("../user");
const Record = require("../record");
const db = require("../../config/mongoose");
const bcrypt = require("bcryptjs");

const SEED_USERS = [];

for (let i = 1; i < 3; i++) {
  SEED_USERS.push({
    name: `user${i}`,
    email: `user${i}@ac.com`,
    password: "12345678",
  });
}

const SEED_RECORDS = [
  {
    type: "income",
    name: "Feb. Salary",
    date: "2023-02-05",
    amount: 87000,
    category: "Income",
  },
  {
    type: "outcome",
    name: "Lunch",
    date: "2023-02-07",
    amount: 95,
    category: "Food",
  },
  {
    type: "outcome",
    name: "Take Train",
    date: "2023-02-08",
    amount: 177,
    category: "Transportation",
  },
  {
    type: "outcome",
    name: "3Days Trip",
    date: "2023-02-10",
    amount: 3999,
    category: "Entertainment",
  },
  {
    type: "outcome",
    name: "Rent",
    date: "2023-02-15",
    amount: 15000,
    category: "Housing",
  },
  {
    type: "outcome",
    name: "Pet's food",
    date: "2023-02-19",
    amount: 1000,
    category: "Other",
  },
];

db.once("open", () => {
  Promise.all(
    SEED_USERS.map((USER) => {
      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(USER.password, salt))
        .then((hash) =>
          User.create({
            name: USER.name,
            email: USER.email,
            password: hash,
          })
        )
        .then((user) => {
          const userId = user._id;
          return Promise.all(
            SEED_RECORDS.map((record) => {
              return Category.findOne({ name: record.category })
                .lean()
                .then((category) => {
                  const categoryId = category._id;
                  const newRecord = Object.assign({}, record, {
                    userId,
                    categoryId,
                  });
                  return Record.create(newRecord);
                })
                .catch((e) => console.log(e));
            })
          );
        });
    })
  )
    .then(() => {
      console.log("done.");
      process.exit();
    })
    .catch((e) => console.log(e));
});
