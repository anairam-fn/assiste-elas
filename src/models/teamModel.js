const mongoose = require("mongoose");

const TeamSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },

  name: {
    type: String,
    required: true
  },

  country: {
    type: String,
    required: true
  }
});

const Model = mongoose.model("team", TeamSchema)

module.exports = Model;