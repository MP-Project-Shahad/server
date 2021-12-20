const lessonModel = require("./../../db/modules/lessons");

//get all lessons
const allLessons = (req, res) => {
  try {
    lessonModel
      .find({ isDel: false })
      .then((result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.send("none found");
        }
      })
      .catch((err) => {
        console.log("get all lessons error is:");
        res.json(err.message);
      });
  } catch (error) {
    console.log("all lessons trycatch error:");
    res.json(error.message);
  }
};

//get one lesson by id
const oneLesson = (req, res) => {
  const { id } = req.params; //post id

  lessonModel
    .find({
      _id: id,
    })
    .then((result) => {
      if (result.isDel === false) {
        res.status(200).json(result);
        console.log(result);
      } else {
        res.status(404).json("Lesson is deleted");
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

//to add a new lesson
const addLesson = (req, res) => {
  const { title, content, language, level } = req.body;

  const newLesson = new lessonModel({
    title,
    content,
    language,
    level,
  });

  try {
    newLesson
      .save()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log("add lesson error is:");
        res.json(err.message);
      });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

//to edit a lesson
const editLesson = (req, res) => {
  const { id } = req.params;
  const { title, content, language, level } = req.body;

  try {
    lessonModel
      .findByIdAndUpdate(
        { _id: id },
        { $set: { title, content, language, level } },
        { new: true }
      )
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log("edit lesson error is:");
        res.json(err.message);
      });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

//delete lesson
const deleteLesson = (req, res) => {
  const { id } = req.params;

  try {
    lessonModel.findByIdAndUpdate({ _id: id }).then((result) => {
      if (result.isDel != true) {
        lessonModel
          .findByIdAndUpdate(
            { _id: id },
            { $set: { isDel: true } },
            { new: true }
          )
          .then((result) => {
            res.status(200).json(result);
            // console.log(result);
          })
          .catch((err) => {
            console.log("delete post first if error:");
            res.send(err.message);
          });
      } else {
        lessonModel
          .findByIdAndUpdate(
            { _id: id },
            { $set: { isDel: false } },
            { new: true }
          )
          .then((result) => {
            res.status(200).json(result);
            // console.log(result);
          })
          .catch((err) => {
            console.log("delete post else error:");
            res.send(err.message);
          });
      }
    });
  } catch (error) {
    console.log("delete post trycatch error:");
    res.status(404).json(error.message);
  }
};

module.exports = { addLesson, editLesson, deleteLesson, allLessons, oneLesson };
