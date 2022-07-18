const mongoose = require("mongoose");

const NationalTeamSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },

  name: {
    type: String,
    required: true,
  },
});

const Model = mongoose.model("nationalTeam", NationalTeamSchema)

module.exports = Model;
