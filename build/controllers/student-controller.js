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
const student_repository_1 = __importDefault(require("../repositories/student-repository"));
const internal_server_error_1 = require("../helpers/errors/internal-server-error");
class StudentController {
    constructor() {
        this.studentAvailabilityErrorMsg = '';
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let student = yield student_repository_1.default.create(req.body);
                return student;
            }
            catch (error) {
                console.log(error);
                throw new internal_server_error_1.InternalServerError();
            }
        });
        //get individual student list by using matric number
        this.getStudentByMatric = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let student = yield student_repository_1.default.findWithMatric(req.params.matricno);
                return student;
            }
            catch (error) {
                console.log(error);
                throw new internal_server_error_1.InternalServerError();
            }
        });
        //get individual student by unique id
        this.getStudentById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let student = yield student_repository_1.default.findByUserId(req.params.id);
                return student;
            }
            catch (error) {
                console.log(error);
                throw new internal_server_error_1.InternalServerError();
            }
        });
        //get student list by department and level
        this.getStudentsByLevel = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let department = req.body.department;
                let level = req.body.level;
                let students = yield student_repository_1.default.find({
                    department: department, level: level
                });
                return students;
            }
            catch (error) {
                console.log(error);
                throw new internal_server_error_1.InternalServerError();
            }
        });
        /*
            public updateStudentLevel = async (req: Request, res: Response): Promise<StudentDoc | null> => {
        
                try{
        
                    let level = req.body.level
                    let studentid = req.params.id
                    let students = await StudentRepository.updatelevel({_id:studentid}, {level:level})
                    return students
        
                }catch(error) {
        
                    console.log(error)
                    throw new InternalServerError()
                }
            }
        
        */
    }
    //get all students in the database
    getStudents() {
        return __awaiter(this, void 0, void 0, function* () {
            return student_repository_1.default.getAll();
        });
    }
}
exports.default = new StudentController();
