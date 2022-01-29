import { BaseRoute } from "../helpers/base-route";
import  {Request,Response,Application, NextFunction} from "express";
import DroneController from "../controllers/drone-controller"
import droneValidator  from "../helpers/validators/drone-validator"
import medicationValidator  from "../helpers/validators/medication-validator"
import { ValidationHandler } from "../middlewares/validation-handler";

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
        .post(droneValidator,ValidationHandler,(req:Request, res:Response,next:NextFunction)=>{
                DroneController.create(req,res).then(drone=>{
                    res.status(201).send(drone)
                }).catch(error=>{
                    next(error)
                })                
        })
        .put(async(req:Request, res:Response)=>{
            const response = "drone updated";
            return res.send(response);
        })
        .delete(async(req:Request, res:Response)=>{
            const response = "drone deleted";
            return res.send(response);
        })


        this.app.route("/drones/:droneId/load")
        .put(medicationValidator,ValidationHandler,(req:Request,res:Response,next:NextFunction)=>{
            return DroneController.load(req,res).then(drone=>{
                res.status(200).send(drone)
            }).catch(error=>{
                next(error)
            })
                
                         
        })

        

        return this.app;
    }
}