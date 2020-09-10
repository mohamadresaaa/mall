const joi = require("joi")

const login = joi.object().keys({
    username: joi.string().required(),
    password: joi.string().required()
});

const register = joi.object().keys({
    fullName: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().min(8).required(),
});

const shop = joi.object().keys({
    name: joi.string().required(),
    address: joi.string().required(),
    description: joi.string().required(),
});

const comment = joi.object().keys({
    content: joi.string().required(),
    shop: joi.string().required()
});


module.exports = {
    login,
    register,
    shop,
    comment
}