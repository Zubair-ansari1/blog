require("dotenv").config()

const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const blogRouter = require('./routes/blog')

const PORT = process.env.PORT || 8000;

const Blog = require('./models/blog')

mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log("MongoDB connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});

  res.render("home", {
    user: req.user,
    blogs: allBlogs
  });
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
