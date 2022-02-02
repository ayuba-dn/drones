import  { BaseError} from './base-error'
export class NotFoundError extends BaseError{
    reason = "Route Not Found"
    statusCode = 404
    constructor(){
        
        super("Route Not Found")
        
        //We do this when extending a built in class
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serializeErrors = () => {
        return [
            {message: this.reason}
        ]
    }
}