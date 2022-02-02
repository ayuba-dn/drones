import DroneApp from "../app"
import supertest from "supertest"
import { Application } from "express"
import {Drone} from "../models/drone-model"
const app: Application = DroneApp.getAppInstance()
const request = supertest(app)
var droneId: string
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '27017';
const dbName = process.env.DB_NAME || 'test_drones';
const authDbName = process.env.AUTH_DB_NAME || 'admin';
const dbUser = process.env.DB_USER || 'droneuser';
const dbPassword = process.env.DB_PASSWORD || 'xc892zx22';
const dbUrl: string = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=${authDbName}`


const validDrone = {
    serialNumber:"7474848484",
    model:"Lightweight",
    weight:45,
    battery:0.9,
    state:"LOADING"
}

const lowBatteryDrone = {
    serialNumber:"7474848484",
    model:"Lightweight",
    weight:45,
    battery:0.24,
    state:"LOADING"
}

const invalidWeightDrone = {
    serialNumber:"7474848484",
    model:"Lightweight",
    weight:600, //500 is max
    battery:0.9,
    state:"LOADING"
}

const lowWeightDrone = {
    serialNumber:"7474848484",
    model:"Lightweight",
    weight:45,
    battery:0.9,
    state:"LOADING"
}

const idleDrone = {
    serialNumber:"7474848484",
    model:"Lightweight",
    weight:45,
    battery:0.9,
    state:"IDLE"
}

let droneIds = {
    validDrone: null,
    lowBatteryDrone: null,
    InvalidWeightDrone: null,
    lowWeightDrone: null,
    idleDrone: null
}

const validMedicationData = {
    name:"Sierra-243",
    weight:10,
    code:"DOGE",
    image:'xyz.png'
}

const highWeightMedicationData = {
    name:"SIERRA 243",
    weight:500,
    code:"rr244", //Invalid
    image:'xyz.png'
}

describe("DroneRoutes", ()=>{
     
      beforeAll(async () => {
         DroneApp.connectDb(dbUrl)
         let createdValidDrone =  await new Drone(validDrone).save()
         droneIds.validDrone = createdValidDrone ? createdValidDrone._id : null
 
         let createdLowWeightDrone =  await new Drone(lowWeightDrone).save()
         droneIds.lowWeightDrone = createdLowWeightDrone ? createdLowWeightDrone._id : null
 
         let createdLowBatteryDrone =  await new Drone(lowBatteryDrone).save()
         droneIds.lowBatteryDrone = createdLowBatteryDrone ? createdLowBatteryDrone._id : null
 
         let createdIdleDrone =  await new Drone(idleDrone).save()
         droneIds.idleDrone = createdIdleDrone ? createdIdleDrone._id : null
      });
     
      
      //remove all data
      afterAll(async () => {
         Drone.deleteMany({})
      });
      
    describe("POST /drones",()=>{
       
        it("Should Create A Drone and Return It",async ()=>{
             const response = await request.post("/drones").send(validDrone)
             expect(response.statusCode).toBe(201)
             expect(response.body).toEqual(
                 expect.objectContaining({
                     model: expect.any(String),
                     weight: expect.any(Number),
                     serialNumber: expect.any(String)
                 })
             )
            
            
        })
        
        it("Should Return a 400 validation error",async ()=>{
            const response = await request.post("/drones").send(invalidWeightDrone)
            expect(response.statusCode).toBe(400)
            expect(response.body.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        message: expect.any(String),
                        field: "weight"
                    })
                ])
               
            )
        })
    })  
    
    describe("PUT /drones/:droneId/medications",()=>{
           
        it("Should Load A Drone WIth Medication and Return It",async ()=>{
             const response = await request.post(`/drones/${droneIds.validDrone}/medications`).send(validMedicationData)
             //expect(response.statusCode).toBe(200)
             expect(response.body).toEqual(
                 expect.objectContaining({
                     medications: expect.arrayContaining([
                         expect.objectContaining({
                            name: expect.any(String)
                         })
                        ])
                 })
             )
             
        })

        it("Medication Weight Exceeding Drone Weight",async ()=>{
            const response = await request.post(`/drones/${droneIds.lowWeightDrone}/medications`).send(highWeightMedicationData)
            expect(response.statusCode).toBe(400)
            expect(response.body.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        message: "the weight is beyond what this drone can carry"
                    })
                ])
            )
            
         })

         it("Drone With Low Battery Validation Error",async ()=>{
           
            const response = await request.post(`/drones/${droneIds.lowBatteryDrone}/medications`).send(validMedicationData)
            expect(response.statusCode).toBe(400)
            expect(response.body.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        message: "drone battery is low, please recharge and try again"
                    })
                ])
            )
            
         })
        
        
    })  


    describe("GET /drones/available",()=>{
        it("Should Return all Availble Drones or an Empty array",async ()=>{
             const response = await request.get("/drones/available")
             expect(response.statusCode).toBe(200)
             expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining(
                        {
                         state: 'IDLE'
                        }
                    )
                ]) || []   
                     
             )
        })
    })    
})


