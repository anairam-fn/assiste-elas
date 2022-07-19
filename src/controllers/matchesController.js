const MatchSchema = require("../models/matchModel");
const TeamSchema = require("../models/teamModel");

// POST/match -> criar nova partida

const createMatch = async (req, res) => {
  try {
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
      (match) => match.team1.name === name || match.team2.name === name
    );

    if(!teamFound[0]) {
        return res.status(404).json({ message: "Match not found!"})
    }

    res.status(200).json(teamFound);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET/matches/nationalteam -> lista partidas de uma seleção específica

// GET/matches/day -> lista partidas do dia

// PATCH/match/:id -> atualiza dados de uma partida

// DELETE/match/:id -> exclui partida por id (excluir partida por data? serase)

const deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMatch = await MatchSchema.findByIdAndDelete(id);

    const message = `${deletedMatch} was successfully deleted`;

    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMatch,
  getAllMatches,
  getMatchByTeam,
  deleteMatch,
};
