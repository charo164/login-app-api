"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserValidator = void 0;
const class_validator_1 = require("class-validator");
class UpdateUserValidator {
    constructor(source) {
        Object.assign(this, source);
    }
}
exports.UpdateUserValidator = UpdateUserValidator;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(3, 20, { message: 'name must be between 3 and 20 characters' })
], UpdateUserValidator.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email!' })
], UpdateUserValidator.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(8, 20, { message: 'Password must be between 8 and 20 characters' })
], UpdateUserValidator.prototype, "password", void 0);
