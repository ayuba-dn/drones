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
const student_controller_1 = __importDefault(require("../controllers/student-controller"));
const student_validation_handler_1 = __importDefault(require("../middlewares/student-validation-handler"));
class StudentRoutes extends base_route_1.BaseRoute {
    constructor(app) {
        super(app);
    }
    setUpRoutes() {
        this.app.route("/students")
            .get((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            student_controller_1.default.getStudents().then(student => {
                return res.status(201).send(student);
            }).catch(error => {
                next(error);
            });
        }))
            .post(student_validation_handler_1.default.create, (req, res, next) => {
            student_controller_1.default.create(req, res).then(student => {
                return res.status(201).send(student);
            }).catch(error => {
                next(error);
            });
        })
            .put(student_validation_handler_1.default.create, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = "registration updated";
            return res.send(response);
        }))
            .delete((req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = "TO DO>>>>>registration deleted";
            return res.send(response);
        }));
        this.app.route("/students/:matricno")
            .get((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            student_controller_1.default.getStudentByMatric(req, res).then(student => {
                return res.status(201).send(student);
            }).catch(error => {
                next(error);
            });
        }));
        this.app.route("/students/:id")
            .get((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            student_controller_1.default.getStudentById(req, res).then(student => {
                return res.status(201).send(student);
            }).catch(error => {
                next(error);
            });
        }));
        /*
                this.app.route("/drones/:droneId/battery")
                .get((req:Request,res:Response,next:NextFunction)=>{
                    DroneController.checkBattery(req,res).then(drone=>{
                        res.status(200).send(drone)
                    }).catch(error=>{
                        next(error)
                    })
                })
        
                this.app.route("/drones/available/")
                .get((req:Request,res:Response,next:NextFunction)=>{
                    DroneController.availableDrones(req,res).then(drones=>{
                        res.status(200).send(drones)
                    }).catch(error=>{
                        next(error)
                    })
                })
        
          */
        return this.app;
    }
}
exports.default = StudentRoutes;
