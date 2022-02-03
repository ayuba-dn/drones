"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DroneCapacityError = void 0;
const base_error_1 = require("./base-error");
class DroneCapacityError extends base_error_1.BaseError {
    constructor(error) {
        super("Drone Validation Error");
        this.error = error;
        this.statusCode = 400;
        this.serializeErrors = () => {
            let formattedErrors = [{ message: this.error }];
            return formattedErrors;
        };
        //We do this when extending a built in class
        Object.setPrototypeOf(this, DroneCapacityError.prototype);
    }
}
exports.DroneCapacityError = DroneCapacityError;
