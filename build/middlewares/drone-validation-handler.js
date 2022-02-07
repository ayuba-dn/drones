"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_validation_error_1 = require("../helpers/errors/request-validation-error");
const express_validator_1 = require("express-validator");
const express_validator_2 = require("express-validator");
class DroneValidations {
    constructor() {
        this.regex = new RegExp(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/);
        this.loadMedication = [
            (0, express_validator_2.body)('name')
                .isString()
                .notEmpty()
                .withMessage("Medication Name is Required")
                .matches(this.regex)
                .withMessage("Please enter a valid name allowed only letters, numbers,- and _"),
            (0, express_validator_2.body)('weight')
                .isFloat()
                .notEmpty()
                .withMessage("THe Weight field is required"),
            (0, express_validator_2.body)('code')
                .isString()
                .notEmpty()
                .withMessage("Medication Code is Required")
                .matches(this.regex)
                .withMessage("Please enter a valid code allowed only letters, numbers, and underscore"),
            (0, express_validator_2.body)('image')
                .isString(),
            (0, express_validator_2.param)('droneId')
                .isString()
                .notEmpty()
                .withMessage("drone ID is required"),
            (req, res, next) => {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    let errorsData = errors.array();
                    throw new request_validation_error_1.RequestValidationError(errorsData);
                }
                next();
            }
        ];
        this.create = [
            (0, express_validator_2.body)('weight')
                .notEmpty()
                .withMessage("the drone weight is required")
                .isFloat({ min: 0, max: 500 }),
            (0, express_validator_2.body)('battery')
                .notEmpty()
                .withMessage("please enter battery capacity")
                .isFloat(),
            (0, express_validator_2.body)('serialNumber')
                .notEmpty()
                .isLength({ min: 0, max: 100 })
                .withMessage('Serial Number Should Not Exceed 100 characters'),
            (0, express_validator_2.body)('model')
                .notEmpty()
                .withMessage("the drone model is required")
                .isString(),
            (0, express_validator_2.body)('state')
                .notEmpty()
                .withMessage("The drone state is required")
                .isIn(['IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING'])
                .withMessage("Invalid drone state ")
                .isString(),
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
exports.default = new DroneValidations();
