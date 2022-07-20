require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");

const db = require("./config/database");

const teamsRoutes = require("./routes/teamsRoutes");
const matchesRoutes = require("./routes/matchesRoutes");

db.connect();

app.use(cors());
app.use(express.json());

app.use("/", teamsRoutes);
app.use("/", matchesRoutes);

module.exports = app;
