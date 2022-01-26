import { BaseRoute } from "../helpers/base-route";
import  {Request,Response,Application} from "express";
import DroneController from "../controllers/drone-controller"
import {validationResult} from 'express-validator'
import droneValidator from "../helpers/validators/drone-validator"
import {RequestValidationError } from '../helpers/errors/request-validation-error'
import {BadRequestError } from '../helpers/errors/bad-request-error'


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
        .post(droneValidator,(req:Request, res:Response,next:any)=>{
                
               const errors = validationResult(req)
                if(!errors.isEmpty()){
                    let errorsData: any = errors.array()
                    throw new RequestValidationError(errorsData)
                }

                DroneController.create(req)
                .then(drone=>{
                    return res.status(201).send(drone)
                })
                .catch(error=>{
                    throw new BadRequestError(error)
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

        

        return this.app;
    }
}