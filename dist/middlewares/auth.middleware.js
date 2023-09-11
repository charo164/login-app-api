"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jwt_1 = require("../configs/jwt");
const HttpException_1 = require("../exceptions/HttpException");
const users_services_1 = require("../services/users.services");
const requireAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token)
            return next(new HttpException_1.HttpException(401, 'You are not logged in!'));
        const decoded = (0, jwt_1.verifyToken)(token);
        const user = await (0, users_services_1.getUserById)(decoded.id);
        if (!user)
            return next(new HttpException_1.HttpException(401, 'You are not logged in!'));
        req.user = user;
        return next();
    }
    catch (error) {
        return next(error);
    }
};
exports.requireAuth = requireAuth;
