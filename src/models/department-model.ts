import mongoose from "mongoose";
import DepartmentType from "./types/department"

interface DepartmentModel extends mongoose.Model <DepartmentDoc>{
    Create(departmentData:DepartmentType): DepartmentDoc
}

interface DepartmentDoc extends mongoose.Document{
   name: string,
   faculty:string,
   isactive: string
}

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxLength: 200
    },
    faculty: {
        type: String,
        required: true,
        enum: ['Technology', 'Sciences', 'Arts', 'Social Sciences', 'Clinical Sciences', 'Pharmacy']
    },
    isactive: {
        type: Boolean,
        required: true,
        default: true
    }
})



departmentSchema.statics.Create = (departmentData: DepartmentType) => {
    return new Department(departmentData)
}



const Department = mongoose.model<DepartmentDoc, DepartmentModel>('Department',departmentSchema) //Second parameter will put into consideration all we did to the drone schema before binding

//We build a wrapper around the diffault instantiatior to handle types



export  {Department, DepartmentDoc}
