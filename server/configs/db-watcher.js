const { createConnection } = require("mysql");

const MySQLEvents = require("@rodrigogs/mysql-events");

const { Method } = require("./../utils/method");

const connection = createConnection({
  host: "localhost",
  user: "repl",
  password: "password",
});

const watch = async () => {
  const instance = new MySQLEvents(connection, {
    startAtEnd: true,
    excludedSchemas: {
      mysql: true,
    },
  });

  await instance.start();

  instance.addTrigger({
    name: "TEST",
    expression: "*",
    statement: MySQLEvents.STATEMENTS.ALL,
    onEvent: async (event) => {
      console.log("events", event);
      // You will receive the events here
      await Method.ActivityLogs(event);
    },
  });

  instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
  instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
};

module.exports = {
  watch,
};
