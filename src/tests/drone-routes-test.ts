import DroneApp from "../app"
import supertest from "supertest"
import { Application } from "express"
import {Drone} from "../models/drone-model"
const app: Application = DroneApp.getAppInstance()
const request = supertest(app)
import {
    dbUrl,validDrone,lowBatteryDrone,
          invalidWeightDrone,lowWeightDrone,
                 idleDrone,droneIds,validMedicationData,highWeightMedicationData
   } from './testdata/testdata'

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
             expect(response.statusCode).toBe(200)
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

    describe("GET /drones/:droneId/battery",()=>{
        it("Should Return the battery level of the drone",async ()=>{
             const response = await request.get(`/drones/${droneIds.validDrone}/battery`)
             expect(response.statusCode).toBe(200)
             expect(response.body).toEqual(
                    expect.objectContaining(
                        {
                         battery: expect.any(Number)
                        }
                    )
             )
        })
    })    

})


