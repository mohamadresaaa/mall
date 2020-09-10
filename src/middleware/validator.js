const {
    ErrorMessage
} = require("../lib/messages")

// validation data with joi
module.exports = schema => {
    return (req, res, next) => {
        let {
            error,
            value
        } = schema.validate(req.body);
        if (error) {
            throw new ErrorMessage("Invalid Data", error.details[0].message.replace(/(\")+/g, ""), 422)
        }
        if (!req.value) req.value = {};
        req.value["body"] = value;
        next();
    }
};