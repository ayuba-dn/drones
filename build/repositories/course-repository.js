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
const course_model_1 = require("../models/course-model");
class CourseRepository {
    constructor() {
        this.create = (CourseData) => __awaiter(this, void 0, void 0, function* () {
            return new course_model_1.Course(CourseData).save();
        });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            return course_model_1.Course.find({});
        });
        this.findWithID = (courseid) => __awaiter(this, void 0, void 0, function* () {
            return course_model_1.Course.findById(courseid);
        });
        this.find = (query) => __awaiter(this, void 0, void 0, function* () {
            return course_model_1.Course.find(query);
        });
    }
}
exports.default = new CourseRepository();
