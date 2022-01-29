"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = void 0;
const custom_error_1 = require("./custom-error");
class InternalServerError extends custom_error_1.CustomError {
    constructor(error) {
        super("Internal Server Error");
        this.statusCode = 500;
        this.serializeErrors = () => {
            let formattedErrors = [{ message: this.error }];
            return formattedErrors;
        };
        this.error = error ? error : "Internal Server Error";
        //We do this when extending a built in class
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}
exports.InternalServerError = InternalServerError;
