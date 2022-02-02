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
        .get(async (req: Request, res: Response) => {
              const response = "drones.....";
              return res.send(response);
        })
        .post(DroneValidation.create,(req:Request, res:Response,next:NextFunction)=>{
                DroneController.create(req,res).then(drone=>{
                    res.status(201).send(drone)
                }).catch(error=>{
                    next(error)
                })                
        })
        .put(DroneValidation.create,async(req:Request, res:Response)=>{
            const response = "drone updated";
            return res.send(response);
        })
        .delete(async(req:Request, res:Response)=>{
            const response = "drone deleted";
            return res.send(response);
        })


        this.app.route("/drones/:droneId/medications")
        .put(DroneValidation.loadMedication,(req:Request,res:Response,next:NextFunction)=>{
            return DroneController.load(req,res).then(drone=>{
                res.status(200).send(drone)
            }).catch(error=>{
                next(error)
            })
        })

        this.app.route("/drones/:droneId/medications")
        .get(DroneValidation.loadMedication,(req:Request,res:Response,next:NextFunction)=>{
            return DroneController.load(req,res).then(drone=>{
                res.status(200).send(drone)
            }).catch(error=>{
                next(error)
            })
                
                         
        })


        this.app.route("/drones/:droneId/battery")
        .put(DroneValidation.loadMedication,(req:Request,res:Response,next:NextFunction)=>{
            return DroneController.load(req,res).then(drone=>{
                res.status(200).send(drone)
            }).catch(error=>{
                next(error)
            })
                
                         
        })

        

        return this.app;
    }
}