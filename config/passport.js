const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "This email does not exist." });
          }

          return bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch) {
              return done(null, false, { message: "Password incorret!" });
            }
            return done(null, user);
          });
        })
        .catch((e) => {
          done(e, false);
        });
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((e) => done(e, null));
  });
};
