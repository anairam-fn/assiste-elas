const MatchSchema = require("../models/matchModel");
const TeamSchema = require("../models/teamModel");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const auth = (req, res) => {
  const authHeader = req.get("authorization");

  if (!authHeader) {
    return res.status(401).json("Missing authorization!");
  }
  const token = authHeader.split(" ")[1];
  return token;
};

// POST/match -> criar nova partida AUTH

const createMatch = async (req, res) => {
  try {
    const token = auth(req, res);

    await jwt.verify(token, SECRET, async (error) => {
      if (error) {
        return res.status(403).json("Invalid Token!");
      }

      const { team1Id, team2Id, local, date, time, type, streaming } = req.body;

      if (!team1Id || !team2Id) {
        return res.status(400).json({ message: "Teams IDs are required!" });
      }

      const findTeam1 = await TeamSchema.findById(team1Id);
      const findTeam2 = await TeamSchema.findById(team2Id);

      if (!findTeam1 || !findTeam2) {
        return res.status(404).json({ message: "Team not found!" });
      }

      const newMatch = new MatchSchema({
        team1: team1Id,
        team2: team2Id,
        local,
        date,
        time,
        type,
        streaming,
      });

      const savedMatch = await newMatch.save();

      res.status(201).json(savedMatch);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET/matches -> lista todas as partidas

const getAllMatches = async (req, res) => {
  try {
    const allMatches = await MatchSchema.find()
      .populate("team1")
      .populate("team2");

    res.status(200).send(allMatches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET/matches/team -> lista partidas de um time específico

const getMatchByTeam = async (req, res) => {
  try {
    const { name } = req.query;

    const matchesPopulated = await MatchSchema.find()
      .populate("team1")
      .populate("team2");

    const teamFound = await matchesPopulated.filter(
      (match) =>
        match.team1.name.toLowerCase() === name ||
        match.team2.name.toLowerCase() === name
    );

    if (!teamFound.length) {
      return res.status(404).json({ message: "Match not found!" });
    }

    res.status(200).json(teamFound);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET/matches/day -> lista partidas do dia

const matchesByDay = async (req, res) => {
  try {
    const { date } = req.query;

    const match = await MatchSchema.find({ date: date });

    const matchFound = match.filter(
      (match) => moment(match.date).add(1, "days").format("YYYY-MM-DD") == date
    );

    if (!matchFound.length) {
      return res
        .status(404)
        .json({ message: "There are no matches that day!" });
    }

    res.status(200).json(match);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// PATCH/match/:id -> atualiza dados de uma partida AUTH

const updateMatch = async (req, res) => {
  try {
    const token = auth(req, res);

    await jwt.verify(token, SECRET, async (error) => {
      if (error) {
        return res.status(403).json("Invalid Token!");
      }

      const { team1Id, team2Id, local, date, time, type, streaming } = req.body;
      const { id } = req.params;

      await MatchSchema.findByIdAndUpdate(id, {
        team1Id,
        team2Id,
        local,
        date,
        time,
        type,
        streaming,
      });

      const updatedMatch = await MatchSchema.findById(req.params.id)
        .populate("team1")
        .populate("team2");

      res.status(200).json(updatedMatch);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE/match/:id -> exclui partida por id (excluir partida por data? serase) AUTH

const deleteMatch = async (req, res) => {
  try {
    const token = auth(req, res);

    await jwt.verify(token, SECRET, async (error) => {
      if (error) {
        return res.status(403).json("Invalid Token!");
      }

      const { id } = req.params;

      const deletedMatch = await MatchSchema.findByIdAndDelete(id);

      const message = `${deletedMatch} was successfully deleted`;

      res.status(200).json({ message });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMatch,
  getAllMatches,
  getMatchByTeam,
  matchesByDay,
  updateMatch,
  deleteMatch,
};
