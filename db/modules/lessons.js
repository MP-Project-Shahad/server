const mongoose = require("mongoose");

const lesson = new mongoose.Schema({
  content: { type: String, required: true },
  title: { type: String, required: true },
  language: { type: String, required: true },
  level: { type: String, required: true },
  audio: { type: String },
  img: { type: String },
  isDel: { type: Boolean, default: false },
});

module.exports = mongoose.model("Lesson", lesson);
