const controller = require("../controllers/nationalTeamsController");
const express = require("express");

const router = express.Router();

router.post("/nationalteam", controller.createNationalTeam);
router.get("/nationalteams", controller.getNationalTeams);
router.get("/nationalteam/name", controller.getNationalTeamByName);
router.patch("/nationalteam/:id", controller.updateNationalTeam);
router.delete("/nationalteam/:id", controller.deleteNationalTeam);

module.exports = router;