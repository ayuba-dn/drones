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
const base_route_1 = require("../helpers/base-route");
const registration_controller_1 = __importDefault(require("../controllers/registration-controller"));
const drone_validation_handler_1 = __importDefault(require("../middlewares/drone-validation-handler"));
class RegistrationRoutes extends base_route_1.BaseRoute {
    constructor(app) {
        super(app);
    }
    setUpRoutes() {
        this.app.route("/courses")
            .get((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            registration_controller_1.default.getRegistrations().then(registration => {
                return res.status(201).send(registration);
            }).catch(error => {
                next(error);
            });
        }))
            .post(drone_validation_handler_1.default.create, (req, res, next) => {
            registration_controller_1.default.create(req, res).then(registration => {
                return res.status(201).send(registration);
            }).catch(error => {
                next(error);
            });
        })
            .put(drone_validation_handler_1.default.create, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = "registration updated";
            return res.send(response);
        }))
            .delete((req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = "TO DO>>>>>registration deleted";
            return res.send(response);
        }));
        this.app.route("/registrations/:studentId/students")
            .post(drone_validation_handler_1.default.loadMedication, (req, res, next) => {
            DroneController.load(req, res).then(drone => {
                return res.status(200).send(drone);
            }).catch(error => {
                next(error);
            });
        })
            .get(drone_validation_handler_1.default.getMedications, (req, res, next) => {
            DroneController.medications(req, res).then(medications => {
                return res.status(200).send(medications);
            }).catch(error => {
                next(error);
            });
        });
        this.app.route("/drones/:droneId/battery")
            .get((req, res, next) => {
            DroneController.checkBattery(req, res).then(drone => {
                res.status(200).send(drone);
            }).catch(error => {
                next(error);
            });
        });
        this.app.route("/drones/available/")
            .get((req, res, next) => {
            DroneController.availableDrones(req, res).then(drones => {
                res.status(200).send(drones);
            }).catch(error => {
                next(error);
            });
        });
        return this.app;
    }
}
exports.default = RegistrationRoutes;
