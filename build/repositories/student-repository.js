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
const student_model_1 = require("../models/student-model");
class StudentRepository {
    constructor() {
        this.create = (StudentData) => __awaiter(this, void 0, void 0, function* () {
            return new student_model_1.Student(StudentData).save();
        });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            return student_model_1.Student.find({});
        });
        this.findWithMatric = (matricno) => __awaiter(this, void 0, void 0, function* () {
            return student_model_1.Student.findOne({ matricno: matricno });
        });
        this.findByUserId = (studentid) => __awaiter(this, void 0, void 0, function* () {
            return student_model_1.Student.findById(studentid);
        });
        this.find = (query) => __awaiter(this, void 0, void 0, function* () {
            return student_model_1.Student.find(query);
        });
        this.updatelevel = (studentid, level) => __awaiter(this, void 0, void 0, function* () {
            return student_model_1.Student.findOneAndUpdate({ _id: studentid }, { level: level }, { new: true });
        });
    }
}
exports.default = new StudentRepository();
