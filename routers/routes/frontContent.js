const express = require("express");
const contentRouter = express.Router();
const {
  allContent,
  addContent,
  editContent,
  deleteContent,
} = require("./../controllers/frontContent");

contentRouter.get("/allContent", allContent);
contentRouter.get("/addContent", addContent);
contentRouter.get("/editContent", editContent);
contentRouter.get("/delContent", deleteContent);

module.exports = contentRouter;
