"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggedUser = exports.loginWithGoogle = exports.googleLoginLink = exports.signOut = exports.signUp = exports.signIn = void 0;
const bcrypt_1 = require("../configs/bcrypt");
const jwt_1 = require("../configs/jwt");
const HttpException_1 = require("../exceptions/HttpException");
const auth_services_1 = require("../services/auth.services");
const users_services_1 = require("../services/users.services");
const utils_1 = require("../utils");
const constants_1 = require("../utils/constants");
const signIn = async (req, res, next) => {
    try {
        const user = await (0, users_services_1.findByEmailOrName)(req.body.login);
        if (!user)
            return next(new HttpException_1.HttpException(400, 'Login or password incorrect!'));
        const match = await (0, bcrypt_1.comparePassword)(req.body.password, user.password || '#');
        if (!match)
            return next(new HttpException_1.HttpException(400, 'Login or password incorrect!'));
        const token = (0, jwt_1.generateToken)({ id: user._id });
        return res.json((0, utils_1.formatResponse)(token, 'User logged in successfully!'));
    }
    catch (error) {
        return next(error);
    }
};
exports.signIn = signIn;
const signUp = async (req, res, next) => {
    try {
        const user = await (0, users_services_1.createUser)(req.body);
        const token = (0, jwt_1.generateToken)({ id: user._id });
        return res.status(201).json((0, utils_1.formatResponse)(token, 'User created successfully!'));
    }
    catch (error) {
        return next(error);
    }
};
exports.signUp = signUp;
const signOut = async (req, res, next) => {
    try {
        res.clearCookie(constants_1.AUTH_COOKIE_NAME);
        return res.json((0, utils_1.formatResponse)({}, 'User logged out successfully!'));
    }
    catch (error) {
        return next(error);
    }
};
exports.signOut = signOut;
const googleLoginLink = async (req, res, next) => {
    try {
        const loginLink = await (0, auth_services_1.getGoogleLoginLink)();
        return res.json((0, utils_1.formatResponse)(loginLink, 'Google login link generated successfully!'));
    }
    catch (error) {
        return res.redirect(`${process.env.CLIENT_URL}/auth/login?success=true&msg=Error on getting google login link!`);
    }
};
exports.googleLoginLink = googleLoginLink;
const loginWithGoogle = async (req, res, next) => {
    try {
        if (req.query.error) {
            return res.redirect(`${process.env.CLIENT_URL}/auth/login?success=true&msg=Error on login with Google!`);
        }
        const { code } = req.query;
        if (!code) {
            return res.redirect(`${process.env.CLIENT_URL}/auth/login?success=true&msg=Error on login with Google!`);
        }
        const user = await (0, auth_services_1.getGoogleUserInfos)(code);
        const userExists = await (0, users_services_1.updateOrCreateUserByGoogleId)(user.id, {
            name: user.name,
            email: user.email,
            picture: user.picture,
            googleId: user.id,
        });
        if (!userExists) {
            return res.redirect(`${process.env.CLIENT_URL}/auth/login?success=true&msg=Error on login with Google!`);
        }
        const token = (0, jwt_1.generateToken)({ id: userExists._id });
        return res.redirect(`${process.env.CLIENT_URL}/auth/login?success=true&token=${token}`);
    }
    catch (error) {
        console.log(error);
        return res.redirect(`${process.env.CLIENT_URL}/auth/login?success=true&msg=Error on login with Google!`);
    }
};
exports.loginWithGoogle = loginWithGoogle;
const loggedUser = (req, res, next) => {
    try {
        const user = req.user;
        return res.json((0, utils_1.formatResponse)(user, 'User logged in successfully!'));
    }
    catch (error) {
        return next(error);
    }
};
exports.loggedUser = loggedUser;
