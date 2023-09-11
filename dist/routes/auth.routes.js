"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controllers_1 = require("../controllers/auth.controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post('/login', auth_controllers_1.signIn);
router.post('/signup', auth_controllers_1.signUp);
router.post('/logout', auth_controllers_1.signOut);
router.get('/me', auth_middleware_1.requireAuth, auth_controllers_1.loggedUser);
router.get('/google/callback', auth_controllers_1.loginWithGoogle);
router.get('/google/loginLink', auth_controllers_1.googleLoginLink);
exports.default = router;
