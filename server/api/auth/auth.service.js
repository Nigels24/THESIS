const { returnError } = require("../../utils/catch-error");

const { PromiseQuery } = require("./../../utils/promise-query");
const { TABLES } = require("./../../constants");

const AuthService = {
  LOGIN: async ({ email }) => {
    try {
      const [registered] = await PromiseQuery({
        query: `SELECT * FROM ${TABLES.REGISTRATION} WHERE email=?`,
        values: [email],
      });

      return registered;
    } catch (err) {
      returnError(err);
    }
  },
};

module.exports = {
  AuthService,
};
