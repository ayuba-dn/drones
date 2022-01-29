"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const DroneValidator = [
    (0, express_validator_1.body)('weight')
        .isFloat({ min: 0, max: 500 }),
    (0, express_validator_1.body)('battery')
        .isFloat(),
    (0, express_validator_1.body)('serialNumber')
        .isLength({ min: 0, max: 100 })
        .withMessage('Serial Number Should Not Exceed 100 characters'),
    (0, express_validator_1.body)('model')
        .isString(),
    (0, express_validator_1.body)('state')
        .isString(),
];
exports.default = DroneValidator;
