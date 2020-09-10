const baseController = require("./baseController")
const {
    ErrorMessage
} = require("../lib/messages")

module.exports = new class ShopController extends baseController {
    async create(req, res, next) {
        try {
            // check shop exists with name
            let shop = await this.model.Shop.findOne({
                name: req.body.name
            });

            // if user exists, handle it
            if (shop)
                throw new ErrorMessage('Exists Data', 'Shop is already', 422)

            // create shop
            await this.model.Shop({
                ...req.body,
                user: req.user.id
            }).save();

            return this.showMessage(res, {
                status: 200,
                message: "create a new shop"
            })
        } catch (error) {
            next(error)
        }
    }
}