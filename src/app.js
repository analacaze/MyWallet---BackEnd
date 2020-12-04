const express = require("express");
const cors = require("cors");
const app = express();

const usersController = require("../controllers/usersControler");

app.use(cors());
app.use(express.json());

app.post("/api/users/sign-up", usersController.postSignUp);
app.post("/api/users/sign-in", usersController.postSignIn);

module.exports = app;

