import DroneApp from "../app"
import supertest from "supertest"
import { Application } from "express"

const app: Application = DroneApp.getAppInstance()
const request = supertest(app)

describe("IndexRoute", ()=>{
    describe("GET /",()=>{
        it("Should Return Default API response message",async ()=>{
            const response = await request.get("/")
            expect(response.statusCode).toBe(200);
            expect(response.header['content-type']).toBe('text/html; charset=utf-8');
            expect(response.text).toEqual("Drone service running")
        })
    })    
})


