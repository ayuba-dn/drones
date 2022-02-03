"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const base_error_1 = require("./base-error");
class BadRequestError extends base_error_1.BaseError {
    //reason: string
    constructor(reason) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
        this.serializeErrors = () => {
            return [
                {
                    message: this.reason
                }
            ];
        };
        // this.reason = reason
        //We do this when extending a built in class
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
exports.BadRequestError = BadRequestError;
