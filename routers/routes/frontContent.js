const express = require("express");
const contentRouter = express.Router();
const {
  allContent,
  addContent,
  editContent,
  deleteContent,
} = require("./../controllers/frontContent");

contentRouter.get("/allContent", allContent);
contentRouter.post("/addContent", addContent);
contentRouter.put("/editContent", editContent);
contentRouter.put("/delContent", deleteContent);

module.exports = contentRouter;
