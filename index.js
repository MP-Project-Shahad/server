const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./db");
const roleRouter = require("./routers/routes/role");
const userRouter = require("./routers/routes/user");
const postRouter = require("./routers/routes/post");
const commentRouter = require("./routers/routes/comment");
const lessonsRouter = require("./routers/routes/lesson");
const contentRouter = require("./routers/routes/frontContent");

const app = express();
app.use(express.json());
app.use(cors());

app.use(roleRouter);
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(lessonsRouter);
app.use(contentRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
