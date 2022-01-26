
import DroneRepository from "../repositories/drone-repository";
import {DroneDoc} from "../models/drone-model"
import {Request} from "express"

class DroneController {
    
    public create = (req:Request): Promise<DroneDoc> =>{
             console.log(req.body)
            return DroneRepository.create(req.body)
    }

    public load = (req:Request): Promise<DroneDoc | null> =>{
        console.log(req.body)
       return DroneRepository.load(req.body,req.params.droneId)
    }

    public async getDrones(): Promise<DroneDoc[]> {
       return DroneRepository.getAll();
    }
}

export default new DroneController()