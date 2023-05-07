const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");

router.get("/login", (req, res) => {
  const { email, rememberMe } = req.session;
  if (rememberMe) {
    res.render("login", { email, rememberMe });
  } else {
    res.render("login");
  }
});

router.post(
  "/login",
  function (req, res, next) {
    //to remember email when login next time
    const { email, rememberMe } = req.body;
    if (rememberMe === "on") {
      req.session.email = email;
      req.session.rememberMe = true;
    } else {
      req.session.email = null;
      req.session.rememberMe = false;
    }
    next();
  },
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true,
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
      const errors = [];
      if (user) {
        errors.push({ message: "This email exists." });
      }

      if (!name || !email || !password || !confirmPassword) {
        errors.push({ message: "All field is required." });
      }
      if (password !== confirmPassword) {
        errors.push({
          message: "Confirm password must be same with password.",
        });
      }

      if (errors.length) {
        return res.render("register", {
          name,
          email,
          password,
          confirmPassword,
          errors,
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
            .then((newUser) => {
              req.logIn(newUser, (err) => {
                if (err) return next(err);
                req.flash("success_msg", "Register success.");
                return res.redirect("/");
              });
            })
            .catch((e) => console.log(e));
        });
    });
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Logout success.");
  res.redirect("/users/login");
});

module.exports = router;
