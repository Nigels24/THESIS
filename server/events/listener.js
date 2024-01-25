const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createLog = async ({
  action,
  description,
  registration_id,
  before = {},
  after = {},
}) => {
  try {
    const log = await prisma.activitylogs.create({
      data: {
        after: JSON.stringify(after),
        before: JSON.stringify(before),
        action,
        description,
        registration_id,
        date_created: new Date(),
      },
    });

    return log;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  createLog,
};
