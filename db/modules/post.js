const mongoose = require("mongoose");

const post = new mongoose.Schema({
  desc: { type: String, required: true },
  img: { type: String },
  timeStamp: { type: Date },
  isDel: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Post", post);
