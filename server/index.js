const express = require("express");
const { applyMiddlewares } = require("./middlewares");
const { dbConnect } = require("./configs/db");
// const { watch } = require("./configs/db-watcher");
const { routerMiddleware } = require("./middlewares/router");

const app = express();
applyMiddlewares(app);
routerMiddleware(app);

app.listen(3001, () => {
  Promise.resolve(dbConnect())
    .then(() => console.log("Server is running on port 3001"))
    .catch((e) => {
      console.error("Unable to connect to the database", e);
    });
});

// watch().then(() => console.log("Watching events..."));
