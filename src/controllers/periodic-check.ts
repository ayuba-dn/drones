
import DroneRepository from "../repositories/drone-repository";
import cron from 'node-cron'
import { logger } from "../helpers/logger";

class PeriodicChecker {
    
    private interval:string = ''
    
    public start = async (interval:string) =>{
        cron.schedule(interval,async ()=>{
            logger.info(`${Date.now()} Periodic Check Running....`) 
            let drones = await DroneRepository.getAll()
            drones.forEach(drone=>{
                logger.info(`Drone ID: ${drone._id} Battery Level: ${drone.battery}`)
            })
        })
    }

}

export default new PeriodicChecker()