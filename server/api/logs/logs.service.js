const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const LogService = {
  GET: async () => {
    try {
      const logs = await prisma.activitylogs.findMany();
      return logs;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = {
  LogService,
};
