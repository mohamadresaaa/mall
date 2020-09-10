const baseController = require("./baseController")

module.exports = new class AdminShopController extends baseController {
    async list(req, res, next) {
        try {
            let shops = await this.model.Shop.find({
                $text: {
                    $search: req.query.name
                },
            })

            this.showMessage(res, {
                status: 200,
                shops
            })
        } catch (error) {
            next(error)
        }
    }
}