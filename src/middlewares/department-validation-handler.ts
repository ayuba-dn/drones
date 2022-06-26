
import {RequestValidationError } from '../helpers/errors/request-validation-error'
import {validationResult} from 'express-validator'
import {NextFunction,Request,Response} from 'express'
import {body,param} from 'express-validator'




 class DepartmentValidations{
    regex = new RegExp(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/);

   
    create = [
        body('name')
        .notEmpty()
        .withMessage("department name is required")
        .isString(),

        body('faculty')
        .notEmpty()
        .withMessage("faculty is required")
        .isString(),
    
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


export default new DepartmentValidations()
