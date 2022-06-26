
import {RequestValidationError } from '../helpers/errors/request-validation-error'
import {validationResult} from 'express-validator'
import {NextFunction,Request,Response} from 'express'
import {body,param} from 'express-validator'




 class CourseValidations{
    regex = new RegExp(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/);

   
    create = [
        body('title')
        .notEmpty()
        .withMessage("course title is required")
        .isString(),

        body('code')
        .notEmpty()
        .withMessage("course code is required")
        .isString(),
    
        body('departments')
        .notEmpty()
        .withMessage("add at leat one department id")
        .isArray(),

        body('level')
        .notEmpty()
        .withMessage("level is required")
        .isNumeric(),

        body('semester')
        .notEmpty()
        .withMessage("semester is required")
        .isString(),

        body('units')
        .notEmpty()
        .withMessage("course units is required")
        .isNumeric(),

        body('type')
        .notEmpty()
        .withMessage("Course can either be Core or Elective")
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


export default new CourseValidations()
