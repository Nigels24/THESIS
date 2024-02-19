const { TABLES } = require("../constants");
const { PromiseQuery } = require("../utils/promise-query");

const createLog = async ({
  action,
  description,
  registration_id,
  before = {},
  after = {},
}) => {
  try {
    const log = await PromiseQuery({
      query: `INSERT INTO ${TABLES.ACTIVITYLOGS} (after, before, action, description, registration_id, date_created) VALUES (?,?,?,?,?,?)`,
      values: [
        JSON.stringify(after),
        JSON.stringify(before),
        action,
        description,
        registration_id,
        new Date(),
      ],
    });

    return log;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  createLog,
};
