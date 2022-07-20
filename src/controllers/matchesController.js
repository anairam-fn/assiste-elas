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

// GET/matches/team -> lista partidas de um time específico (escolhe seleção ou clube)

const getMatchByTeam = async (req, res) => {
  try {
    const { name, type } = req.query;

    const matchesPopulated = await MatchSchema.find()
      .populate("team1")
      .populate("team2");

    const typeFound = await matchesPopulated.filter(
      (match) =>
        match.team1.type.toLowerCase() === type ||
        match.team2.type.toLowerCase() === type
    );
    console.log(typeFound);

    const teamFound = await typeFound.filter(
      (match) =>
        match.team1.name.toLowerCase() === name ||
        match.team2.name.toLowerCase() === name
    );

    if (!teamFound[0]) {
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
    const { date } = req.query

    const match = await MatchSchema.find({ date: date })

    res.status(200).json(match)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

// PATCH/match/:id -> atualiza dados de uma partida

const updateMatch = async (req, res) => {
  try {
    const { team1Id, team2Id, local, date, time, type, streaming } = req.body;
    const { id } = req.params

    const match = await MatchSchema.findByIdAndUpdate(id, {
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

    //const message = `${match} updated to ${updatedMatch}`;

    res.status(200).json(updatedMatch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

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
  matchesByDay,
  updateMatch,
  deleteMatch,
};
