"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnectionError = void 0;
const custom_error_1 = require("./custom-error");
class DatabaseConnectionError extends custom_error_1.CustomError {
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
