"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.update = exports.create = exports.show = exports.index = void 0;
const users_services_1 = require("../services/users.services");
const utils_1 = require("../utils");
const index = async (req, res, next) => {
    try {
        const users = await (0, users_services_1.getUsers)();
        res.json((0, utils_1.formatResponse)(users));
    }
    catch (error) {
        next(error);
    }
};
exports.index = index;
const show = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await (0, users_services_1.getUserById)(id);
        res.json((0, utils_1.formatResponse)(user));
    }
    catch (error) {
        next(error);
    }
};
exports.show = show;
const create = async (req, res, next) => {
    try {
        const user = await (0, users_services_1.createUser)(req.body);
        res.status(201).json((0, utils_1.formatResponse)(user));
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await (0, users_services_1.updateUser)(id, { ...req.body, edited: true });
        res.json((0, utils_1.formatResponse)(user));
    }
    catch (error) {
        next(error);
    }
};
exports.update = update;
const destroy = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await (0, users_services_1.deleteUser)(id);
        res.json((0, utils_1.formatResponse)(user));
    }
    catch (error) {
        next(error);
    }
};
exports.destroy = destroy;
