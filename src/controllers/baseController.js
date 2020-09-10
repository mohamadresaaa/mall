const autoBind = require("auto-bind");
const models = require("../models")

module.exports = class BaseController {
	constructor() {
		// binding methods
		autoBind(this);

		this.model = models
	}

	// show public message
	showMessage(res, data) {
		res.status(data.status).json(data);
	}
};