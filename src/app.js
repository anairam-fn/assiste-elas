const express = require("express");
const app = express();
const cors = require("cors");

const db = require("./config/database");

const teamsRoutes = require("./routes/teamsRoutes");
const nationalTeamsRoutes = require("./routes/nationalTeamsRoutes");
//const matchesRoutes = require("./routes/matchesRoutes");

db.connect();

app.use(cors());
app.use(express.json());

app.use("/", teamsRoutes);
app.use("/", nationalTeamsRoutes);
//app.use("/matches", matchesRoutes);

module.exports = app;
