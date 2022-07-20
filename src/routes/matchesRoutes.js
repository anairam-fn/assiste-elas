const controller = require("../controllers/matchesController");
const express = require("express");

const router = express.Router();

router.post("/match", controller.createMatch);
router.get("/matches", controller.getAllMatches)
router.get("/matches/team", controller.getMatchByTeam)
router.get("/matches/day", controller.matchesByDay)
router.patch("/match/:id", controller.updateMatch)
router.delete("/match/:id", controller.deleteMatch)

module.exports = router;
