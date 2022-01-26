import express, {Application} from "express"
import DroneRoutes from "./routes/drone-routes"
import mongoose from "mongoose"

class DroneService {
    private app: Application
    
    constructor(){
        this.app = express()
        this.initializeRoutes()
    }
   
    //starts the server on a given port
    start = (port: Number) => { 
        return this.app.listen(port, () => {
            console.log(`Drone service is running on port ${port}`);
        });
    }
    //add all routes to the App here
    private initializeRoutes = () => {
      new DroneRoutes(this.app);
      this.app.route("/")
       .get(async (req: express.Request, res: express.Response) => {
             return res.status(200).send("Drone service running");
       })
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
            console.log("unable to connect to DB",error)
        }
    }

}

export default new DroneService();
