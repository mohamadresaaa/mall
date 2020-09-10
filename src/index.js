const app = require("./app");
const {
	createServer
} = require("http");
const mongoose = require("mongoose")

const start = () => {
	mongoose.connect("mongodb://127.0.0.1:27017/apiDB", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	}, (err) => err ? console.log(err.message) : console.log("Database connected"));

	createServer(app).listen(3000, () =>
		console.log("server running on port 3000")
	);
};

start();