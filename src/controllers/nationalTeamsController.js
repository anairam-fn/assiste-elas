const NationalTeamSchema = require("../models/nationalTeamModel");

// POST/team -> criar novo time

const createNationalTeam = async (req, res) => {
  try {
    const { name } = req.body;

    const newNationalTeam = new NationalTeamSchema({
      name,
    });

    const savedNationalTeam = await newNationalTeam.save();

    res.status(201).json(savedNationalTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET/nationalteams -> lista todos as seleções

const getNationalTeams = async (req, res) => {
  try {
    const allNationalTeams = await NationalTeamSchema.find();

    res.status(200).json(allNationalTeams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET/nationalteam/name -> acessa uma seleção pelo nome

const getNationalTeamByName = async (req, res) => {
  try {
    const { name } = req.query;
    const nationalTeamFound = await NationalTeamSchema.findOne({ name: name });

    res.status(200).json(nationalTeamFound);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// PATCH/nationalteam/:id -> atualiza dados de uma seleção (se nao for adicionar imagem fazer um PUT?)

const updateNationalTeam = async (req, res) => {
  try {
    const { name } = req.body;

    const nationalTeam = await NationalTeamSchema.findByIdAndUpdate(
      req.params.id,
      {
        name,
      }
    );

    const updatedNationalTeam = await NationalTeamSchema.findById(
      req.params.id
    );

    const message = `${nationalTeam} updated to ${updatedNationalTeam}`;
    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE/nationalteam/:id -> exclui seleção por id

const deleteNationalTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNationalTeam = await NationalTeamSchema.findByIdAndDelete(id);

    const message = `${deletedNationalTeam} was successfully deleted`;

    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNationalTeam,
  getNationalTeams,
  getNationalTeamByName,
  updateNationalTeam,
  deleteNationalTeam,
};
