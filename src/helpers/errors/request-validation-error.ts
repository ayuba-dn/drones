import {ValidationError} from 'express-validator'
import  { CustomError} from './custom-error'

export class RequestValidationError extends CustomError{ //Implements Serializable
    statusCode = 400
    constructor(public errors: ValidationError []){
        super("Validation Error")

        //We do this when extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors = () => {
        let formattedErrors = this.errors.map(error=> {
                                     return {message: error.msg, field: error.param}
                                   })
        return formattedErrors
    }
}