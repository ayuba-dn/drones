import DroneService from "./app"
const port: number = parseInt(process.env.PORT!) || 4000

//Start Service
DroneService.start(port); 
