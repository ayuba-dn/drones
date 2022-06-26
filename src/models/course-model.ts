import  mongoose, { Schema }  from "mongoose";
import CourseType from "./types/course"
import {Department, DepartmentDoc} from './department-model'
//const { Schema } = moongoose
interface CourseModel extends mongoose.Model <CourseDoc>{
    Create(courseData:CourseType): CourseDoc
}

interface CourseDoc extends mongoose.Document{
   title: string,
   code:string,
   departments: [],
   level: number,
   semester: string
}

const courseSchema = new mongoose.Schema({
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
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    }],
    level: {
        type: Number,
        required: true,
        enum: [100, 200, 300, 400, 500]
    },
    catscore: {
        type: Number,
        required: true,
        default: 0
    },
    catcap: {
        type: Number,
        required: true,
        default: 30
    },
    examscore: {
        type: Number,
        required: true,
        default: 0
    },
    examcap: {
        type: Number,
        required: true,
        default: 70
    },
     semester: {
        type: String,
        required: true,
        enum: ['harmattan', 'rain']
    },
     units: {
        type: Number,
        required: true,
    },
     type: {
        type: String,
        required: true,
        enum: ['core', 'elective']
    }
})



courseSchema.statics.Create = (courseData: CourseType) => {
    return new Course(courseData)
}



const Course = mongoose.model<CourseDoc, CourseModel>('Course',courseSchema) //Second parameter will put into consideration all we did to the drone schema before binding

//We build a wrapper around the diffault instantiatior to handle types



export  {Course, CourseDoc}
