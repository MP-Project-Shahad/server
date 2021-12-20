const postModel = require("./../../db/module/post");
const commentModel = require("./../../db/module/comment");

//posting a new post
const post = (req, res) => {
  const { id } = req.params;
  const { img, desc } = req.body;

  const newPost = new postModel({
    img,
    desc,

    // userId: req.addedToken.id,
    userId: id,
    timeStamp: Date(),
  });
  // console.log(req);
  newPost
    .save()
    .then((result) => {
      res.send(result);
      // console.log(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

//updating a post.
const updatePost = (req, res) => {
  const { id } = req.params; //post id
  const { desc } = req.body;
  // console.log(req);

  postModel.findById({ _id: id }).then((item) => {
    if (req.addedToken.id == item.userId) {
      postModel
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
    } else {
      res.status(400).send("forbidden attempt");
    }
  });
};

//setting a post as deleted. ps: toggle
const softDelPost = (req, res) => {
  const { id } = req.params; //post id

  postModel.findById({ _id: id }).then((result) => {
    if (
      result.userId == req.addedToken.id ||
      req.addedToken.role == "61a73488b03855b1f60c356f"
    ) {
      if (result.isDel != true) {
        postModel
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
            res.send(err);
          });
      } else {
        postModel
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
            res.send(err);
          });
      }
    } else {
      res.status(400).send("forbidden attempt");
    }
  });
};

//getting existing posts all users can do this
const allPosts = (req, res) => {
  // console.log(req);

  try {
    postModel
      .find({ isDel: false })
      .populate("userId", "userName _id avatar role")
      .then((result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.send("not found");
        }
      })
      .catch((err) => {
        res.send(err);
      });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  post,
  updatePost,
  softDelPost,
  allPosts,
};
