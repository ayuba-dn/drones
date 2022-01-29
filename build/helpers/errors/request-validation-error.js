"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const custom_error_1 = require("./custom-error");
class RequestValidationError extends custom_error_1.CustomError {
    constructor(errors) {
        super("Validation Error");
        this.errors = errors;
        this.statusCode = 400;
        this.serializeErrors = () => {
            let formattedErrors = this.errors.map(error => {
                return { message: error.msg, field: error.param };
            });
            return formattedErrors;
        };
        //We do this when extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
}
exports.RequestValidationError = RequestValidationError;
