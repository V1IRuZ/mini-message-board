const express = require("express");
const path = require("node:path");

const app = express();

const indexRouter = require("./routes/indexRouter.js");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }

  console.log("server listening");
});
