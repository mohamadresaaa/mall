const {
    Schema,
    model
} = require("mongoose")

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        default: null
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: "Shop",
        default: undefined
    }
}, {
    toJSON: {
        virtuals: true
    }
});

module.exports = model("Comment", commentSchema);