import DroneService from "./app"
import dotenv from "dotenv"
dotenv.config();


const port: number = parseInt(process.env.PORT!) || 4000
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '27017';
const dbName = process.env.DB_NAME || 'drones';
const authDbName = process.env.AUTH_DB_NAME || 'admin';
const dbUser = process.env.DB_USER || 'droneuser';
const dbPassword = process.env.DB_PASSWORD || 'xc892zx22';

const dbUrl: string = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=${authDbName}`

console.log("connectionssss url>>",dbUrl)


//Connect to Database
DroneService.connectDb(dbUrl)

//Start Service
DroneService.start(port); 