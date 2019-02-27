const AuthenticationController = require("./controllers/authentication");

module.exports = function(app) {
  app.post("/signup", AuthenticationController.signup);
};
