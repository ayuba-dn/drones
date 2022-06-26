"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const registration_repository_1 = __importDefault(require("../repositories/registration-repository"));
const internal_server_error_1 = require("../helpers/errors/internal-server-error");
//import Medication from '../models/types/medication'
class RegistrationController {
    constructor() {
        this.registrationAvailabilityErrorMsg = '';
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let registration = yield registration_repository_1.default.create(req.body);
                return registration;
            }
            catch (error) {
                //log error here
                console.log(error);
                throw new internal_server_error_1.InternalServerError();
            }
        });
    }
    getRegistrations() {
        return __awaiter(this, void 0, void 0, function* () {
            return registration_repository_1.default.getAll();
        });
    }
}
exports.default = new RegistrationController();
