import { Student, StudentDoc } from '../models/student-model'
import StudentType from "../models/types/student"

interface Query {
   matricno:string, 
   studentid?:string | undefined
}

class StudentRepository {
  
     create = async (StudentData: StudentType): Promise<StudentDoc> => {  
        return new Student(StudentData).save();
     }

     getAll = async (): Promise<StudentDoc []> => {  
        return Student.find({})
        .populate('department', 'name faculty');
     }

     findWithMatric = async (matricno:string): Promise<StudentDoc | null>=> {  
         return Student.findOne({matricno: matricno})
         .populate('department', 'name faculty')
     }

     findByUserId = async (studentid:string): Promise<StudentDoc | null>=> {  
         return Student.findOne({_id: studentid})
      }

     find = async (query: {}): Promise<StudentDoc[] | null>=> {  
      return Student.find(query)
     }
 
     updatelevel = async (matricno: string, level: string): Promise<StudentDoc | null>=> {

        return Student.findOneAndUpdate({matricno: matricno}, {$set: {level: level}}, {new: true})
     }


    
}

export default new StudentRepository()