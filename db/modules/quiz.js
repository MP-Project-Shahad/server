const mongoose = require("mongoose");

const quiz = new mongoose.Schema({
  quizName: { type: String, required: true },
  qText: { type: String, required: true },
  answers: { type: Array },
});

module.exports = mongoose.model("Quiz", quiz);
