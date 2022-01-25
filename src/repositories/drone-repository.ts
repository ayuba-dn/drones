import {Drone,DroneDoc} from "../models/drone-model"
import DroneType from "../models/types/drone"

class DroneRepository {
  
     create = async (droneData: DroneType): Promise<DroneDoc> => {  
        return new Drone(droneData).save();
     }

     getAll = async (): Promise<DroneDoc []> => {  
        return Drone.find({});
     }

     findOne = async (param:any): Promise<DroneDoc []> => {  
        return Drone.find({});
     }


    
}

export default new DroneRepository()