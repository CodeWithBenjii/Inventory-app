const express = require("express");
const morgan = require("morgan");
const users = require("./routes/users/index");

const app = express();
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", users);

module.exports = app;
