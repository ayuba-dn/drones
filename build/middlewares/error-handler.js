"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const custom_error_1 = require("../helpers/errors/custom-error");
const errorHandler = (error, req, res, next) => {
    if (error instanceof custom_error_1.CustomError) {
        return res.status(error.statusCode).send({ errors: error.serializeErrors() });
    }
    else {
        console.log("Unknown Error");
        return res.status(500).send({ errors: [{ message: "Something Went Wrong" }] });
    }
};
exports.errorHandler = errorHandler;
