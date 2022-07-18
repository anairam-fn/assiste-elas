const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
});

const Model = mongoose.model("admin", AdminSchema);

module.exports = Model;
