import { Course,CourseDoc } from "../models/course-model"
import { Student, StudentDoc } from '../models/student-model'
import {Registration, RegistrationDoc} from '../models/registration-model'
import CourseType from "../models/types/course"
import StudentType from "../models/types/student"
import RegistrationType from '../models/types/registration'

interface Query {
   droneId:string, 
   projection?:string | undefined
}

class RegistrationRepository {
  
     create = async (RegistrationData: RegistrationType): Promise<RegistrationDoc> => {  
        return new Registration(RegistrationData).save();
     }
/*
     
     load = async (registration: RegistrationType, studentid: String): Promise<RegistrationDoc | null> => {

       return Registration.findByIdAndUpdate(studentid,{ $push: { medications: medication } },{new: true});
     }
 */   

     getAll = async (): Promise<RegistrationDoc []> => {  
        return Registration.find({});
     }


     getAllWithPopulate = async (): Promise<RegistrationDoc []> => {

         return Registration.find({})
                .populate('registrant', 'matricno surname middlename')
                .populate('courses', 'title code catscore examscore')
     }

     //get a single registration id with populated referenced files
     getOneById = async (query: {}): Promise<RegistrationDoc | null> => {

         return Registration.findOne(query)
         .populate('registrant', ' matricno surname middlename firstname gender level department')
         .populate('courses', 'title code catscore examscore')

     }

     findOne = async (RegistrationId:string): Promise<RegistrationDoc | null>=> {  
         return Registration.findById(RegistrationId)
     }

     findOneWithMatric = async (RegistrationId:string,projection:string): Promise<RegistrationDoc | null>=> {  
        console.log(projection)
         return Registration.findById(RegistrationId).select(projection)
      }

     find = async (query: {}): Promise<RegistrationDoc[] | null>=> {  
      return Registration.find(query)
     }


    
}

export default new RegistrationRepository()