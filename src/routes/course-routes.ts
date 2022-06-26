import { BaseRoute } from "../helpers/base-route";
import  {Request,Response,Application, NextFunction} from "express";
import CourseController from "../controllers/course-controller"
import CourseValidation from "../middlewares/course-validation-handler";


export default class StudentRoutes extends BaseRoute {
   
    constructor(app: Application) {
        super(app);
    }
    
    setUpRoutes() {

        this.app.route("/courses")
        .get(async (req: Request, res: Response,next:NextFunction) => {
            CourseController.getCourses().then(course=>{
                return res.status(201).send(course)
            }).catch(error=>{
                next(error)
            })  
        })
        .post(CourseValidation.create,(req:Request, res:Response,next:NextFunction)=>{
                CourseController.create(req,res).then(course=>{
                    return res.status(201).send(course)
                }).catch(error=>{
                    next(error)
                })                
        })
        .put(CourseValidation.create,async(req:Request, res:Response)=>{
            const response = "course data updated";
            return res.send(response);
        })
        .delete(async(req:Request, res:Response)=>{
            const response = "TO DO>>>>>registration deleted";
            return res.send(response);
        })

        return this.app;
    }
}