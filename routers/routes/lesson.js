const express = require("express");
const lessonsRouter = express.Router();
const {
  addLesson,
  editLesson,
  deleteLesson,
  allLessons,
  oneLesson,
} = require("./../controllers/lesson");

lessonsRouter.post("/addlesson", addLesson);
lessonsRouter.post("/addlesson", editLesson);
lessonsRouter.post("/addlesson", deleteLesson);
lessonsRouter.post("/addlesson", allLessons);
lessonsRouter.post("/addlesson", oneLesson);

module.exports = lessonsRouter;
