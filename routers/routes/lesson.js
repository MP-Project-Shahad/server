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
lessonsRouter.post("/editlesson/:id", editLesson);
lessonsRouter.post("/deletelesson/:id", deleteLesson);
lessonsRouter.post("/alllessons", allLessons);
lessonsRouter.post("/lesson/:id", oneLesson);

module.exports = lessonsRouter;
