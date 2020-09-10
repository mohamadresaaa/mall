const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {
    Schema,
    model
} = require("mongoose")

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        // hashing password
        this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(15));
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJWT = async function () {
    return await jwt.sign({
        sub: this._id
    }, "secretKey");
};

userSchema.methods.toAuthJson = async function () {
    return {
        avatar: this.avatar,
        email: this.email,
        fullName: this.fullName,
        username: this.username,
        role: this.role,
        bio: this.bio,
        birthday: this.birthday ? this.birthday.toISOString().slice(0, 10) : this.birthday,
        twoFactorAuth: this.twoFactorAuth,
        token: await this.generateJWT()
    }
};

module.exports = model("User", userSchema);