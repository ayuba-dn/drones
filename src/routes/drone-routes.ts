import { BaseRoute } from "../helpers/base-route";
import  {Request,Response,Application, NextFunction} from "express";
import DroneController from "../controllers/drone-controller"
import DroneValidation from "../middlewares/drone-validation-handler";


export default class DroneRoutes extends BaseRoute {
   
    constructor(app: Application) {
        super(app);
    }
    
    setUpRoutes() {

        this.app.route("/drones")
        .get(async (req: Request, res: Response,next:NextFunction) => {
            DroneController.getDrones().then(drone=>{
                return res.status(201).send(drone)
            }).catch(error=>{
                next(error)
            })  
        })
        .post(DroneValidation.create,(req:Request, res:Response,next:NextFunction)=>{
                DroneController.create(req,res).then(drone=>{
                    return res.status(201).send(drone)
                }).catch(error=>{
                    next(error)
                })                
        })
        .put(DroneValidation.create,async(req:Request, res:Response)=>{
            const response = "drone updated";
            return res.send(response);
        })
        .delete(async(req:Request, res:Response)=>{
            const response = "TO DO>>>>>drone deleted";
            return res.send(response);
        })


        this.app.route("/drones/:droneId/medications")
        .post(DroneValidation.loadMedication,(req:Request,res:Response,next:NextFunction)=>{
            DroneController.load(req,res).then(drone=>{
                return res.status(200).send(drone)
            }).catch(error=>{
                next(error)
            })
        })
        .get(DroneValidation.getMedications,(req:Request,res:Response,next:NextFunction)=>{
            DroneController.medications(req,res).then(medications=>{
                return res.status(200).send(medications)
            }).catch(error=>{
                next(error)
            })
        })

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

        

        return this.app;
    }
}