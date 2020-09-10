const baseController = require("./baseController")

module.exports = new class CommentController extends baseController {
    async create(req, res, next) {
        try {
            // create comment
            await this.model.Comment({
                ...req.body,
                user: req.user.id
            }).save();

            return this.showMessage(res, {
                status: 200,
                message: "create a new Comment"
            })
        } catch (error) {
            next(error)
        }
    }
}