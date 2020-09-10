const baseController = require("./baseController")
const {
    ErrorMessage
} = require("../lib/messages")

module.exports = new class AuthController extends baseController {
    async register(req, res, next) {
        try {
            //check user exists with username
            let user = await this.model.User.findOne({
                username: req.body.username
            });

            // if user exists, handle it
            if (user)
                throw new ErrorMessage('Exists Data', 'Username is already', 422)

            // create user
            await this.model.User({
                ...req.body
            }).save();

            // return message and statusCode
            return this.showMessage(res, {
                status: 200,
                message: "Please refer to your email to activate your account"
            })
        } catch (error) {
            next(error);
        }

    }

    async login(req, res, next) {
        try {
            // get username and password from req.body
            const {
                username,
                password
            } = req.body

            // find user with email and username
            let user = await this.model.User.findOne({
                username
            });

            // if not, handle it
            if (!user)
                throw new ErrorMessage('Unauthorized User', 'The Email or Password is not valid', 401)

            // check if the password is correct => if not, handle it
            if (!await user.comparePassword(password))
                throw new ErrorMessage('Unauthorized User', 'Password is not valid', 401);

            // otherwise, return user
            return this.showMessage(res, {
                status: 200,
                user: await user.toAuthJson()
            });
        } catch (error) {
            next(error);
        }

    }
}