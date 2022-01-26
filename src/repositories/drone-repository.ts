import {Drone,DroneDoc} from "../models/drone-model"
import DroneType from "../models/types/drone"

class DroneRepository {
  
     create = async (droneData: DroneType): Promise<DroneDoc> => {  
        return new Drone(droneData).save();
     }

     getAll = async (): Promise<DroneDoc []> => {  
        return Drone.find({});
     }

     findOne = async (param:{}): Promise<DroneDoc | null>=> {  
        return Drone.findOne(param);
     }


    
}

export default new DroneRepository()