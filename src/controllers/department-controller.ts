
import DepartmentRepository from "../repositories/department-repository";
import {Department, DepartmentDoc} from "../models/department-model"
import {Request, Response} from "express"
import {DroneCapacityError } from '../helpers/errors/drone-capacity-error'
import {ResourceNotFoundError} from '../helpers/errors/resource-notfound-error'
import {InternalServerError } from '../helpers/errors/internal-server-error'


class DepartmentController {
    
    private courseAvailabilityErrorMsg:string = ''

    public create = async (req:Request,res:Response): Promise<DepartmentDoc> =>{
               try{
                 let department = await DepartmentRepository.create(req.body)
                 return department
               }catch(error){
                   console.log(error)
                   throw new InternalServerError()
               }
    }


    //get all courses in the database
    public async getDepartments(): Promise<DepartmentDoc[]> {

       return DepartmentRepository.getAll();
    }

/*
    //get individual student list by using matric number
    public getDepartmentByFaculty = async (req: Request, res: Response): Promise<DepartmentDoc[]| null> => {
        try {

            let course = await DepartmentRepository.findByFaculty(req.params.faculty)
            return course
        } catch(error) {
            console.log(error)
            throw new InternalServerError()
        }
    }

*/
    //get student list by department and level
    public getCourseByName = async (req: Request, res: Response): Promise<DepartmentDoc[] | null> => {

        try{

            let department = req.body.department
            let level = req.body.level
            let students = await DepartmentRepository.find({
               department: department, level:level })
            return students

        }catch(error) {

            console.log(error)
            throw new InternalServerError()
        }
    }

}

export default new DepartmentController()