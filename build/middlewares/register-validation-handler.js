"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_validation_error_1 = require("../helpers/errors/request-validation-error");
const express_validator_1 = require("express-validator");
const express_validator_2 = require("express-validator");
class RegisterValidations {
    constructor() {
        this.regex = new RegExp(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/);
        this.create = [
            (0, express_validator_2.body)('registrationNumber')
                .notEmpty()
                .withMessage("registration number is required")
                .isString(),
            (0, express_validator_2.body)('registrant')
                .notEmpty()
                .withMessage("student is required")
                .isString(),
            (0, express_validator_2.body)('session')
                .notEmpty()
                .withMessage("session is required")
                .isString(),
            (0, express_validator_2.body)('semester')
                .notEmpty()
                .withMessage("semester is required")
                .isString(),
            (0, express_validator_2.body)('courses')
                .notEmpty()
                .withMessage("course list is required")
                .isArray(),
            (req, res, next) => {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    let errorsData = errors.array();
                    throw new request_validation_error_1.RequestValidationError(errorsData);
                }
                next();
            }
        ];
        this.getMedications = [
            (0, express_validator_2.param)('droneId')
                .isString()
                .notEmpty()
                .withMessage("drone ID is required"),
            (req, res, next) => {
                const errors = (0, express_validator_1.validationResult)(req);
                console.log("data", req.body);
                if (!errors.isEmpty()) {
                    let errorsData = errors.array();
                    throw new request_validation_error_1.RequestValidationError(errorsData);
                }
                next();
            }
        ];
    }
}
exports.default = new RegisterValidations();
