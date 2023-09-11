"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.findByEmailOrName = exports.updateOrCreateUserByGoogleId = exports.updateOrCreateUserByEmail = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const class_validator_1 = require("class-validator");
const CreateUserValidator_1 = require("../Validators/CreateUserValidator");
const UpdateUserValidator_1 = require("../Validators/UpdateUserValidator");
const bcrypt_1 = require("../configs/bcrypt");
const HttpException_1 = require("../exceptions/HttpException");
const users_models_1 = __importDefault(require("../models/users.models"));
const utils_1 = require("../utils");
const getUsers = async () => {
    const users = await users_models_1.default.find({}).select('-password -__v').lean();
    return users;
};
exports.getUsers = getUsers;
const getUserById = async (id) => {
    if (!(0, utils_1.isValidId)(id))
        throw new HttpException_1.HttpException(400, 'Invalid ID');
    const user = await users_models_1.default.findById(id).select('-password -__v').lean();
    return user;
};
exports.getUserById = getUserById;
const createUser = async (body) => {
    const validationErrors = await (0, class_validator_1.validate)(new CreateUserValidator_1.CreateUserValidator(body));
    if (validationErrors.length > 0) {
        const message = validationErrors.map((v) => Object.values(v.constraints || {})).join(',');
        throw new HttpException_1.HttpException(400, message);
    }
    const user = new users_models_1.default(body);
    await user.save();
    return user;
};
exports.createUser = createUser;
const updateUser = async (id, body) => {
    if (!(0, utils_1.isValidId)(id))
        throw new HttpException_1.HttpException(400, 'Invalid ID');
    const validationErrors = await (0, class_validator_1.validate)(new UpdateUserValidator_1.UpdateUserValidator(body), {
        skipUndefinedProperties: true,
    });
    if (validationErrors.length > 0) {
        const message = validationErrors.map((v) => Object.values(v.constraints || {})).join(',');
        throw new HttpException_1.HttpException(400, message);
    }
    if (body.password) {
        const hash = await (0, bcrypt_1.hashPassword)(body.password);
        body.password = hash;
    }
    const user = await users_models_1.default.findOneAndUpdate({ _id: id }, body, { new: true })
        .select('-password -__v')
        .lean();
    return user;
};
exports.updateUser = updateUser;
const updateOrCreateUserByEmail = async (email, body) => {
    const user = await users_models_1.default.findOne({ email }).select('-__v').lean();
    if (user && user.edited)
        return user;
    return await users_models_1.default.findOneAndUpdate({ email }, body, { new: true, upsert: true });
};
exports.updateOrCreateUserByEmail = updateOrCreateUserByEmail;
const updateOrCreateUserByGoogleId = async (googleId, body) => {
    const user = await users_models_1.default.findOne({ googleId }).select('-__v').lean();
    if (user?.edited)
        return user;
    return await users_models_1.default.findOneAndUpdate({ googleId }, body, { new: true, upsert: true });
};
exports.updateOrCreateUserByGoogleId = updateOrCreateUserByGoogleId;
const findByEmailOrName = async (login) => {
    return users_models_1.default.findOne({ $or: [{ email: login }, { name: login }] })
        .select('-__v')
        .lean();
};
exports.findByEmailOrName = findByEmailOrName;
const deleteUser = async (id) => {
    if (!(0, utils_1.isValidId)(id))
        throw new HttpException_1.HttpException(400, 'Invalid ID');
    const user = await users_models_1.default.findByIdAndDelete(id).select('-password -__v').lean();
    return user;
};
exports.deleteUser = deleteUser;
