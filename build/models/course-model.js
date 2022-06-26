"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const courseSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 200
    },
    code: {
        type: String,
        required: true,
        unique: true,
        length: 6
    },
    departments: [{
            type: String,
            required: true,
            maxLength: 200
        }],
    level: {
        type: Number,
        required: true,
        enum: [100, 200, 300, 400, 500]
    },
    semester: {
        type: String,
        required: true,
        enum: ['Harmattan', 'Rain']
    }
});
courseSchema.statics.Create = (courseData) => {
    return new Course(courseData);
};
const Course = mongoose_1.default.model('Course', courseSchema); //Second parameter will put into consideration all we did to the drone schema before binding
exports.Course = Course;
