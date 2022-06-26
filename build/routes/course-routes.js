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
const course_controller_1 = __importDefault(require("../controllers/course-controller"));
const course_validation_handler_1 = __importDefault(require("../middlewares/course-validation-handler"));
class StudentRoutes extends base_route_1.BaseRoute {
    constructor(app) {
        super(app);
    }
    setUpRoutes() {
        this.app.route("/courses")
            .get((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            course_controller_1.default.getCourses().then(course => {
                return res.status(201).send(course);
            }).catch(error => {
                next(error);
            });
        }))
            .post(course_validation_handler_1.default.create, (req, res, next) => {
            course_controller_1.default.create(req, res).then(course => {
                return res.status(201).send(course);
            }).catch(error => {
                next(error);
            });
        })
            .put(course_validation_handler_1.default.create, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = "course data updated";
            return res.send(response);
        }))
            .delete((req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = "TO DO>>>>>registration deleted";
            return res.send(response);
        }));
        return this.app;
    }
}
exports.default = StudentRoutes;
