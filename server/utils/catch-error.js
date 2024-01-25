class ErrorException extends Error {
	message = "";
	status = 0;
	data;

	constructor(message, status = 500, data) {
		super();

		this.message = message;
		this.status = status;
		this.data = data;
	}
}

const catchError = (err, res) => {
	return res.status(err.status).send({
		message: err.message,
		status: err.status,
		data: err.data,
	});
};

const isError = (response) => {
	return "error" in response;
};

const returnError = (err) => {
	const error = err;

	return {
		error: true,
		message: error.message,
	};
};

module.exports = {
	ErrorException,
	catchError,
	isError,
	returnError,
};
