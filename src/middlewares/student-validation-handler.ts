
import {RequestValidationError } from '../helpers/errors/request-validation-error'
import {validationResult} from 'express-validator'
import {NextFunction,Request,Response} from 'express'
import {body,param} from 'express-validator'




 class StudentValidations{
    regex = new RegExp(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/);

    create = [
        body('surname')
        .notEmpty()
        .withMessage("surname is required")
        .isString(),

        body('firstname')
        .notEmpty()
        .withMessage("firstname is required")
        .isString(),
    
        body('middlename')
        .notEmpty()
        .withMessage("middlename is required")
        .isString(),

        body('department')
        .notEmpty()
        .withMessage("department ID is required")
        .isString(),

        body('matricno')
        .notEmpty()
        .withMessage("Matriculation Number is required")
        .isString(),

        body('gender')
        .notEmpty()
        .withMessage("Gender is required")
        .isString(),
    
        body('level')
        .notEmpty()
        .withMessage('Level is Required')
        .isNumeric(),

        body('yearofentry')
        .notEmpty()
        .isNumeric()
        .withMessage('Entry Year is Required'),
    
        // body('state')
        // .notEmpty()
        // .withMessage("The drone state is required")
        // .isIn(['IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING'])
        // .withMessage("Invalid drone state ")
        // .isString(),
    
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


export default new StudentValidations()
