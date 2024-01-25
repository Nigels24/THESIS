const { catchError, ErrorException } = require("../../utils/catch-error");
const { LogService } = require("./logs.service");

const LogController = {
  GET: async (req, res) => {
    try {
      const logs = await LogService.GET();
      if (!logs)
        throw new ErrorException("Something went wrong, Failed to fetch!");
      res.status(201).send({ message: "Logs Successfully fetch!", data: logs });
    } catch (err) {
      catchError(err, res);
    }
  },
};

module.exports = {
  LogController,
};
