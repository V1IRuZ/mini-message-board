const express = require("express");
const path = require("node:path");
const PORT = process.env.PORT || 3000;

const app = express();

const indexRouter = require("./routes/indexRouter.js");
const { error } = require("node:console");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.statusCode || 500)
    .render("error", { errors: [{ msg: "Message not found." }] });
});

app.listen(PORT);
