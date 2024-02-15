const mysql = require("mysql");

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "alumni",
});

const dbConnect = () =>
	db.connect((err) => {
		if (err) {
			console.error("Error connecting to the database:", err);
		} else {
			console.log("Connected to the database");
		}
	});

module.exports = {
	db,
	dbConnect,
};