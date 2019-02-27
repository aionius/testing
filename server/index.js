// main starting point of the application
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");

// db setup
const dbConfig = require("./config/keys").mongoURI;
mongoose
  .connect(dbConfig, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => {
    console.log(err);
  });

// app setup
app.use(morgan("combined")); // for server log
app.use(bodyParser.json({ type: "*/*" })); // used to parse incoming request to json
router(app);

// server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on:", port);
