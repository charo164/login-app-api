"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const db_1 = require("./configs/db");
const HttpException_1 = require("./exceptions/HttpException");
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
(0, dotenv_1.config)();
(0, db_1.connect)(process.env.MONGODB_URI || '');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
const PORT = Number(process.env.PORT) || 3333;
app.use('/api/users', users_routes_1.default);
app.use('/api/auth', auth_routes_1.default);
app.use((req, res, next) => next(new HttpException_1.HttpException(404, 'Not Found')));
app.use(error_middleware_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
