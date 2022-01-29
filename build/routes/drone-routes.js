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
const drone_controller_1 = __importDefault(require("../controllers/drone-controller"));
const drone_validator_1 = __importDefault(require("../helpers/validators/drone-validator"));
const medication_validator_1 = __importDefault(require("../helpers/validators/medication-validator"));
const validation_handler_1 = require("../middlewares/validation-handler");
class DroneRoutes extends base_route_1.BaseRoute {
    constructor(app) {
        super(app);
    }
    setUpRoutes() {
        this.app.route("/drones")
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = "drones.....";
            return res.send(response);
        }))
            .post(drone_validator_1.default, validation_handler_1.ValidationHandler, (req, res, next) => {
            drone_controller_1.default.create(req, res).then(drone => {
                res.status(201).send(drone);
            }).catch(error => {
                next(error);
            });
        })
            .put((req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = "drone updated";
            return res.send(response);
        }))
            .delete((req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = "drone deleted";
            return res.send(response);
        }));
        this.app.route("/drones/:droneId/load")
            .put(medication_validator_1.default, validation_handler_1.ValidationHandler, (req, res, next) => {
            return drone_controller_1.default.load(req, res).then(drone => {
                res.status(200).send(drone);
            }).catch(error => {
                next(error);
            });
        });
        return this.app;
    }
}
exports.default = DroneRoutes;
