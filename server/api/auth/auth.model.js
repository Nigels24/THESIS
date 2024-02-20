const { Router } = require("express");

const { AuthController } = require("./auth.controller");

const app = Router();

app.post("/", AuthController.LOGIN);

module.exports = {
  AuthModel: app,
};
