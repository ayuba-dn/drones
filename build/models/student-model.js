"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const studentSchema = new mongoose_1.default.Schema({
    surname: {
        type: String,
        required: true,
        maxLength: 100
    },
    middlename: {
        type: String,
        required: false,
        maxLength: 100
    },
    firstname: {
        type: String,
        required: true,
        maxLength: 100
    },
    department: {
        type: String,
        required: true,
        maxLength: 100
    },
    matricno: {
        type: String,
        required: true,
        maxLength: 100,
        unique: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    level: {
        type: Number,
        required: true,
        enum: [100, 200, 300, 400, 500]
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'suspended', 'graduated'],
        default: 'active'
    }
});
studentSchema.statics.Create = (studentData) => {
    return new Student(studentData);
};
const Student = mongoose_1.default.model('Student', studentSchema); //Second parameter will put into consideration all we did to the drone schema before binding
exports.Student = Student;
