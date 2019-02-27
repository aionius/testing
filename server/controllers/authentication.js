const User = require("../models/user");
const jwt = require("jwt-simple");
const config = require("../config/secret");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({
      error: "You must provide email and password"
    });
  }

  // see if a user with the given email exists
  User.findOne({ email: email }, function(error, existingUser) {
    if (error) {
      return next(error);
    }

    // if a user with email does exists, return an error
    if (existingUser) {
      res.status(422).send({ error: "Email is in use..." });
    }

    // if a user with email does NOT exists, create and save user record
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(error) {
      if (error) {
        return next(error);
      }

      // respond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
};
