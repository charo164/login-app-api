"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateKeyError = (err) => {
    const field = Object.keys(err.keyValue);
    return `${field} already exists.`;
};
const handleValidationError = (err) => {
    let errors = Object.values(err.errors).map((el) => el.message);
    return errors.join(',');
};
const errorMiddleware = (error, req, res, next) => {
    try {
        if (error.name === 'ValidationError') {
            error.code = 400;
            error.message = handleValidationError(error);
        }
        if (error.code && error.code == 11000) {
            error.status = 409;
            error.message = handleDuplicateKeyError(error);
        }
        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        console.log(message);
        res.status(status).json({ errors: message.split(','), message });
    }
    catch (error) {
        next(error);
    }
};
exports.default = errorMiddleware;
