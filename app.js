const express = require("express");
const routes = require("./src/routes/index");
const config = require("./config/config.json");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();

app.use(bodyParser.json());
app.use(multer().array());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

let server = app.listen(config.app.PORT, () => {
  console.log(`App listening on port ${config.app.PORT}`);
});

module.exports = server;
