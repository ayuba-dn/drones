import { BaseRoute } from "../helpers/base-route";
import  {Request,Response,Application, NextFunction} from "express";
import RegistrationController from "../controllers/registration-controller"
import RegisterValidation from "../middlewares/register-validation-handler";


export default class RegisterRoutes extends BaseRoute {
   
    constructor(app: Application) {
        super(app);
    }
    
    setUpRoutes() {

        this.app.route("/registrations")
        .get(async (req: Request, res: Response,next:NextFunction) => {
            RegistrationController.getRegistrations().then(student=>{
                return res.status(201).send(student)
            }).catch(error=>{
                next(error)
            })  
        })
        .post(RegisterValidation.create,(req:Request, res:Response,next:NextFunction)=>{
                RegistrationController.create(req,res).then(student=>{
                    return res.status(201).send(student)
                }).catch(error=>{
                    next(error)
                })                
        })
        .put(RegisterValidation.create,async(req:Request, res:Response)=>{
            const response = "registration updated";
            return res.send(response);
        })
        .delete(async(req:Request, res:Response)=>{
            const response = "TO DO>>>>>registration deleted";
            return res.send(response);
        })


        this.app.route("/registrations/student")
        .post(async (req: Request, res: Response,next:NextFunction) => {
            RegistrationController.getOneRegistration(req, res).then(student=>{
                return res.status(201).send(student)
            }).catch(error=>{
                next(error)
            })  
        })

/*

        this.app.route("/students/:id")
        .get(async (req: Request, res: Response,next:NextFunction) => {
            StudentController.getStudentById(req, res).then(student=>{
                return res.status(201).send(student)
            }).catch(error=>{
                next(error)
            })  
        })

/*
        this.app.route("/drones/:droneId/battery")
        .get((req:Request,res:Response,next:NextFunction)=>{
            DroneController.checkBattery(req,res).then(drone=>{
                res.status(200).send(drone)
            }).catch(error=>{
                next(error)
            })                         
        })

        this.app.route("/drones/available/")
        .get((req:Request,res:Response,next:NextFunction)=>{
            DroneController.availableDrones(req,res).then(drones=>{
                res.status(200).send(drones)
            }).catch(error=>{
                next(error)
            })                         
        })

  */      

        return this.app;
    }
}