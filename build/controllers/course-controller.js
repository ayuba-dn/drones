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
const course_repository_1 = __importDefault(require("../repositories/course-repository"));
const internal_server_error_1 = require("../helpers/errors/internal-server-error");
class CourseController {
    constructor() {
        this.courseAvailabilityErrorMsg = '';
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let course = yield course_repository_1.default.create(req.body);
                return course;
            }
            catch (error) {
                console.log(error);
                throw new internal_server_error_1.InternalServerError();
            }
        });
        //get individual student list by using matric number
        this.getCourseByCode = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let course = yield course_repository_1.default.findWithID(req.params.courseid);
                return course;
            }
            catch (error) {
                console.log(error);
                throw new internal_server_error_1.InternalServerError();
            }
        });
        //get student list by department and level
        this.getCourseByName = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let department = req.body.department;
                let level = req.body.level;
                let students = yield course_repository_1.default.find({
                    department: department, level: level
                });
                return students;
            }
            catch (error) {
                console.log(error);
                throw new internal_server_error_1.InternalServerError();
            }
        });
    }
    //get all courses in the database
    getCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            return course_repository_1.default.getAll();
        });
    }
}
exports.default = new CourseController();
