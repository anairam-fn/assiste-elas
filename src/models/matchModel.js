const mongoose = require("mongoose");

const MatchSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },

  team1: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "team",
  },
  team2: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "team"
  },
  local: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  streaming: {
    type: String,
    default: "The match will not be broadcast on any streaming channel. :<",
  },
});

const Model = mongoose.model("match", MatchSchema);

module.exports = Model;
