
import {RequestValidationError } from '../helpers/errors/request-validation-error'
import {validationResult} from 'express-validator'
import {NextFunction,Request,Response} from 'express'


export const ValidationHandler = (error: Error,req: Request,res: Response,next: NextFunction) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        let errorsData: any = errors.array()
        throw new RequestValidationError(errorsData)
    }
}

