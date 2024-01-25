const { Router } = require("express");
const { LogController } = require("./logs.controller");

const app = Router();

app.get("/", LogController.GET);
module.exports = {
  LogsModel: app,
};
