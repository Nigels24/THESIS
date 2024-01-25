const { EventsModel } = require("./../api/events/events.model");
const { NewsModel } = require("./../api/news/news.model");
const {
  JobOpportunitiesModel,
} = require("./../api/job-opportunities/job-opportunities.model");
const {
  RegistrationModel,
} = require("./../api/regisration/registration.model");
const { StoriesModel } = require("./../api/stories/stories.model");
const { upload } = require(".");
const { AuthModel } = require("./../api/auth/auth.model");
const { LogsModel } = require("../api/logs/logs.model");

const routerMiddleware = (app) => {
  app.use("/events", EventsModel);
  app.use("/news", NewsModel);
  app.use("/jobopp", JobOpportunitiesModel);
  app.use("/stories", StoriesModel);
  app.use("/upload", upload.single("images"), StoriesModel);
  app.use("/register", upload.single("avatar"), RegistrationModel);
  app.use("/update", upload.single("avatar"), RegistrationModel);
  app.use("/auth", AuthModel);
  app.use("/logs", LogsModel);
};

module.exports = {
  routerMiddleware,
};
