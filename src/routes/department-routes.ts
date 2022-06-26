import { BaseRoute } from "../helpers/base-route";
import  {Request,Response,Application, NextFunction} from "express";
import DepartmentController from "../controllers/department-controller"
import DepartmentValidation from "../middlewares/department-validation-handler";


export default class StudentRoutes extends BaseRoute {
   
    constructor(app: Application) {
        super(app);
    }
    
    setUpRoutes() {

        this.app.route("/departments")
        .get(async (req: Request, res: Response,next:NextFunction) => {
            DepartmentController.getDepartments().then(department=>{
                return res.status(201).send(department)
            }).catch(error=>{
                next(error)
            })  
        })
        .post(DepartmentValidation.create,(req:Request, res:Response,next:NextFunction)=>{
                DepartmentController.create(req,res).then(course=>{
                    return res.status(201).send(course)
                }).catch(error=>{
                    next(error)
                })                
        })
        .put(DepartmentValidation.create,async(req:Request, res:Response)=>{
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