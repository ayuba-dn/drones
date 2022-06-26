import mongoose, { Schema } from "mongoose"
import RegistrationType from "./types/registration"
import {Course, CourseDoc} from "./course-model"
import {Student, StudentDoc} from "./student-model"

//const { Schema } = mongoose

interface RegistrationDoc extends mongoose.Model <RegistrationDoc>{
    Create(registrationData:RegistrationType): RegistrationDoc
}

interface RegistrationModel extends mongoose.Document{
   registrationNumber: string,
   registrant:string,
   session:string,
   semester: number,
   courses: []
}

const registrationSchema = new mongoose.Schema({
    registrationNumber: {
        type: String,
        unique: true,
        required: true,
        maxLength: 200
    },
    registrant: {
        type: Schema.Types.ObjectId, 
        ref: 'Student',
        required: true
    },
    session: {
        type: Number,
        required: true,
        maxLength: 4
    },
    semester: {
        type: String,
        required: true,
        enum: ['Harmattan', 'Rain']
    },

     courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }]
})




/* registrationSchema.statics.Create = (registrationData: RegistrationType) => {
    return new Registration(registrationData)
} 



const Registration = mongoose.model<RegistrationDoc, RegistrationModel>('Registration', registrationSchema) //Second parameter will put into consideration all we did to the drone schema before binding

*/

const Registration = mongoose.model('Registration', registrationSchema)

//We build a wrapper around the diffault instantiatior to handle types



export  {Registration, RegistrationDoc}
