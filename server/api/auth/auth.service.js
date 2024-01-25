const { PrismaClient } = require("@prisma/client");
const { returnError } = require("../../utils/catch-error");
const prisma = new PrismaClient();

const AuthService = {
	LOGIN: async ({ email }) => {
		try {
			const registered = await prisma.registration.findFirst({
				where: { email },
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
