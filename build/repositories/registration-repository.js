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
Object.defineProperty(exports, "__esModule", { value: true });
const registration_model_1 = require("../models/registration-model");
class RegistrationRepository {
    constructor() {
        this.create = (RegistrationData) => __awaiter(this, void 0, void 0, function* () {
            return new registration_model_1.Registration(RegistrationData).save();
        });
        /*
             
             load = async (registration: RegistrationType, studentid: String): Promise<RegistrationDoc | null> => {
        
               return Registration.findByIdAndUpdate(studentid,{ $push: { medications: medication } },{new: true});
             }
         */
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            return registration_model_1.Registration.find({});
        });
        this.findOne = (RegistrationId) => __awaiter(this, void 0, void 0, function* () {
            return registration_model_1.Registration.findById(RegistrationId);
        });
        this.findOneWithMatric = (RegistrationId, projection) => __awaiter(this, void 0, void 0, function* () {
            console.log(projection);
            return registration_model_1.Registration.findById(RegistrationId).select(projection);
        });
        this.find = (query) => __awaiter(this, void 0, void 0, function* () {
            return registration_model_1.Registration.find(query);
        });
    }
}
exports.default = new RegistrationRepository();
