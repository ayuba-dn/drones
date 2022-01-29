"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceNotFoundError = void 0;
const custom_error_1 = require("./custom-error");
class ResourceNotFoundError extends custom_error_1.CustomError {
    constructor(error) {
        super(error);
        this.error = error;
        this.statusCode = 404;
        this.serializeErrors = () => {
            let formattedErrors = [{ message: this.error }];
            return formattedErrors;
        };
        //We do this when extending a built in class
        Object.setPrototypeOf(this, ResourceNotFoundError.prototype);
    }
}
exports.ResourceNotFoundError = ResourceNotFoundError;
