const {
    PublicErrorMessage,
    ErrorMessage
} = require("../lib/messages")

const apiErrorHandler = (err, req, res, next) => {
    switch (process.env.NODE_ENV) {
        case "production":
            return res.status(err.status ? err.status : 500).json(new PublicErrorMessage(err));

        default:
            return res.status(err.status ? err.status : 500).json({
                message: err.message,
                stack: err.stack
            });
    }
};

const apiError404 = (req, res, next) => {
    try {
        throw new PublicErrorMessage(ErrorMessage.errNotFound("route"));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    apiErrorHandler,
    apiError404
}