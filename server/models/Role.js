const mongoose = require("mongoose");

const RoleSchme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    pages: {
      type: [String],
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Roles", RoleSchme);
