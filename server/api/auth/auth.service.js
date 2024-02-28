const { returnError } = require("../../utils/catch-error");
const { PromiseQuery } = require("./../../utils/promise-query");
const { TABLES } = require("./../../constants");

const AuthService = {
  LOGIN: async ({ email }) => {
    try {
      // Fetch user with the provided email and verified status
      const [registered] = await PromiseQuery({
        query: `SELECT * FROM ${TABLES.REGISTRATION} WHERE email=? AND status='verified'`,
        values: [email],
      });

      return registered;
    } catch (err) {
      returnError(err);
    }
  },
  USER_ID: async ({ id }) => {
    try {
      const [registered] = await PromiseQuery({
        query: `SELECT * FROM ${TABLES.REGISTRATION} WHERE id= ?`,
        values: [id],
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
