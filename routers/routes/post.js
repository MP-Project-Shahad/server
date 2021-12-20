const express = require("express");
// const authentication = require("./../middlewares/authentication");
const postRouter = express.Router();

const {
  post,
  updatePost,
  allPosts,
  softDelPost,
  deletePostComment,
} = require("./../controllers/post");

postRouter.post("/post/:id", post); //postting a post
postRouter.put("/updatePost/:id", updatePost); //updating post desc and timestamp
postRouter.get("/allPosts", allPosts);
postRouter.delete("/softDelPost/:id", softDelPost); //soft delete
postRouter.put("/userdelcom/:postId/:commentId", deletePostComment); //user can delete any comment on his post

module.exports = postRouter;
