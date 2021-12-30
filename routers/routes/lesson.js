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
lessonsRouter.put("/editlesson/:id", editLesson);
lessonsRouter.put("/deletelesson/:id", deleteLesson);
lessonsRouter.get("/allLessons/:level", allLessons);
lessonsRouter.get("/lesson/:id", oneLesson);

module.exports = lessonsRouter;
