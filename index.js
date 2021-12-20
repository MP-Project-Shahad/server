const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./db");
const roleRouter = require("./routers/routes/role");
const userRouter = require("./routers/routes/user");
const postRouter = require("./routers/routes/post");
const commentRouter = require("./routers/routes/post");

const app = express();
app.use(express.json());
app.use(cors());

app.use(roleRouter);
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
