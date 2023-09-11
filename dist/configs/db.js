"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connect = async (uri) => {
    try {
        await mongoose_1.default.connect(uri, {});
        console.log('Connected to MongoDB!');
    }
    catch (error) {
        console.error(error);
    }
};
exports.connect = connect;
