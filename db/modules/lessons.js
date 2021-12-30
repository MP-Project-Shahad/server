const mongoose = require("mongoose");

const lesson = new mongoose.Schema({
  content: { type: String, required: true },
  title: { type: String, required: true },
  language: { type: String, required: true },
  level: { type: String, required: true },
  audio: { type: String },
  img: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/tahddathar.appspot.com/o/31413639618c3929f34113d84d334b09.jpg?alt=media&token=e85ca71a-746d-4dfa-a506-3a4ba01f87ac",
  },
  isDel: { type: Boolean, default: false },
});

module.exports = mongoose.model("Lesson", lesson);
