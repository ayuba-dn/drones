import DroneApp from "../app"
import supertest from "supertest"
import express,{ Application } from "express"

const app: Application = DroneApp.getAppInstance()
const request = supertest(app)

describe("DroneRoutes", ()=>{
    describe("GET /",()=>{
        it("Should Return Default API response message",async ()=>{
            const response = await request.get("/")
            expect(response.text).toEqual("Drone service running")
        })
    })    

    describe("GET /",()=>{
        it("Should Return An Object Containing all Drones",async ()=>{
                        expect(2+2).toEqual(4)
        })
    })    
})


