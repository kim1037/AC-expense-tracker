const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  User.findOne({ email })
    .lean()
    .then((user) => {
      if (user) {
        return res.render("register", { message: "This email exists." });
      }

      if (!name || !email || !password || !confirmPassword) {
        return res.render("register", {
          name,
          email,
          password,
          confirmPassword,
          message: "All field is required.",
        });
      }
      if (password !== confirmPassword) {
        return res.render("register", {
          name,
          email,
          password,
          confirmPassword,
          message: "Confirm Password must be same with password.",
        });
      }

      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hash) => {
          User.create({
            name,
            email,
            password: hash,
          })
            .then(() => res.redirect("/users/login"))
            .catch((e) => console.log(e));
        });
    });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
