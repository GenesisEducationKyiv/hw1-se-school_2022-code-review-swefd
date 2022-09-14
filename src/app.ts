import express = require("express");
import routes from "./routes";
import config from "./config/config";
import bodyParser = require("body-parser");
import multer = require("multer");

const app = express();

app.use(bodyParser.json());
app.use(multer().array(""));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

let server = app.listen(config.app.PORT, () => {
  console.log(`App listening on port ${config.app.PORT}`);
});

export default server;
