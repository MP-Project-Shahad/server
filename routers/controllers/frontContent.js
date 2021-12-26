const frontContentModel = require("./../../db/modules/frontContent");

//to get all content on front page
const allContent = (req, res) => {
  try {
    frontContentModel
      .find({ isDel: false })
      .then((result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.send("none was found");
        }
      })
      .catch((err) => {
        console.log("allContent model error:");
        res.json(err.message);
      });
  } catch (error) {
    console.log("allContent tryCatch error:");
    res.status(404).json(error.message);
  }
};

//add new content
const addContent = (req, res) => {
  const { name, desc, img, link, price } = req.body;

  try {
    const newContent = new frontContentModel({
      name,
      desc,
      img,
      link,
      price,
    });

    newContent
      .save()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log("post content model error:");
        res.json(err.message);
      });
  } catch (error) {
    console.log("addContent tryCatch error:");
    res.status(404).json(error.message);
  }
};

//edit content information
const editContent = (req, res) => {
  const { id } = req.params;
  const { newName, newDesc, newImg, newLink, newPrice } = req.body;

  try {
    frontContentModel
      .findById(
        { _id: id },
        {
          $set: {
            name: newName,
            desc: newDesc,
            img: newImg,
            link: newLink,
            price: newPrice,
          },
        },
        { new: true }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log("editContent content model error:");
        res.json(err.message);
      });
  } catch (error) {
    console.log("editContent tryCatch error:");
    res.status(404).json(error.message);
  }
};

//soft delete content
const deleteContent = (req, res) => {
  const { id } = req.params;

  try {
    frontContentModel.findById({ _id: id }).then((result) => {
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
            console.log("deleteContent first if model error:");
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
            console.log("deleteContent else model error:");
            res.send(err);
          });
      }
    });
  } catch (error) {
    console.log("deleteContent tryCatch error:");
    res.status(404).json(error.message);
  }
};

module.exports = { allContent, addContent, editContent, deleteContent };
