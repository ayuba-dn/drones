import express, {Application} from "express"
import DroneRoutes from "./routes/drone-routes"
import mongoose from "mongoose"
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from "./helpers/errors/not-found-error"
import { DatabaseConnectionError } from "./helpers/errors/database-connection-error"

class DroneService {
    private app: Application
    
    constructor(){
        this.app = express()
        this.app.use(express.json())
        

        this.initializeRoutes()
    }
   
    //starts the server on a given port
    start = (port: Number) => { 
        return this.app.listen(port, () => {
            console.log(`Drone service is running on port >>>> ${port}`);
        });
    }
    //add all routes to the App here
    private initializeRoutes = () => {
      new DroneRoutes(this.app);
      
       this.app.route("/")
       .get(async (req: express.Request, res: express.Response) => {
             return res.status(200).send("Drone service running");
       })

        this.app.all('*',async (req,res)=>{
         throw new NotFoundError()
        })

        this.app.use(errorHandler)
    }

    getAppInstance = () =>{
       return this.app
    }

    connectDb = async(dbUrl: string) =>{
        try{
            await mongoose.connect(dbUrl)
            console.log("Connected to database")
        }
        catch(error){
            console.log("Error Connecting to database",error)
            throw new DatabaseConnectionError("Error Connecting DB")
        }
    }

}

export default new DroneService();
