import DroneApp from "../app"
import supertest from "supertest"
import { Application } from "express"

const app: Application = DroneApp.getAppInstance()
const request = supertest(app)

describe("DroneRoutes", ()=>{
        const dbHost = process.env.DB_HOST || 'localhost';
        const dbPort = process.env.DB_PORT || '27017';
        const dbName = process.env.DB_NAME || 'drones';
        const authDbName = process.env.AUTH_DB_NAME || 'admin';
        const dbUser = process.env.DB_USER || 'droneuser';
        const dbPassword = process.env.DB_PASSWORD || 'xc892zx22';
        const dbUrl: string = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=${authDbName}`
        DroneApp.connectDb(dbUrl)

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
        
        const droneId = '61f0f9e79531a1e3d542ec4e'
        
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
        
        it("Should Load A Drone WIth Medication and Return It",async ()=>{
             const response = await request.put(`/drones/${droneId}/load`).send(validMedicationData)
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

        it("Should Return Validation Error",async ()=>{
            const response = await request.put(`/drones/${droneId}/load`).send(inValidMedicationData)
            expect(response.statusCode).toBe(400)
            expect(response.body.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        field: "code"
                    })
                ])
            )
            
         })
        
        
    })  


    describe("GET /",()=>{
        it("Should Return An Object Containing all Drones or an Empty array",async ()=>{
             const response = await request.get("/drones")
             expect(response.statusCode).toBe(200)
             expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining(
                        {
                         name: expect.any(String)
                        }
                    )
                ]) || []   
                     
             )
        })
    })    
})


