const quizModel = require("./../../db/modules/quiz");

//adding questions
const addQ = (req, res) => {
  const { name, qText, answers } = req.body;

  const newQ = new quizModel({
    quizName: name,
    qText,
    answers,
  });

  newQ
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err.message);
    });
};

//getting questions
const getQs = (req, res) => {
  const { name } = req.params;
  quizModel
    .find({ quizName: name })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = { addQ, getQs };
