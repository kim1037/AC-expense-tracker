const Category = require("../category");
const User = require("../user");
const Record = require("../record");
const db = require("../../config/mongoose");
const bcrypt = require("bcryptjs");
const SEED_USERS = require('./user.json');
const SEED_RECORDS = require("./record.json");

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
          console.log('user created.')
          const userId = user._id;
          return Promise.all(
            SEED_RECORDS.map((record) => {
              return Category.findOne({ name: record.category })
                .lean()
                .then((category) => {
                  const categoryId = category._id;
                  const finalRecord = Object.assign({}, record, {
                    userId,
                    categoryId,
                  });
                  return Record.create(finalRecord);
                })
            })
          );
        });
    })
  )
    .then(() => {
      console.log("All users and records are created.");
      process.exit();
    })
    .catch((e) => console.log(e));
});
