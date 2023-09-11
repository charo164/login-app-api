"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("../configs/bcrypt");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 55,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024,
    },
    phone: {
        type: String,
        maxlength: 15,
        default: '',
    },
    bio: {
        type: String,
        maxlength: 255,
        default: '',
    },
    picture: {
        type: String,
        default: 'https://res.cloudinary.com/dm7loyjwf/image/upload/v1694345191/login-app/profiles/default-profile.jpg',
    },
    edited: {
        type: Boolean,
        default: false,
    },
    googleId: {
        type: String,
        default: null,
    },
});
UserSchema.pre('save', async function (next) {
    try {
        const user = this;
        const hash = await (0, bcrypt_1.hashPassword)(user.password);
        user.password = hash;
        return next();
    }
    catch (error) {
        return next();
    }
});
UserSchema.methods.comparePassword = async function (password) {
    const user = this;
    const match = await (0, bcrypt_1.comparePassword)(password, user.password);
    return match;
};
const UserModel = (0, mongoose_1.model)('User', UserSchema);
exports.default = UserModel;
