const TeamSchema = require("../models/teamModel");

// POST/team -> criar novo time

const createTeam = async (req, res) => {
  try {
    const { name, country, type } = req.body;

    const newTeam = new TeamSchema({
      name,
      country,
      type
    });

    const savedTeam = await newTeam.save();

    res.status(201).json(savedTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET/teams -> lista times por type (club or national team)

const getTeams = async (req, res) => {
  try {
    const { type } = req.query

    const allTeams = await TeamSchema.find({ type: type});

    res.status(200).json(allTeams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET/team/name -> acessa um time pelo nome

const getTeamByName = async (req, res) => {
  try {
    const { name } = req.query;
    const teamFound = await TeamSchema.findOne({ name: name });
    
    res.status(200).json(teamFound);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// PATCH/team/:id -> atualiza dados de um time

const updateTeam = async (req, res) => {
  try {
    const { name, country, type } = req.body;

    const team = await TeamSchema.findByIdAndUpdate(req.params.id, {
      name,
      country,
      type
    });

    const updatedTeam = await TeamSchema.findById(req.params.id);

    const message = `${team} updated to ${updatedTeam}`;
    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE/team/:id -> exclui time por id

const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTeam = await TeamSchema.findByIdAndDelete(id);

    const message = `${deletedTeam} was successfully deleted`;

    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTeam,
  getTeams,
  getTeamByName,
  updateTeam,
  deleteTeam,
};
