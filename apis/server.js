const express = require("express");
const cors = require("cors");
const postsRouter = require("./posts");

const app = express();

app.use(cors());
app.use(express.json());
app.use(postsRouter);

module.exports = app;