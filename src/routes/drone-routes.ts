import { BaseRoute } from "../helpers/base-route";
import  {Request,Response,Application} from "express";

export default class DroneRoutes extends BaseRoute {
   
    constructor(app: Application) {
        super(app);
    }

    setUpRoutes() {
        this.app.route("/drones")
        .get(async (req: Request, res: Response) => {
              const response = "drones.....";
              return res.send(response);
        })
        .post(async(req:Request, res:Response)=>{
            const response = "drone created";
            return res.send(response);
        })
        .put(async(req:Request, res:Response)=>{
            const response = "drone updated";
            return res.send(response);
        })
        .delete(async(req:Request, res:Response)=>{
            const response = "drone deleted";
            return res.send(response);
        })

        

        return this.app;
    }
}