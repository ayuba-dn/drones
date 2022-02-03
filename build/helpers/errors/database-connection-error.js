"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnectionError = void 0;
const base_error_1 = require("./base-error");
class DatabaseConnectionError extends base_error_1.BaseError {
    constructor(error) {
        super("error connecting database");
        this.error = error;
        this.reason = "Database not connected";
        this.statusCode = 500;
        this.serializeErrors = () => {
            return [
                { message: this.reason }
            ];
        };
        //We do this when extending a built in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
}
exports.DatabaseConnectionError = DatabaseConnectionError;
