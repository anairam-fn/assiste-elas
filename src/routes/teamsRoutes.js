const controller = require("../controllers/teamsController");
const express = require("express");

const router = express.Router();

router.post("/team", controller.createTeam);
router.get("/teams", controller.getTeams);
router.get("/team/name", controller.getTeamByName);
router.patch("/team/:id", controller.updateTeam);
router.delete("/team/:id", controller.deleteTeam);

module.exports = router;