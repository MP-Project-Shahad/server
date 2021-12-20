const mongoose = require("mongoose");

const comment = new mongoose.Schema({
  desc: { type: String, required: true },
  timeStamp: { type: Date },
  isDel: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
});

module.exports = mongoose.model("Comment", comment);
