"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controllers_1 = require("../controllers/users.controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.get('/', auth_middleware_1.requireAuth, users_controllers_1.index);
router.get('/:id', auth_middleware_1.requireAuth, users_controllers_1.show);
router.post('/', auth_middleware_1.requireAuth, users_controllers_1.create);
router.put('/:id', auth_middleware_1.requireAuth, users_controllers_1.update);
router.delete('/:id', auth_middleware_1.requireAuth, users_controllers_1.destroy);
exports.default = router;
