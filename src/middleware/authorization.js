const jwt = require("jsonwebtoken")
const models = require("../models")
const {
    ErrorMessage
} = require("../lib/messages")

module.exports = async (req, res, next) => {
    try {
        // give token
        let token = req.headers["authorization"];

        // if not and check invalid token, handle it
        if (!token)
            throw new ErrorMessage("Unauthorized", "Authentication failed", 401);

        // verify token
        let payload = await jwt.verify(token, "secretKey");

        // find user
        let user = await models.User.findById(payload.sub);

        // if not, handle it
        if (!user)
            throw new ErrorMessage("Unauthorized", "Authentication failed", 401);

        req.user = user;
        next();
    } catch (error) {
        next(new ErrorMessage("Unauthorized", "Authentication failed", 401));
    }
};