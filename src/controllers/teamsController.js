const TeamSchema = require("../models/teamModel");
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

// POST/team -> criar novo time AUTH

const createTeam = async (req, res) => {
  try {
    const token = auth(req, res);

    await jwt.verify(token, SECRET, async (error) => {
      if (error) {
        return res.status(403).json("Invalid Token!");
      }

      const { name, country, type } = req.body;

      const newTeam = await new TeamSchema({
        name,
        country,
        type,
      });

      const savedTeam = await newTeam.save();

      res.status(201).json(savedTeam);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET/teams -> lista todos os times

const getTeams = async (req, res) => {
  try {
    const allTeams = await TeamSchema.find();

    res.status(200).json(allTeams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET/teams/type -> lista times por type (club or national team)

const getTeamsByType = async (req, res) => {
  try {
    const { type } = req.query;

    const teams = await TeamSchema.find({ type: type });

    res.status(200).json(teams);
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

// PATCH/team/:id -> atualiza dados de um time AUTH

const updateTeam = async (req, res) => {
  try {
    const token = auth(req, res);

    await jwt.verify(token, SECRET, async (error) => {
      if (error) {
        return res.status(403).json("Invalid Token!");
      }

      const { name, country, type } = req.body;

      const team = await TeamSchema.findByIdAndUpdate(req.params.id, {
        name,
        country,
        type,
      });

      const updatedTeam = await TeamSchema.findById(req.params.id);

      const message = `${team} updated to ${updatedTeam}`;
      res.status(200).json({ message });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE/team/:id -> exclui time por id AUTH

const deleteTeam = async (req, res) => {
  try {
    const token = auth(req, res);

    await jwt.verify(token, SECRET, async (error) => {
      if (error) {
        return res.status(403).json("Invalid Token!");
      }

      const { id } = req.params;

      const deletedTeam = await TeamSchema.findByIdAndDelete(id);

      const message = `${deletedTeam} was successfully deleted`;

      res.status(200).json({ message });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTeam,
  getTeams,
  getTeamsByType,
  getTeamByName,
  updateTeam,
  deleteTeam,
};
