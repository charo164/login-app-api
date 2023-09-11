"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenFromCookies = exports.getTokenFromHeaders = exports.decodeToken = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload) => {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new Error('JWT secret is not defined');
    const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '7d' });
    return token;
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new Error('JWT secret is not defined');
    const payload = jsonwebtoken_1.default.verify(token, secret);
    return payload;
};
exports.verifyToken = verifyToken;
const decodeToken = (token) => {
    const payload = jsonwebtoken_1.default.decode(token);
    return payload;
};
exports.decodeToken = decodeToken;
const getTokenFromHeaders = (headers) => {
    const token = headers.authorization;
    if (!token)
        throw new Error('No token provided');
    return token;
};
exports.getTokenFromHeaders = getTokenFromHeaders;
const getTokenFromCookies = (cookies) => {
    const token = cookies.token;
    if (!token)
        throw new Error('No token provided');
    return token;
};
exports.getTokenFromCookies = getTokenFromCookies;
