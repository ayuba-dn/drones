
import RegistrationRepository from "../repositories/registration-repository";
import {RegistrationDoc} from "../models/registration-model"
import {Request, Response} from "express"
import {DroneCapacityError } from '../helpers/errors/drone-capacity-error'
import {ResourceNotFoundError} from '../helpers/errors/resource-notfound-error'
import {InternalServerError } from '../helpers/errors/internal-server-error'
//import Medication from '../models/types/medication'
class RegistrationController {
    

    private registrationAvailabilityErrorMsg:string = ''

    public create = async (req:Request,res:Response): Promise<RegistrationDoc> =>{
               try{
                 let registration = await RegistrationRepository.create(req.body)
                 return registration
               }catch(error){
                   //log error here
                   console.log(error)
                   throw new InternalServerError()
               }
    }
    


    public async getRegistrations(): Promise<RegistrationDoc[]> {
       return RegistrationRepository.getAllWithPopulate();
    }


    public getOneRegistration = async (req: Request, res: Response): Promise<RegistrationDoc | null> =>{

            try{

                let registration = await RegistrationRepository.getOneById({registrant: req.body.registrant, session: req.body.session})
                return registration
            }catch(error) {

                console.log(error)
                throw new InternalServerError()
            }
    }


}

export default new RegistrationController()