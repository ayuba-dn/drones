
import {RequestValidationError } from '../helpers/errors/request-validation-error'
import {validationResult} from 'express-validator'
import {NextFunction,Request,Response} from 'express'
import {body,param} from 'express-validator'




 class DroneValidations{
    regex = new RegExp(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/);

    loadMedication = [
        body('name')
        .isString()
        .notEmpty()
        .withMessage("Medication Name is Required")
        .matches(this.regex)
        .withMessage("Please enter a valid name allowed only letters, numbers,- and _"),
    
        body('weight')
        .isFloat()
        .notEmpty()
        .withMessage("THe Weight field is required"),
    
    
        body('code')
        .isString()
        .notEmpty()
        .withMessage("Medication Code is Required")
        .matches(this.regex)
        .withMessage("Please enter a valid code allowed only letters, numbers, and underscore"),
    
        body('image')
        .isString()
        .notEmpty(),
    
        param('droneId')
        .isString()
        .notEmpty()
        .withMessage("drone ID is required"),
    
        (req: Request,res: Response,next: NextFunction)=>{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                let errorsData: any = errors.array()
                throw new RequestValidationError(errorsData)
            }
            next()
        } 
    ];

    create = [
        body('weight')
        .notEmpty()
        .withMessage("the drone weight is required")
        .isFloat({ min: 0, max: 500 }),
    
        body('battery')
        .notEmpty()
        .withMessage("please enter battery capacity")
        .isFloat(),
    
        body('serialNumber')
        .notEmpty()
        .isLength({ min: 0, max:100 })
        .withMessage('Serial Number Should Not Exceed 100 characters'),
    
        body('model')
        .notEmpty()
        .withMessage("the drone model is required")
        .isString(),
    
        body('state')
        .notEmpty()
        .withMessage("The drone state is required")
        .isIn(['IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING'])
        .withMessage("Invalid drone state ")
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


export default new DroneValidations()
