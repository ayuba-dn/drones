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
        this.load = (medication, droneId) => __awaiter(this, void 0, void 0, function* () {
            return Drone.findByIdAndUpdate(droneId, { $push: { medications: medication } }, { new: true });
        });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            return Drone.find({});
        });
        this.findOne = (droneId) => __awaiter(this, void 0, void 0, function* () {
            return Drone.findById(droneId);
        });
        this.findOneWithProjection = (droneId, projection) => __awaiter(this, void 0, void 0, function* () {
            console.log(projection);
            return Drone.findById(droneId).select(projection);
        });
        this.find = (query) => __awaiter(this, void 0, void 0, function* () {
            return Drone.find(query);
        });
    }
}
exports.default = new RegistrationRepository();
