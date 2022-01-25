import express, {Application} from "express"


class DroneService {
    private app: Application
    constructor(){
        this.app = express()
    }
   
    //starts the server on a given port
    start(port: Number){ 
        return this.app.listen(port, () => {
            console.log(`Drone service running on port ${port}`);
        });
    }
    
    getAppInstance(){
       return this.app
    }

}

export default new DroneService();
