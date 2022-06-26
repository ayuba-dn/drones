import { Department, DepartmentDoc } from '../models/department-model'
import DepartmentType from "../models/types/department"

interface Query {
   name:string, 
   faculty:boolean
}

class DepartmentRepository {
  
     create = async (DepartmentData: DepartmentType): Promise<DepartmentDoc> => {  
        return new Department(DepartmentData).save();
     }

     getAll = async (): Promise<DepartmentDoc []> => {  
        return Department.find({});
     }
/*
     findByFaculty = async (faculty:string): Promise<DepartmentDoc[] | null>=> {  
         return Department.findOne(faculty)
     }
*/
     find = async (query: {}): Promise<DepartmentDoc[] | null>=> {  
      return Department.find(query)
     }


    
}

export default new DepartmentRepository()