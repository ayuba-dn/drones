
import StudentRepository from "../repositories/student-repository";
import {Student, StudentDoc} from "../models/student-model"
import {Request, Response} from "express"
import {DroneCapacityError } from '../helpers/errors/drone-capacity-error'
import {ResourceNotFoundError} from '../helpers/errors/resource-notfound-error'
import {InternalServerError } from '../helpers/errors/internal-server-error'


class StudentController {
    
    private studentAvailabilityErrorMsg:string = ''

    public create = async (req:Request,res:Response): Promise<StudentDoc> =>{
               try{
                 let student = await StudentRepository.create(req.body)
                 return student
               }catch(error){
                   console.log(error)
                   throw new InternalServerError()
               }
    }


    //get all students in the database
    public async getStudents(): Promise<StudentDoc[]> {

       return StudentRepository.getAll();
    }


    //get individual student list by using matric number
    public getStudentByMatric = async (req: Request, res: Response): Promise<StudentDoc| null> => {
        try {

            let student = await StudentRepository.findWithMatric(req.params.matricno)
            return student
        } catch(error) {
            console.log(error)
            throw new InternalServerError()
        }
    }


    //get individual student by unique id
    public getStudentById = async (req: Request, res: Response): Promise<StudentDoc | null> => {

        try{

            let student = await StudentRepository.findByUserId(req.params.id)
            return student
        } catch(error) {
            console.log(error)
            throw new InternalServerError()
        }
    }


    //get student list by department and level
    public getStudentsByLevel = async (req: Request, res: Response): Promise<StudentDoc[] | null> => {

        try{

            let department = req.body.department
            let level = req.body.level
            let students = await StudentRepository.find({
               department: department, level:level })
            return students

        }catch(error) {

            console.log(error)
            throw new InternalServerError()
        }
    }


    //update level for individual student
    public changeStudentLevel = async (req: Request, res: Response): Promise<StudentDoc | null> => {

        try{

            let matricno = req.body.matricno
            let level = req.body.level
            let students = await StudentRepository.updatelevel(matricno, level)
            return students

        }catch(error) {

            console.log(error)
            throw new InternalServerError()
        }
    }


}

export default new StudentController()