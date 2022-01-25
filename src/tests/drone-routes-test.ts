import DroneApp from "../app"
import supertest from "supertest"
import { Application } from "express"

const app: Application = DroneApp.getAppInstance()
const request = supertest(app)

describe("DroneRoutes", ()=>{

    describe("POST /",()=>{
      
        const validDroneData = {
            name: "Shadow",
            weight: 2.7,
            code: "TK_900"
        }

        const inValidDroneData = {
            name: "Shadow",
            weight: 2.7,
            code: "tk-900"
        }
        
        it("Should Create A Drone and Return It",async ()=>{
             const response = await request.get("/drones").send(validDroneData)
             expect(response.statusCode).toBe(201)
             expect(response.body).toEqual(
                 expect.objectContaining({
                     name: expect.any(String),
                     weight: expect.any(Number),
                     code: expect.any(String)
                 })
             )
             
        })
        
        it("Should Return a 400 validation error",async ()=>{
            const response = await request.get("/drones").send(inValidDroneData)
            expect(response.statusCode).toBe(400)
            expect(response.body).toEqual(
                expect.objectContaining({
                    message: expect.any(String)
                })
            )
        })
    })    

    describe("GET /",()=>{
        it("Should Return An Object Containing all Drones or an Empty array",async ()=>{
             const response = await request.get("/drones")
             expect(response.statusCode).toBe(200)
             expect(response.body).toEqual(
                expect.arrayContaining(
                    expect.objectContaining(
                        {
                         name: expect.any(String)
                        }
                    )
                ) || []
             )
        })
    })    
})


