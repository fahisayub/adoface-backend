const express = require("express");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT;
const { connection } = require("./config/db.config");
const { userRouter } = require("./routes/user.route");
const { postRouter } = require("./routes/post.route");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Backend!");
});

app.use("/user", userRouter);
app.use("/post", postRouter);

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected To MongoDB");
  } catch (e) {
    console.log(404, "Couldn't connect");
  }
  console.log(`listening on port ${port}`);
});
