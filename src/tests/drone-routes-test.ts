import DroneApp from "../app"
import supertest from "supertest"
import { Application } from "express"
import {Drone,DroneDoc} from "../models/drone-model"
jest.setTimeout(60000);
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
const drones = [
    {
        serialNumber:"7474848484",
        model:"Lightweight",
        weight:45,
        battery:0.9,
        state:"LOADING"
    },
    {
        serialNumber:"7474848484",
        model:"Lightweight",
        weight:45,
        battery:0.9,
        state:"LOADING"
    },
    {
        serialNumber:"7474848484",
        model:"Lightweight",
        weight:45,
        battery:0.9,
        state:"LOADING"
    }
]
describe("DroneRoutes", ()=>{
     
      beforeAll(async () => {
         DroneApp.connectDb(dbUrl)
      });
     
      // seed with some data
      beforeEach(async () => {
         await drones.forEach(async drone=>{
            await new Drone(drone).save()
         })

         let drone = await Drone.findOne({})
         droneId = drone ? drone._id : null
         
      });
     
      //remove all data
      afterEach(async () => {
         Drone.deleteMany({})
      });
      
    describe("POST /drones",()=>{
        const validDroneData = {
            serialNumber:"7474848484",
            model:"Lightweight",
            weight:45,
            battery:0.9,
            state:"LOADING"
        }

        const inValidDroneData = {
            serialNumber:"7474848484",
            model:"Lightweight",
            weight:45000, 
            battery:0.9,
            state:"LOADING"
        }
        
        it("Should Create A Drone and Return It",async ()=>{
             const response = await request.post("/drones").send(validDroneData)
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
            const response = await request.post("/drones").send(inValidDroneData)
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
    
    describe("PUT /drones/:droneId/load",()=>{
        
        //const droneId = '61f0f9e79531a1e3d542ec4e'
        
        const validMedicationData = {
            name:"Sierra 243",
            weight:100,
            code:"X244",
            image:'xyz.png'
        }

        const inValidMedicationData = {
            name:"Sierra 243",
            weight:100,
            code:"rr244", //Invalid
            image:'xyz.png'
        }

        let lowWeightDroneData = {
            "serialNumber":"7474848484",
            "model":"Lightweight",
            "weight":45,
            "battery":0.9,
            "state":"LOADING"
        }
        
        
        it("Should Load A Drone WIth Medication and Return It",async ()=>{
             
             const response = await request.put(`/drones/${droneId}/medications`).send(validMedicationData)
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

        it("Drone with weight exceeded Validation Error",async ()=>{
            const drone = await request.post("/drones").send(lowWeightDroneData)
            let lowWeightDroneId = drone.body._id
            const response = await request.put(`/drones/${lowWeightDroneId}/medications`).send(validMedicationData)
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
           
            const response = await request.put(`/drones/${droneId}/medications`).send(validMedicationData)
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
             const response = await request.get("/drones")
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


