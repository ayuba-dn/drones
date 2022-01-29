"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DroneCapacityError = void 0;
const custom_error_1 = require("./custom-error");
class DroneCapacityError extends custom_error_1.CustomError {
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
