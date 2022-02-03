"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const DroneValidator = [
    express_validator_1.body('name')
        .isString()
        .notEmpty()
        .matches(/^[A-Za-z0-9 - _]+$/)
        .withMessage("Please enter a valid name allowed only letters, numbers,- and _"),
    express_validator_1.body('weight')
        .isFloat()
        .notEmpty()
        .withMessage("THe Weight field is required"),
    express_validator_1.body('serialNumber')
        .isLength({ min: 0, max: 100 })
        .withMessage('Serial Number Should Not Exceed 100 characters'),
    express_validator_1.body('code')
        .isString()
        .notEmpty()
        .matches(/^[A-Z0-9  _]+$/)
        .withMessage("Please enter a valid name allowed only letters, numbers, and underscore"),
    express_validator_1.body('image')
        .isString()
        .notEmpty(),
    express_validator_1.param('droneId')
        .isString()
        .notEmpty(),
];
exports.default = DroneValidator;
