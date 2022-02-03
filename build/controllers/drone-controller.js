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
const drone_repository_1 = __importDefault(require("../repositories/drone-repository"));
const drone_capacity_error_1 = require("../helpers/errors/drone-capacity-error");
const resource_notfound_error_1 = require("../helpers/errors/resource-notfound-error");
const internal_server_error_1 = require("../helpers/errors/internal-server-error");
class DroneController {
    constructor() {
        this.droneAvailabilityErrorMsg = '';
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let drone = yield drone_repository_1.default.create(req.body);
                return drone;
            }
            catch (error) {
                //log error here
                console.log(error);
                throw new internal_server_error_1.InternalServerError();
            }
        });
        this.load = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let medication = req.body;
            let updatedDrone = null;
            let drone = null;
            //check the drones availability first
            yield drone_repository_1.default.findOne(req.params.droneId).then(returnedDrone => {
                drone = returnedDrone;
            }).catch(() => {
                throw new internal_server_error_1.InternalServerError("unable to load drone");
            });
            if (drone) {
                if (!this.droneIsAvailable(drone, medication)) {
                    throw new drone_capacity_error_1.DroneCapacityError(this.droneAvailabilityErrorMsg);
                }
            }
            else {
                throw new resource_notfound_error_1.ResourceNotFoundError("drone with the id passed not found");
            }
            yield drone_repository_1.default.load(req.body, req.params.droneId).then(updated => {
                updatedDrone = updated;
            }).catch(error => {
                throw new internal_server_error_1.InternalServerError();
            });
            return updatedDrone;
        });
        this.droneIsAvailable = (drone, medication) => {
            //check battery
            if (drone.battery < 0.25) {
                this.droneAvailabilityErrorMsg = "drone battery is low, please recharge and try again";
                return false;
            }
            //check weight
            //get total weight loaded on the drone
            let availableWeight;
            if (drone.medications.length > 0) {
                let totalWeightLoaded = drone.medications.reduce((a, b) => a + (b['weight'] || 0), 0);
                availableWeight = drone.weight - totalWeightLoaded;
            }
            else {
                availableWeight = drone.weight;
            }
            //compare weights
            if (medication.weight > availableWeight) {
                this.droneAvailabilityErrorMsg = "the weight is beyond what this drone can carry";
                return false;
            }
            return true;
        };
        this.availableDrones = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let drones = yield drone_repository_1.default.find({ state: "IDLE" });
                return drones;
            }
            catch (error) {
                //log error here
                console.log(error);
                throw new internal_server_error_1.InternalServerError();
            }
        });
        this.checkBattery = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let drone = yield drone_repository_1.default.findOneWithProjection(req.params.droneId, "battery");
                return drone;
            }
            catch (error) {
                //log error here
                console.log(error);
                throw new internal_server_error_1.InternalServerError();
            }
        });
        this.medications = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let medications = yield drone_repository_1.default.findOneWithProjection(req.params.droneId, "medications");
                return medications;
            }
            catch (error) {
                //log error here
                console.log(error);
                throw new internal_server_error_1.InternalServerError();
            }
        });
    }
    getDrones() {
        return __awaiter(this, void 0, void 0, function* () {
            return drone_repository_1.default.getAll();
        });
    }
}
exports.default = new DroneController();
