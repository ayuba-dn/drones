import mongoose from "mongoose";
import DroneType from "./types/drone"


interface DroneModel extends mongoose.Model <DroneDoc>{
    Create(droneData:DroneType): DroneDoc
}

interface DroneDoc extends mongoose.Document{

}
const droneSchema = new mongoose.Schema({
    serialNumber: {
        type: String,
        required: true,
        maxLength: 100
    },
    model: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true,
        max: 500
    },
    battery: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true,
        enum: ['IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING']
    }
})


droneSchema.statics.Create = (droneData: DroneType) => {
    return new Drone(droneData)
}



const Drone = mongoose.model<DroneDoc, DroneModel>('Drone',droneSchema) //Second parameter will put into consideration all we did to the drone schema before binding

//We build a wrapper around the diffault instantiatior to handle types



export  {Drone, DroneDoc}
