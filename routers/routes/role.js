const express = require("express");
const roleRouter = express.Router();

const { create, getRoles } = require("./../controller/role");

roleRouter.post("/create", create);
roleRouter.get("/roles", getRoles);

module.exports = roleRouter;
