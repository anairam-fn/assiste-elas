require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger/swagger_output.json");

const db = require("./config/database");

const index = require("./routes/index");
const teamsRoutes = require("./routes/teamsRoutes");
const matchesRoutes = require("./routes/matchesRoutes");

db.connect();

app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", index);
app.use("/", teamsRoutes);
app.use("/", matchesRoutes);
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;
