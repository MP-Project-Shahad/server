const mongoose = require("mongoose");

const role = new mongoose.Schema({
  role: { type: String },
  permissions: { type: Array },
});

module.exports = mongoose.model("Role", role);
