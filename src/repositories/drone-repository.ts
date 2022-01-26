import {Drone,DroneDoc} from "../models/drone-model"
import DroneType from "../models/types/drone"
import Medication from "../models/types/medication"

class DroneRepository {
  
     create = async (droneData: DroneType): Promise<DroneDoc> => {  
        return new Drone(droneData).save();
     }

     load = async (medication: Medication,droneId: String): Promise<DroneDoc | null> => {  
       return Drone.findByIdAndUpdate(droneId,{ $push: { medications: medication } },{new: true});
     }

     getAll = async (): Promise<DroneDoc []> => {  
        return Drone.find({});
     }

     findOne = async (param:{}): Promise<DroneDoc | null>=> {  
        return Drone.findOne(param);
     }


    
}

export default new DroneRepository()