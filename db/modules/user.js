const mongoose = require("mongoose");
// const isEmail = require("validator");

let validateEmail = function (email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const user = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  confirmKey: { type: Number },
  isActive: { type: Boolean, default: false },
  password: { type: String, required: true },
  resetCode: { type: Number, default: 0 },
  avatar: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/project-2-4f59d.appspot.com/o/no-photo-large-m.jpg?alt=media&token=aacc1095-a755-4441-9e92-4a2931e2a78e",
  },
  isDel: { type: Boolean, default: false },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    default: "61a73499b03855b1f60c3571",
  },
  level: { type: String, default: "didn't take the placement test yet" },
});

module.exports = mongoose.model("User", user);
