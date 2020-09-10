const {
    Schema,
    model
} = require("mongoose")

const shopSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

shopSchema.index({
    name: 'text',
})

module.exports = model("Shop", shopSchema);