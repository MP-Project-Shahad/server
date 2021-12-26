const express = require("express");
const quizRouter = express.Router();

const { addQ, getQs } = require("./../controllers/quiz");

quizRouter.post("/addq", addQ);
quizRouter.get("/getqs/:name", getQs);

module.exports = quizRouter;
