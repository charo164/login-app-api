"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatResponse = exports.isValidId = void 0;
const mongoose_1 = require("mongoose");
function isValidId(id) {
    return mongoose_1.Types.ObjectId.isValid(id);
}
exports.isValidId = isValidId;
function formatResponse(data, message) {
    return {
        message: message || 'Success',
        data,
    };
}
exports.formatResponse = formatResponse;
