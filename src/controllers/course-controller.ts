
import CourseRepository from "../repositories/course-repository";
import {Course, CourseDoc} from "../models/course-model"
import {Request, Response} from "express"
import {DroneCapacityError } from '../helpers/errors/drone-capacity-error'
import {ResourceNotFoundError} from '../helpers/errors/resource-notfound-error'
import {InternalServerError } from '../helpers/errors/internal-server-error'


class CourseController {
    
    private courseAvailabilityErrorMsg:string = ''

    public create = async (req:Request,res:Response): Promise<CourseDoc> =>{
               try{
                 let course = await CourseRepository.create(req.body)
                 return course
               }catch(error){
                   console.log(error)
                   throw new InternalServerError()
               }
    }


    //get all courses in the database
    public async getCourses(): Promise<CourseDoc[]> {

       return CourseRepository.getAll();
    }


    //get individual student list by using matric number
    public getCourseByCode = async (req: Request, res: Response): Promise<CourseDoc| null> => {
        try {

            let course = await CourseRepository.findWithID(req.params.courseid)
            return course
        } catch(error) {
            console.log(error)
            throw new InternalServerError()
        }
    }


    //get student list by department and level
    public getCourseByName = async (req: Request, res: Response): Promise<CourseDoc[] | null> => {

        try{

            let department = req.body.department
            let level = req.body.level
            let students = await CourseRepository.find({
               department: department, level:level })
            return students

        }catch(error) {

            console.log(error)
            throw new InternalServerError()
        }
    }

}

export default new CourseController()