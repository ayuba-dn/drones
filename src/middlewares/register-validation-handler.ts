
import {RequestValidationError } from '../helpers/errors/request-validation-error'
import {validationResult} from 'express-validator'
import {NextFunction,Request,Response} from 'express'
import {body,param} from 'express-validator'




 class RegisterValidations{
    regex = new RegExp(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/);

   
    create = [

        body('registrationNumber')
        .notEmpty()
        .withMessage("registration number is required")
        .isString(),

        body('registrant')
        .notEmpty()
        .withMessage("student is required")
        .isString(),

        body('session')
        .notEmpty()
        .withMessage("session is required")
        .isString(),
    
        body('semester')
        .notEmpty()
        .withMessage("semester is required")
        .isString(),

        body('courses')
        .notEmpty()
        .withMessage("course list is required")
        .isArray(),     
    
        (req: Request,res: Response,next: NextFunction)=>{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                let errorsData: any = errors.array()
                throw new RequestValidationError(errorsData)
            }
            next()
        } 
    ];

    getMedications = [
       
        param('droneId')
        .isString()
        .notEmpty()
        .withMessage("drone ID is required"),
    
        (req: Request,res: Response,next: NextFunction)=>{
            const errors = validationResult(req)
            console.log("data",req.body)
            if(!errors.isEmpty()){
                let errorsData: any = errors.array()
                throw new RequestValidationError(errorsData)
            }
            next()
        } 
    ];
} 


export default new RegisterValidations()
