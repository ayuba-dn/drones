import { Course, CourseDoc } from '../models/course-model'
import CourseType from "../models/types/course"

interface Query {
   matricno:string, 
   studentid?:string | undefined
}

class CourseRepository {
  
     create = async (CourseData: CourseType): Promise<CourseDoc> => {  
        return new Course(CourseData).save();
     }

     getAll = async (): Promise<CourseDoc []> => {  
        return Course.find({})
               .populate('departments', 'name faculty');
     }

     findWithID = async (courseid:string): Promise<CourseDoc | null>=> {  
         return Course.findById(courseid)
                .populate('departments', 'name faculty')
     }

     find = async (query: {}): Promise<CourseDoc[] | null>=> {  
      return Course.find(query)
     }


    
}

export default new CourseRepository()