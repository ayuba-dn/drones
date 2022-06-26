import mongoose from "mongoose";
const { Schema } = mongoose
import StudentType from "./types/student"


interface studentModel extends mongoose.Model <StudentDoc>{
    Create(studentData:StudentType): StudentDoc
}

interface StudentDoc extends mongoose.Document{
   id: number,
   surname: string,
   middlename:string,
   firstname: string,
   department: string,
   matricno: string,
   gender: string,
   level: number
   yearofentry: number,
   units: number
}


const studentSchema = new mongoose.Schema({

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
        type: Schema.Types.ObjectId,
        ref: 'Department',
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
    yearofentry: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'suspended', 'graduated'],
        default: 'active'
        
    }
})



studentSchema.statics.Create = (studentData: StudentType) => {
    return new Student(studentData)
}



const Student = mongoose.model<StudentDoc, studentModel>('Student',studentSchema) //Second parameter will put into consideration all we did to the drone schema before binding

//We build a wrapper around the diffault instantiatior to handle types



export  {Student, StudentDoc}
