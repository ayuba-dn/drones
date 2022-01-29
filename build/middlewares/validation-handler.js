"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationHandler = void 0;
const request_validation_error_1 = require("../helpers/errors/request-validation-error");
const express_validator_1 = require("express-validator");
const ValidationHandler = (error, req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        let errorsData = errors.array();
        throw new request_validation_error_1.RequestValidationError(errorsData);
    }
};
exports.ValidationHandler = ValidationHandler;
