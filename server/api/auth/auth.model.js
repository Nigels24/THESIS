const { Router } = require("express");

const { AuthController } = require("./auth.controller");

const app = Router();

// base url niya is /auth tan.awon nimo sa middleware route.js kung unsa iyang basin url
app.post("/", AuthController.LOGIN);

module.exports = {
  AuthModel: app,
};
