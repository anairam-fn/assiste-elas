const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: mongoose.Types.ObjectId,
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: false
    },
  },
  {
    versionKey: false,
  }
);

const Model = mongoose.model("admin", AdminSchema);

module.exports = Model;
