import express, {Application} from "express"
import DroneRoutes from "./routes/drone-routes"

class DroneService {
    private app: Application
    
    constructor(){
        this.app = express()
    }
   
    //starts the server on a given port
    start = (port: Number) => { 
        this.initializeRoutes()
        return this.app.listen(port, () => {
            console.log(`Drone service running on port ${port}`);
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

}

export default new DroneService();
