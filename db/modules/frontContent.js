const mongoose = require("mongoose");

const frontContent = new mongoose.Schema({
  desc: { type: String, required: true },
  name: { type: String, required: true },
  img: { type: String, required: true },
  link: { type: String, required: true },
  price: { type: String, required: true },
});

module.exports = mongoose.model("FrontContent", frontContent);
