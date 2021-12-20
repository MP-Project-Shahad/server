const commentModel = require("./../../db/modules/comments");
const postModel = require("./../../db/modules/post");

//posting a new post
const newComment = (req, res) => {
  const { postId, userId } = req.params; //post id
  const { desc, img } = req.body;

  const newComment = new commentModel({
    desc,
    img,
    postId,
    userId,
    timeStamp: Date(),
  });

  newComment
    .save()
    .then((result) => {
      res.json(result);
      // console.log(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

//updating a post.
const updateComment = (req, res) => {
  const { id } = req.params; //post id
  const { desc } = req.body;

  commentModel
    .findOneAndUpdate(
      { _id: id },
      { $set: { desc: desc, timeStamp: Date() } },
      { new: true }
    )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

//setting a task as deleted.
const delComment = (req, res) => {
  const { id } = req.params; //comment id

  commentModel.findByIdAndDelete({ _id: id }).then((result) => {
    // if ( we don't need this cause we'll only show this if the user id on the state is the same on post/comment
    //   // result.userId == req.addedToken.id ||
    //   // req.addedToken.role == "61a73488b03855b1f60c356f"
    // ) {
    try {
      console.log(result);
      res.status(200).send("comment has been deleted");
    } catch (error) {
      res.status(400).json(error.message, "unauthorized user");
    }
    // } else {
    // }
  });
};

//getting comment
const getComment = (req, res) => {
  const { id } = req.params; //comment id

  commentModel
    .find({
      _id: id,
      //  userId: req.addedToken.id,
    })
    .then((result) => {
      res.status(200).json(result);
      console.log(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

//getting the post with its comments
const getFullPost = (req, res) => {
  const { id } = req.params;
  try {
    let fullPost = [];
    postModel
      .findOne({ _id: id })
      .populate("userId")
      .then((result) => {
        fullPost.push(result);
        commentModel
          .find({ postId: id })
          .populate("userId", "userName")
          .then((item) => {
            fullPost.push(item);
          });
      });
    // commentModel ---------> this will only get user info and the post but we need the post and comments and the likes
    //   .find()
    //   .populate("userId","")
    //   .populate("postId")
    //   .then((result) => res.status(200).json(result));
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = {
  newComment,
  updateComment,
  getComment,
  delComment,
  getFullPost,
};
