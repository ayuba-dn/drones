"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_validation_error_1 = require("../helpers/errors/request-validation-error");
const express_validator_1 = require("express-validator");
const express_validator_2 = require("express-validator");
class StudentValidations {
    constructor() {
        this.regex = new RegExp(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/);
        this.create = [
            (0, express_validator_2.body)('surname')
                .notEmpty()
                .withMessage("surname is required")
                .isString(),
            (0, express_validator_2.body)('firstname')
                .notEmpty()
                .withMessage("firstname is required")
                .isString(),
            (0, express_validator_2.body)('middlename')
                .notEmpty()
                .withMessage("middlename is required")
                .isString(),
            (0, express_validator_2.body)('department')
                .notEmpty()
                .withMessage("department is required")
                .isString(),
            (0, express_validator_2.body)('matricno')
                .notEmpty()
                .withMessage("Matriculation Number is required")
                .isString(),
            (0, express_validator_2.body)('gender')
                .notEmpty()
                .withMessage("Gender is required")
                .isString(),
            (0, express_validator_2.body)('level')
                .notEmpty()
                .withMessage('Level is Required'),
            // body('state')
            // .notEmpty()
            // .withMessage("The drone state is required")
            // .isIn(['IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING'])
            // .withMessage("Invalid drone state ")
            // .isString(),
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
exports.default = new StudentValidations();
