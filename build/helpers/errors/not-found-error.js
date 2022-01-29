"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const custom_error_1 = require("./custom-error");
class NotFoundError extends custom_error_1.CustomError {
    constructor() {
        super("Route Not Found");
        this.reason = "Route Not Found";
        this.statusCode = 404;
        this.serializeErrors = () => {
            return [
                { message: this.reason }
            ];
        };
        //We do this when extending a built in class
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
exports.NotFoundError = NotFoundError;
