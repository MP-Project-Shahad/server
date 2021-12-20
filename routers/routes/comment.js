const express = require("express");
// const authentication = require("./../middlewares/authentication");
const commentRouter = express.Router();

const {
  newComment,
  updateComment,
  getComment,
  delComment,
  getAll,
} = require("./../controllers/comment");

commentRouter.post("/comment/:id/:userId", newComment);
commentRouter.put("/updateComment/:id", updateComment); //updating post desc and timestamp
commentRouter.get("/getComment/:id", getComment); //getting all undeleted posts
commentRouter.put("/delComment/:id", delComment); // delete comment
commentRouter.get("/fullpost/:id", getAll); // getting post with comments and likes

module.exports = commentRouter;
