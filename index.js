const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./db");
const roleRouter = require("./routers/route/role");

const app = express();
app.use(express.json());
app.use(cors());

app.use(roleRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
