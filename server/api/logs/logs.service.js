const { TABLES } = require("../../constants");
const { PromiseQuery } = require("../../utils/promise-query");

const LogService = {
  GET: async () => {
    try {
      const logs = await PromiseQuery({
        query: `SELECT * FROM ${TABLES.ACTIVITYLOGS}`,
      });
      return logs;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = {
  LogService,
};
