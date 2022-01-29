
import DroneRepository from "../repositories/drone-repository";
import {DroneDoc} from "../models/drone-model"
import {Request, Response} from "express"
import {DroneCapacityError } from '../helpers/errors/drone-capacity-error'
import {ResourceNotFoundError} from '../helpers/errors/resource-notfound-error'
import {InternalServerError } from '../helpers/errors/internal-server-error'
import Medication from '../models/types/medication'

class DroneController {
    
    private droneAvailabilityErrorMsg:string = ''
   
    public create = async (req:Request,res:Response): Promise<DroneDoc> =>{
               try{
                 let drone = await DroneRepository.create(req.body)
                 return drone
               }catch(error){
                   //log error here
                   console.log(error)
                   throw new InternalServerError()
               }
    }

    public load =async (req:Request,res:Response): Promise<DroneDoc | null> =>{
                let medication = req.body
                let updatedDrone = null
                let drone:DroneDoc | null = null;
                //check the drones availability first
                await DroneRepository.findOne(req.params.droneId).then(returnedDrone=>{
                    drone = returnedDrone
                }).catch(()=>{
                    throw new InternalServerError() 
                })
                console.log(drone)
                if(drone){
                    if(!this.droneIsAvailable(drone,medication)){
                         throw new DroneCapacityError(this.droneAvailabilityErrorMsg) 
                    }
                }
                else{
                    throw new ResourceNotFoundError("drone with the id passed not found") 
                }
               
                await DroneRepository.load(req.body,req.params.droneId).then(updatedDrone=>{
                    updatedDrone = updatedDrone
                }).catch(error=>{
                    console.log("Hello")
                    throw new InternalServerError()
                })
                return updatedDrone
          
    }

    private droneIsAvailable = (drone: DroneDoc,medication: Medication): Boolean =>{
        //check battery
        if(drone.battery < 0.25){
            this.droneAvailabilityErrorMsg = "drone battery is low, please recharge and try again"
            console.log("low battery")
            return false
        }
        //check weight
        //get total weight loaded on the drone
        let availableWeight: number
        if(drone.medications.length>0){
            let totalWeightLoaded =  drone.medications.reduce((a, b) => a + (b['weight'] || 0), 0);
            availableWeight = drone.weight - totalWeightLoaded
        }
        else{
            availableWeight = drone.weight
        }
            //compare weights
        if(medication.weight > availableWeight){
            this.droneAvailabilityErrorMsg = "the weight is beyond what this drone can carry"
            return false
        }
        return true
    }

    public async getDrones(): Promise<DroneDoc[]> {
       return DroneRepository.getAll();
    }
}

export default new DroneController()