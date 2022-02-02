import {Drone,DroneDoc} from "../models/drone-model"
import DroneType from "../models/types/drone"
import Medication from "../models/types/medication"

interface Query {
   droneId:string, 
   projection?:string | undefined
}
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

     findOne = async (droneId:string): Promise<DroneDoc | null>=> {  
         return Drone.findById(droneId)
     }

     findOneWithProjection = async (droneId:string,projection:string): Promise<DroneDoc | null>=> {  
        console.log(projection)
         return Drone.findById(droneId).select(projection)
      }

     find = async (query: {}): Promise<DroneDoc[] | null>=> {  
      return Drone.find(query)
     }


    
}

export default new DroneRepository()