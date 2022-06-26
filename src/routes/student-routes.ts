import { BaseRoute } from "../helpers/base-route";
import  {Request,Response,Application, NextFunction} from "express";
import StudentController from "../controllers/student-controller"
import StudentValidation from "../middlewares/student-validation-handler";


export default class StudentRoutes extends BaseRoute {
   
    constructor(app: Application) {
        super(app);
    }
    
    setUpRoutes() {

        this.app.route("/students")
        .get(async (req: Request, res: Response,next:NextFunction) => {
            StudentController.getStudents().then(student=>{
                return res.status(201).send(student)
            }).catch(error=>{
                next(error)
            })  
        })
        .post(StudentValidation.create,(req:Request, res:Response,next:NextFunction)=>{
                StudentController.create(req,res).then(student=>{
                    return res.status(201).send(student)
                }).catch(error=>{
                    next(error)
                })                
        })
        .put(async (req:Request, res:Response, next: NextFunction)=>{

            StudentController.changeStudentLevel(req,res).then(
                student=>{
                    return res.status(201).send(student)
                }).catch(error=>{
                    next(error)
                })
        })
        .delete(async(req:Request, res:Response)=>{
            const response = "TO DO>>>>>registration deleted";
            return res.send(response);
        })


        this.app.route("/students/:matricno")
        .get(async (req: Request, res: Response,next:NextFunction) => {
            StudentController.getStudentByMatric(req, res).then(student=>{
                return res.status(201).send(student)
            }).catch(error=>{
                next(error)
            })  
        })


        this.app.route("/students/:id")
        .get(async (req: Request, res: Response,next:NextFunction) => {
            StudentController.getStudentById(req, res).then(student=>{
                return res.status(201).send(student)
            }).catch(error=>{
                next(error)
            })  
        })   

        return this.app;
    }
}